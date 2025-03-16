import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { loginUser, loginWithGoogle } from "@/lib/api/redux/authSlice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import backgroundImage from "@/assets/images/bg.jpg";

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(5, "Mật khẩu phải chứa ít nhất 5 ký tự"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  // Xử lý đăng nhập Email/Mật khẩu
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Đăng nhập thành công!");
      if (rememberMe) localStorage.setItem("rememberMe", data.email);
      navigate("/");
    } else {
      toast.error(
        typeof result.payload === "string"
          ? result.payload
          : "Đăng nhập thất bại"
      );
    }
  };

  // Xử lý đăng nhập Google
  const handleGoogleSuccess = async (response: any) => {
    const googleToken = response.credential;
    const result = await dispatch(loginWithGoogle(googleToken));

    if (loginWithGoogle.fulfilled.match(result)) {
      toast.success("Đăng nhập Google thành công!");
      navigate("/");
    } else {
      toast.error(
        typeof result.payload === "string"
          ? result.payload
          : "Đăng nhập thất bại"
      );
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Cột chứa form */}
      <div className="flex flex-col gap-4 p-6">
        <motion.div className="overflow-hidden whitespace-nowrap">
          <motion.p
            className="py-2 text-3xl font-bold text-primary inline-block"
            initial={{ x: "100%" }} // Bắt đầu từ ngoài màn hình bên phải
            animate={{ x: "-100%" }} // Chạy hết màn hình sang bên trái
            transition={{
              repeat: Infinity, // Lặp vô hạn
              duration: 8, // Chạy trong 8 giây, có thể tăng hoặc giảm
              ease: "linear", // Chạy đều, không bị giật
            }}
          >
            {/* WELCOME TO FU FCPRIMS HCM Management System */}
          </motion.p>
        </motion.div>

        {/* Form đăng nhập */}
        <div className="w-full max-w-md mx-auto mt-6">
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold">
                  Đăng nhập vào tài khoản của bạn
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Nhập email của bạn bên dưới để đăng nhập vào tài khoản của bạn
                </p>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                    <FormControl >
                      <Input id="password" type="password"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(value) => setRememberMe(Boolean(value))}
                  />
                  <Label htmlFor="remember-me" className="text-sm">
                    Ghi nhớ tài khoản
                  </Label>
                </div>
                <Link
                  to="/recover-password"
                  className="text-sm text-primary hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>

              <div className="relative text-center text-sm my-4 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-4 text-muted-foreground">
                  Hoặc tiếp tục với
                </span>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Đăng nhập Google thất bại")}
                />
              </div>

              {error && (
                <p className="text-red-500 text-center mt-3">{error}</p>
              )}
            </form>
          </Form>
        </div>
      </div>

      {/* Cột chứa hình ảnh */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src={backgroundImage}
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover dark:opacity-70"
        />
      </div>
    </div>
  );
};

export default LoginPage;
