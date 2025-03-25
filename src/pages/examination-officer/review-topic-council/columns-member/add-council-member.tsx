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
  semesterId: string;
}

export const AddReviewMemberTopicCouncil: React.FC<
  AddReviewMemberTopicCouncilProps
> = ({ councilId, refetchData, semesterId }) => {
  const [open, setOpen] = useState(false);
  const [filteredEmails, setFilteredEmails] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { mentors } = useSelector((state: RootState) => state.mentors);

  // ✅ Fetch mentor theo semesterId
  useEffect(() => {
    dispatch(fetchMentorsBySemesterId(semesterId));
  }, [dispatch, semesterId]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const filterEmails = (input: string) => {
    if (!input.trim()) return setFilteredEmails([]);
    const filtered = mentors
      .filter((m) => m.email)
      .map((m) => m.email!)
      .filter((e) => e.toLowerCase().startsWith(input.toLowerCase()));
    setFilteredEmails(filtered);
  };

  const handleSelectMainEmail = (selectedEmail: string) => {
    form.setValue("email", selectedEmail, { shouldDirty: true });
    setFilteredEmails([]);
  };

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
        toast.error("Không thể thêm thành viên!");
      }
    }
  };

  return (
    <div>
      <Toaster position="top-right" richColors duration={3000} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-black text-white">
            Thêm Thành viên hội đồng
          </Button>
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
                    <FormLabel>Email giảng viên 1</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email giảng viên 1"
                        value={field.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          form.setValue("email", val, { shouldDirty: true });
                          filterEmails(val);
                        }}
                      />
                    </FormControl>
                    {filteredEmails.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto mt-1">
                        {filteredEmails.map((e) => (
                          <li
                            key={e}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectMainEmail(e)}
                          >
                            {e}
                          </li>
                        ))}
                      </ul>
                    )}
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
                <Button type="submit">Lưu</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
