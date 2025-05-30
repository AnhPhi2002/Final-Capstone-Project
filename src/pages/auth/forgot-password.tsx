import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { forgotPassword } from "@/lib/api/redux/authSlice";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

export const formSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng nhập email" })
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
});

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

const handleSubmit = async (data: z.infer<typeof formSchema>) => {
  try {
    const result = await dispatch(forgotPassword(data.email)).unwrap();
    toast.success(result);
    navigate(`/reset-password?email=${encodeURIComponent(data.email)}`); // 👈 truyền email qua URL
  } catch (err: any) {
    toast.error(err);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Khôi phục mật khẩu </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Nhập email để nhận mã OTP khôi phục mật khẩu
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Đang gửi...
                </span>
              ) : (
                "Gửi mã OTP"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
