import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectGroup,
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
import { toast } from "sonner";

// ✅ Xây dựng schema validation với Zod
const formSchema = z.object({
  councilName: z.string().min(3, "Tên hội đồng phải có ít nhất 3 ký tự"),
  year: z.string().min(4, "Vui lòng chọn năm học"),
  semester: z.string().min(1, "Vui lòng chọn kỳ học"),
});

export const AddReviewTopicCouncil = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null); // Tham chiếu đến nút mở modal

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      councilName: "",
      year: "",
      semester: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dữ liệu hội đồng xét duyệt:", data);
    toast.success("Thêm hội đồng xét duyệt thành công!");
    setOpen(false);
  };

  // Trả focus về nút mở modal khi đóng
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
    setOpen(isOpen);
  };

  return (
    <div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button ref={triggerRef} className="bg-black text-white">
            Thêm hội đồng xét duyệt
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm hội đồng xét duyệt</DialogTitle>
            <DialogDescription>
              Nhập thông tin hội đồng xét duyệt bên dưới. Nhấn "Lưu" để xác nhận.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="councilName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên hội đồng</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: Hội đồng xét duyệt 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Năm học</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn năm học" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kỳ học</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn kỳ học" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">Học kỳ 1</SelectItem>
                          <SelectItem value="2">Học kỳ 2</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">Lưu hội đồng</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};