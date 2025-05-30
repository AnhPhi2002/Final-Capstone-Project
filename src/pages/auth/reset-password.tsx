import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { resetPassword } from "@/lib/api/redux/authSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate, useSearchParams } from "react-router";
import { Loader2 } from "lucide-react";

// ✅ Khai báo schema trực tiếp trong file
const formSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng nhập email" })
    .nonempty("Email không được để trống")
    .email("Email không hợp lệ"),
  otp: z
    .string({ required_error: "Vui lòng nhập mã OTP" })
    .nonempty("Mã OTP không được để trống"),
  newPassword: z
    .string({ required_error: "Vui lòng nhập mật khẩu mới" })
    .nonempty("Mật khẩu mới không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // 👈
  const emailFromQuery = searchParams.get("email") || ""; // 👈

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailFromQuery, // 👈 auto fill email nếu có trong query
      otp: "",
      newPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const message = await dispatch(resetPassword(values)).unwrap();
      toast.success(message);
      navigate("/log-in"); // ✅ điều hướng sau khi thành công
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Đặt lại mật khẩu</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Vui lòng điền thông tin để khôi phục mật khẩu
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập mã OTP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      {...field}
                    />
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
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang xử lý...
                </span>
              ) : (
                "Xác nhận đặt lại mật khẩu"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
