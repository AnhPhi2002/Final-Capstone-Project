import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { addCouncilMember, fetchCouncilDetail } from "@/lib/api/redux/councilReviewSlice";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
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
import { Mentor } from "@/lib/api/types";

// Cập nhật schema để hỗ trợ nhiều email
const formSchema = z.object({
  emails: z
    .array(z.string().email("Email không hợp lệ"))
    .min(1, "Vui lòng chọn ít nhất một mentor")
    .max(5, "Chỉ được chọn tối đa 5 mentor"),
});

interface AddMemberReviewCouncilProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  councilId: string;
  semesterId: string;
}

export const AddMemberReviewCouncil: React.FC<AddMemberReviewCouncilProps> = ({
  open,
  setOpen,
  councilId,
  semesterId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { mentors, loading: mentorLoading } = useSelector((state: RootState) => state.mentors);
  const [isLoading, setIsLoading] = useState(false);

  // Khai báo form với kiểu rõ ràng
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: [] as string[],
    },
  });

  useEffect(() => {
    if (open && semesterId) {
      dispatch(fetchMentorsBySemesterId(semesterId));
    }
  }, [open, semesterId, dispatch]);

  // Xử lý chọn/bỏ chọn email
  const handleSelectChange = (email: string, currentEmails: string[]) => {
    let updatedEmails: string[];
    if (currentEmails.includes(email)) {
      updatedEmails = currentEmails.filter((e) => e !== email);
    } else {
      updatedEmails = [...currentEmails, email];
    }
    form.setValue("emails", updatedEmails, { shouldValidate: true });
  };

  const onSubmit = async (data: { emails: string[] }) => {
    setIsLoading(true);
    try {
      // Gửi từng email đến addCouncilMember
      for (const email of data.emails) {
        await dispatch(addCouncilMember({ councilId, email })).unwrap();
      }
      toast.success(`Thêm ${data.emails.length} thành viên thành công!`);
      dispatch(fetchCouncilDetail(councilId));
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(typeof error === "string" ? error : "Thêm thành viên thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Thêm thành viên hội đồng</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-800"
            disabled={isLoading || mentorLoading}
          >
            ✖
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          Chọn một hoặc nhiều mentor để thêm vào hội đồng.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email mentor</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Select
                        onValueChange={(value) => handleSelectChange(value, field.value)}
                        disabled={isLoading || mentorLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              mentorLoading
                                ? "Đang tải danh sách mentor..."
                                : "Chọn mentor (có thể chọn nhiều)"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {mentors?.length ? (
                            mentors.map((mentor: Mentor) => (
                              <SelectItem key={mentor.id} value={mentor.email}>
                                {mentor.fullName} ({mentor.email})
                                {field.value.includes(mentor.email) && " ✓"}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              Không có mentor nào
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {/* Hiển thị danh sách đã chọn */}
                      {field.value.length > 0 && (
                        <div className="text-sm text-gray-600">
                          Đã chọn: {field.value.join(", ")}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="outline"
                disabled={isLoading || mentorLoading}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading || mentorLoading}>
                {isLoading ? "Đang thêm..." : "Thêm thành viên"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};