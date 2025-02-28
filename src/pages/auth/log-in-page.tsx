import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { loginUser, loginWithGoogle } from "@/lib/api/redux/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS Toastify
import { GoogleLogin } from "@react-oauth/google";

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(5, "Mật khẩu phải chứa ít nhất 7 ký tự"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // **Xử lý đăng nhập bằng Email/Mật khẩu**
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Đăng nhập thành công!");
      if (rememberMe) {
        localStorage.setItem("rememberMe", data.email);
      }
      navigate("/");
    } else {
      // toast.error(result.payload || "Đăng nhập thất bại");
    }
  };

  // **Xử lý đăng nhập Google**
  const handleGoogleSuccess = async (response: any) => {
    const googleToken = response.credential;
    console.log("Google Token:", googleToken); // Debug token
  
    const result = await dispatch(loginWithGoogle(googleToken));
  
    if (loginWithGoogle.fulfilled.match(result)) {
      console.log("Response from backend:", result.payload); // Kiểm tra phản hồi từ backend
      toast.success("Đăng nhập Google thành công!");
      navigate("/");
    } else {
      console.error("Error:", result.payload);
      toast.error(result.payload ? String(result.payload) : "Đăng nhập thất bại");
    }
  };
  

  const handleGoogleFailure = () => {
    toast.error("Đăng nhập Google thất bại");
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6 h-screen overflow-auto rounded-e shadow-md bg-white">
        <div className="bg-white min-h-screen py-16 px-24">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <h2 className="text-4xl font-bold mt-5">Đăng Nhập</h2>
              <p className="py-2">FU FCPRIMS HCM Management System</p>

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input placeholder="Nhập email" type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Nhập mật khẩu" className="py-6" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex justify-between mt-5">
                <div className="items-top flex space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(value) => setRememberMe(value == true)}
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ghi nhớ tài khoản này
                  </label>
                </div>
                <Link to="/recover-password" className="text-sm text-orange-500">
                  Quên mật khẩu?
                </Link>
              </div>

              <Button type="submit" className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold p-6" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
              </Button>
            </form>
          </Form>

          <div className="flex justify-between gap-5 items-center my-5">
            <hr className="border flex-1" />
            <p className="uppercase text-sm">Hoặc</p>
            <hr className="border flex-1" />
          </div>

          {/* ✅ Nút Đăng nhập Google */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess} // Khi đăng nhập thành công
            onError={handleGoogleFailure} // Khi đăng nhập thất bại
          />

          {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
