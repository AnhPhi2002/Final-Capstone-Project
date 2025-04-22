import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createDefenseSchedule } from "@/lib/api/redux/councilDefenseSlice";
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
  defenseRound: number;
  onSuccess?: () => void;
}

export const CreateReviewSchedule: React.FC<CreateReviewScheduleProps> = ({
  open,
  setOpen,
  councilId,
  semesterId,
  defenseRound,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, loading: groupLoading } = useSelector((state: RootState) => state.groups);

  const [isLoading, setIsLoading] = useState(false);
  const [groupCount, setGroupCount] = useState(1);

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

  useEffect(() => {
    if (!open) {
      setGroupCount(1);
      form.reset({
        groups: [{ groupId: "", reviewTime: "" }],
        room: "",
      });
    }
  }, [open, form]);

  // Sửa logic lọc nhóm để xử lý defenseRound là chuỗi hoặc số
  const filteredGroups = useMemo(() => {
    console.log("Filtering groups with defenseRound:", defenseRound);
    console.log("All groups:", groups);

    const matchedGroups = groups.filter((group: any) => {
      const hasMatchingRound = group.topicAssignments?.some(
        (assignment: any) => {
          // Chuyển đổi defenseRound từ chuỗi sang số để so sánh
          const assignmentRound = assignment.defenseRound
            ? Number(assignment.defenseRound)
            : null;
          return assignmentRound === defenseRound;
        }
      );
      return hasMatchingRound;
    });

    console.log("Filtered groups:", matchedGroups);
    return matchedGroups;
  }, [groups, defenseRound]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const formattedData = {
        councilId,
        groups: data.groups.map((g: { groupId: string; reviewTime: string }) => ({
          groupId: g.groupId,
          defenseTime: new Date(g.reviewTime).toISOString(),
        })),
        room: data.room,
        defenseRound,
      };
      await dispatch(createDefenseSchedule(formattedData)).unwrap();
      toast.success("Tạo lịch bảo vệ thành công!");
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      const errorMessage = typeof error === "string" ? error : "Tạo lịch bảo vệ thất bại!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {Array.from({ length: groupCount }).map((_, index) => (
              <div key={index}>
                <FormField
                  control={form.control}
                  name={`groups.${index}.groupId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhóm {index + 1}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={groupLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={groupLoading ? "Đang tải..." : "Chọn nhóm"} />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredGroups.length > 0 ? (
                              filteredGroups.map((group: any) => (
                                <SelectItem key={group.id} value={group.id}>
                                  {group.groupCode}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-data" disabled>
                                Không có nhóm phù hợp
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
                      <FormLabel>Thời gian bảo vệ</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phòng</FormLabel>
                  <FormControl>
                    <Input placeholder="Phòng bảo vệ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang tạo..." : "Tạo lịch"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};