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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Vui lòng chọn email"),
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (open && semesterId) {
      dispatch(fetchMentorsBySemesterId(semesterId));
    }
  }, [open, semesterId, dispatch]);

  const onSubmit = async (data: { email: string }) => {
    try {
      await dispatch(addCouncilMember({ councilId, email: data.email, semesterId })).unwrap();
      toast.success("Thêm thành viên vào hội đồng thành công!");
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
              Chọn mentor để mời vào hội đồng. Nhấn "Lưu" để xác nhận.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email giảng viên</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={mentorLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn email mentor" />
                        </SelectTrigger>
                        <SelectContent>
                          {mentors?.length > 0 ? (
                            mentors.map((mentor: Mentor) => (
                              <SelectItem key={mentor.id} value={mentor.email}>
                                {mentor.fullName} ({mentor.email})
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              Không có mentor nào
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Vai trò</FormLabel>
                <input
                  value="council_member"
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
