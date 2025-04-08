import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"; // Thêm SubmitHandler
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { addCouncilMember, fetchCouncilDetail } from "@/lib/api/redux/councilDefenseSlice";
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

// Định nghĩa schema
const formSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Vui lòng chọn một email"),
  role: z.enum(["council_chairman", "council_secretary", "council_member"], {
    required_error: "Vui lòng chọn vai trò",
  }),
});

// Định nghĩa kiểu dữ liệu cho form
type FormData = z.infer<typeof formSchema>;

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
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "council_member",
    },
  });

  useEffect(() => {
    if (open && semesterId) {
      dispatch(fetchMentorsBySemesterId(semesterId));
    }
  }, [open, semesterId, dispatch]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(
        addCouncilMember({ councilId, email: data.email, role: data.role })
      ).unwrap();
      toast.success("Thêm thành viên thành công!");
      dispatch(fetchCouncilDetail(councilId));
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error((error as string) || "Thêm thành viên thất bại!");
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
          Chọn email mentor và vai trò để thêm vào hội đồng.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email mentor</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoading || mentorLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            mentorLoading ? "Đang tải danh sách mentor..." : "Chọn mentor"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {mentors?.length ? (
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

            {/* Vai trò */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vai trò trong hội đồng</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="council_chairman">Chủ tịch hội đồng</SelectItem>
                        <SelectItem value="council_secretary">Thư ký hội đồng</SelectItem>
                        <SelectItem value="council_member">Thành viên thường</SelectItem>
                      </SelectContent>
                    </Select>
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