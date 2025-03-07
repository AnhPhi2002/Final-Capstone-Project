import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { addCouncilMember } from "@/lib/api/redux/councilSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// ✅ Schema validation với Zod
const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

interface AddReviewMemberTopicCouncilProps {
  councilId: string;
  refetchData?: () => void;
}

export const AddReviewMemberTopicCouncil: React.FC<AddReviewMemberTopicCouncilProps> = ({ councilId, refetchData }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await dispatch(addCouncilMember({ councilId, email: data.email })).unwrap();
      toast.success("Thêm thành viên vào hội đồng thành công!");
      setOpen(false);
      form.reset();
      if (refetchData) refetchData();
    } catch (error: any) {
      if (error.includes("Không tìm thấy người dùng")) {
        toast.error("Email không tồn tại. Vui lòng kiểm tra lại!");
      } else {
        toast.error(error || "Không thể thêm thành viên!");
      }
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
              Nhập email thành viên muốn mời vào hội đồng. Nhấn "Lưu" để xác nhận.
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Nhập email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập email người dùng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role (Chỉ có 1 lựa chọn reviewer) */}
              <FormItem>
                <FormLabel>Vai trò</FormLabel>
                <Input value="Reviewer" disabled />
              </FormItem>

              {/* Footer */}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">Lưu</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
