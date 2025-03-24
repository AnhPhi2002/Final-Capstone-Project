import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createReviewSchedule } from "@/lib/api/redux/councilReviewSlice";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Group } from "@/lib/api/types";

const formSchema = z.object({
  groups: z
    .array(
      z.object({
        groupId: z.string().min(1, "Vui lòng chọn nhóm"),
        reviewTime: z.string().min(1, "Vui lòng chọn thời gian review"),
      })
    )
    .min(1, "Vui lòng chọn ít nhất một nhóm")
    .max(4, "Hội đồng chỉ có thể review tối đa 4 nhóm"),
  room: z.string().min(1, "Vui lòng nhập phòng"),
});

interface CreateReviewScheduleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  councilId: string;
  semesterId: string;
}

export const CreateReviewSchedule: React.FC<CreateReviewScheduleProps> = ({
  open,
  setOpen,
  councilId,
  semesterId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, loading: groupLoading } = useSelector((state: RootState) => state.groups);
  const [isLoading, setIsLoading] = useState(false);
  const [groupCount, setGroupCount] = useState(1); // Số lượng nhóm hiển thị, bắt đầu từ 1

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groups: [{ groupId: "", reviewTime: "" }],
      room: "",
    },
  });

  useEffect(() => {
    if (open && semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
    }
  }, [open, semesterId, dispatch]);

  // Reset form và groupCount khi đóng/mở modal
  useEffect(() => {
    if (!open) {
      setGroupCount(1);
      form.reset({
        groups: [{ groupId: "", reviewTime: "" }],
        room: "",
      });
    }
  }, [open, form]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const formattedData = {
        councilId,
        groups: data.groups.map((g: { groupId: string; reviewTime: string }) => ({
          groupId: g.groupId,
          reviewTime: new Date(g.reviewTime).toISOString(),
        })),
        room: data.room,
      };
      console.log("Sending createReviewSchedule data:", formattedData);
      await dispatch(createReviewSchedule(formattedData)).unwrap();
      toast.success("Tạo lịch review thành công!");
      setOpen(false);
    } catch (error: any) {
      console.error("Create review schedule failed:", error);
      let errorMessage = error?.payload || "Tạo lịch review thất bại!";
      if (errorMessage.includes("Các nhóm chưa được phân công đề tài")) {
        const groupIds = errorMessage.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g) || [];
        groupIds.forEach((groupId: string) => {
          const group = groups.find((g: Group) => g.id === groupId);
          if (group) {
            errorMessage = errorMessage.replace(groupId, group.groupCode);
          }
        });
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const addGroup = () => {
    const currentGroups = form.getValues("groups");
    if (currentGroups.length >= 4) {
      toast.error("Hội đồng chỉ có thể review tối đa 4 nhóm!");
      return;
    }
    setGroupCount(groupCount + 1);
    form.setValue("groups", [...currentGroups, { groupId: "", reviewTime: "" }]);
  };

  const removeGroup = (index: number) => {
    const currentGroups = form.getValues("groups");
    if (currentGroups.length <= 1) {
      toast.error("Phải có ít nhất một nhóm!");
      return;
    }
    const updatedGroups = currentGroups.filter((_, i) => i !== index);
    form.setValue("groups", updatedGroups);
    setGroupCount(groupCount - 1);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tạo lịch review</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-800"
            disabled={isLoading || groupLoading}
          >
            ✖
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          Nhập thông tin lịch review cho hội đồng (tối đa 4 nhóm).
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Danh sách nhóm cố định */}
            {Array.from({ length: groupCount }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel>Nhóm {index + 1}</FormLabel>
                  {groupCount > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeGroup(index)}
                      disabled={isLoading || groupLoading}
                    >
                      Xóa
                    </Button>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name={`groups.${index}.groupId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isLoading || groupLoading}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                groupLoading ? "Đang tải danh sách nhóm..." : "Chọn nhóm"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {groups?.length ? (
                              groups.map((group: Group) => (
                                <SelectItem key={group.id} value={group.id}>
                                  {group.groupCode}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>
                                Không có nhóm nào
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`groups.${index}.reviewTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thời gian review</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          disabled={isLoading || groupLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            {/* Nút "Thêm nhóm khác" */}
            {groupCount < 4 && (
              <Button
                type="button"
                onClick={addGroup}
                disabled={isLoading || groupLoading}
                className="w-full"
              >
                Thêm nhóm khác ({groupCount}/4)
              </Button>
            )}

            {/* Input "Phòng" */}
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phòng</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập phòng" {...field} disabled={isLoading || groupLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nút điều khiển */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="outline"
                disabled={isLoading || groupLoading}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading || groupLoading}>
                {isLoading ? "Đang tạo..." : "Tạo lịch"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};