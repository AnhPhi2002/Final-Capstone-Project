"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { updateSemester } from "@/lib/api/redux/semesterSlice";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  code: z.string().min(1, "Vui lòng nhập mã học kỳ"),
  startDate: z.date({ required_error: "Vui lòng chọn ngày bắt đầu" }),
  endDate: z.date({ required_error: "Vui lòng chọn ngày kết thúc" }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  semesterId: string;
  refetchData?: () => void;
};

export const UpdateSemester: React.FC<Props> = ({
  open,
  setOpen,
  semesterId,
  refetchData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const semesterDetail = useSelector(
    (state: RootState) => state.semesters.semesterDetail
  );
  const allSemesters = useSelector((state: RootState) => state.semesters.data);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (open && semesterDetail) {
      reset({
        code: semesterDetail.code || "",
        startDate: new Date(semesterDetail.startDate),
        endDate: new Date(semesterDetail.endDate),
      });
    }
  }, [open, semesterDetail, reset]);

  const onSubmit = async (data: FormValues) => {
    const { code, startDate, endDate } = data;

    if (endDate <= startDate) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    const normalizedCode = code.toLowerCase();

    const isDuplicateCode = allSemesters.some(
      (s) =>
        s.yearId === semesterDetail?.yearId &&
        s.code.toLowerCase() === normalizedCode &&
        !s.isDeleted &&
        s.id !== semesterId
    );
    if (isDuplicateCode) {
      toast.error("Mã học kỳ đã tồn tại trong năm học này!");
      return;
    }

    const isDateOverlap = allSemesters.some(
      (s) =>
        s.yearId === semesterDetail?.yearId &&
        !s.isDeleted &&
        s.id !== semesterId &&
        new Date(s.startDate) <= endDate &&
        new Date(s.endDate) >= startDate
    );
    if (isDateOverlap) {
      toast.error("Thời gian học kỳ mới bị trùng với học kỳ khác!");
      return;
    }

    try {
      await dispatch(
        updateSemester({
          semesterId,
          updatedData: {
            code,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        })
      ).unwrap();
      toast.success("Cập nhật học kỳ thành công!");
      refetchData?.();
      setOpen(false);
    } catch (err: any) {
      toast.error(`Cập nhật thất bại: ${err.message || "Đã xảy ra lỗi"}`);
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80" 
       onClick={() => setOpen(false)}/>
      <div
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200
        data-[state=open]:animate-in
        data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0
        data-[state=closed]:zoom-out-95
        data-[state=open]:zoom-in-95
        data-[state=closed]:slide-out-to-left-1/2
        data-[state=closed]:slide-out-to-top-[48%]
        data-[state=open]:slide-in-from-left-1/2
        data-[state=open]:slide-in-from-top-[48%]
        sm:rounded-lg`}
        onClick={(e) => e.stopPropagation()}
        data-state={open ? "open" : "closed"}
      >
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Cập nhật học kỳ</h2>
          <p className="text-sm text-gray-500">
            Chọn năm học và nhập thông tin học kỳ bên dưới. Nhấn "Lưu" để xác
            nhận.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Mã học kỳ */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã học kỳ</FormLabel>
                  <FormControl>
                    <Input placeholder="VD: Spring2025" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ngày bắt đầu */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? format(field.value, "PPP", { locale: vi })
                            : "Chọn ngày"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("2000-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ngày kết thúc */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày kết thúc</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? format(field.value, "PPP", { locale: vi })
                            : "Chọn ngày"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("2000-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit" className="bg-black text-white">
                Lưu cập nhật
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
