import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { addCouncilMember } from "@/lib/api/redux/councilSlice";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
import { Mentor } from "@/lib/api/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Định nghĩa schema
const formSchema = z.object({
  emails: z
    .array(z.string().email("Email không hợp lệ"))
    .min(1, "Vui lòng chọn ít nhất một mentor")
    .max(2, "Chỉ được chọn tối đa 2 mentor"),
});

interface AddReviewMemberTopicCouncilProps {
  councilId: string;
  semesterId: string;
  refetchData?: () => void;
}

export const AddReviewMemberTopicCouncil: React.FC<AddReviewMemberTopicCouncilProps> = ({
  councilId,
  semesterId,
  refetchData,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { mentors, loading: mentorLoading } = useSelector(
    (state: RootState) => state.mentors
  );

  // Khai báo kiểu rõ ràng cho form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: [] as string[],
    },
  });

  useEffect(() => {
    console.log("🔍 AddReviewMemberTopicCouncil - open:", open, "semesterId:", semesterId);
    if (open && semesterId) {
      dispatch(fetchMentorsBySemesterId(semesterId)).then(() => {
        console.log("✅ fetchMentorsBySemesterId called for semesterId:", semesterId);
      });
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
    try {
      // Gửi từng email đến addCouncilMember
      for (const email of data.emails) {
        await dispatch(addCouncilMember({ councilId, email, semesterId })).unwrap();
      }
      toast.success(`Thêm ${data.emails.length} thành viên vào hội đồng thành công!`);
      form.reset();
      refetchData?.();
      setOpen(false);
    } catch (error: any) {
      toast.error(typeof error === "string" ? error : "Không thể thêm thành viên!");
    }
  };

  return (
    <div>
      <Toaster position="top-right" richColors duration={3000} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-black text-white">Thêm Thành viên hội đồng</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm thành viên hội đồng</DialogTitle>
            <DialogDescription>
              Chọn một hoặc nhiều mentor để mời vào hội đồng. Nhấn "Lưu" để xác nhận.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="emails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email giảng viên</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Select
                          onValueChange={(value) => handleSelectChange(value, field.value)}
                          disabled={mentorLoading}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                mentorLoading
                                  ? "Đang tải danh sách mentor..."
                                  : "Chọn mentor (có thể chọn nhiều)"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {mentors?.length > 0 ? (
                              mentors.map((mentor: Mentor) => (
                                <SelectItem key={mentor.id} value={mentor.email}>
                                  {mentor.email}
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
                            Đã chọn:<br /> {field.value.join(", ")} 
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Vai trò</FormLabel>
                <input
                  value="Thành viên"
                  disabled
                  className="w-full px-3 py-2 text-sm border rounded-md bg-gray-100"
                />
              </FormItem>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" disabled={mentorLoading}>
                  Lưu
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};