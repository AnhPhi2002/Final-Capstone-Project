import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { addCouncilMember } from "@/lib/api/redux/councilSlice";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
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
  // FormControl,
  FormMessage,
} from "@/components/ui/form";
import { debounce } from "lodash";

// Schema validation với Zod
const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

interface AddReviewMemberTopicCouncilProps {
  councilId: string;
  refetchData?: () => void;
  semesterId: string;
}

export const AddReviewMemberTopicCouncil: React.FC<AddReviewMemberTopicCouncilProps> = ({
  councilId,
  refetchData,
  semesterId,
}) => {
  const [open, setOpen] = useState(false);
  const [filteredEmails, setFilteredEmails] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { mentors, loading: mentorLoading } = useSelector((state: RootState) => state.mentors);

  // Fetch mentors theo semesterId
  useEffect(() => {
    dispatch(fetchMentorsBySemesterId(semesterId));
  }, [dispatch, semesterId]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Hàm lọc email với debounce
  const filterEmails = debounce((input: string) => {
    if (!input?.trim()) {
      setFilteredEmails([]);
    } else {
      const filtered = mentors
        .map((mentor) => mentor.email)
        .filter((email) => email.toLowerCase().startsWith(input.toLowerCase()));
      setFilteredEmails(filtered);
    }
  }, 300);

  // Xử lý khi chọn email từ danh sách gợi ý
  const handleSelectMainEmail = (selectedEmail: string) => {
    form.setValue("email", selectedEmail, { shouldDirty: true });
    setFilteredEmails([]); // Xóa danh sách gợi ý sau khi chọn
  };

  // Xử lý submit form
  const onSubmit = async (data: { email: string }) => {
    try {
      await dispatch(
        addCouncilMember({ councilId, email: data.email, semesterId })
      ).unwrap();
      toast.success("Thêm thành viên vào hội đồng thành công!");
      setOpen(false);
      form.reset();
      refetchData?.();
    } catch (error: any) {
      if (typeof error === "string" && error.includes("Không tìm thấy")) {
        toast.error("Email không tồn tại. Vui lòng kiểm tra lại!");
      } else {
        // toast.error("Không thể thêm thành viên!");
        toast.error(`${error}`);
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Email giảng viên</FormLabel>
                    {/* <FormControl> */}
                    <div className="relative">
                    <Input
                        placeholder="Email giảng viên"
                        value={field.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val); // Cập nhật giá trị form
                          filterEmails(val); // Lọc email dựa trên input
                        }}
                      />
                    {/* </FormControl> */}
                    {filteredEmails.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto mt-1">
                        {filteredEmails.map((email) => (
                          <li
                            key={email}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectMainEmail(email)}
                          >
                            {email}
                          </li>
                        ))}
                      </ul>
                    )}
                    </div>
                      
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Vai trò</FormLabel>
                <Input value="council_member" disabled />
              </FormItem>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
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