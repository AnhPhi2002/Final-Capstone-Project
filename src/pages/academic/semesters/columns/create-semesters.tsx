"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { createSemester, fetchSemesters } from "@/lib/api/redux/semesterSlice";
import { fetchAllYears } from "@/lib/api/redux/yearSlice";

const formSchema = z.object({
  yearId: z.string().min(1, "Vui lòng chọn năm học"),
  code: z.string().min(1, "Vui lòng nhập mã học kỳ"),
  startDate: z.date({ required_error: "Vui lòng chọn ngày bắt đầu" }),
  endDate: z.date({ required_error: "Vui lòng chọn ngày kết thúc" }),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateSemesters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: years, loading: yearLoading } = useSelector(
    (state: RootState) => state.years
  );
  const { data: semesters } = useSelector(
    (state: RootState) => state.semesters
  );
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearId: "",
      code: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    dispatch(fetchAllYears());
  }, [dispatch]);

  const onSubmit = async (data: FormValues) => {
    const { yearId, code, startDate, endDate } = data;

    if (endDate <= startDate) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    const normalizedCode = code.toLowerCase();

    const isDuplicateCode = semesters.some(
      (s) =>
        s.yearId === yearId &&
        s.code.toLowerCase() === normalizedCode &&
        !s.isDeleted
    );

    if (isDuplicateCode) {
      toast.error("Mã học kỳ đã tồn tại trong năm học này!");
      return;
    }

    const isDateOverlap = semesters.some(
      (s) =>
        s.yearId === yearId &&
        !s.isDeleted &&
        new Date(s.startDate) <= endDate &&
        new Date(s.endDate) >= startDate
    );

    if (isDateOverlap) {
      toast.error("Khoảng thời gian học kỳ bị trùng với học kỳ khác!");
      return;
    }

    try {
      await dispatch(
        createSemester({
          yearId,
          code,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        })
      ).unwrap();
      toast.success("Tạo học kỳ thành công!");
      setIsOpen(false);
      reset({
        yearId: "",
        code: "",
        startDate: undefined,
        endDate: undefined,
      });
      dispatch(fetchSemesters({ yearId }));
    } catch {
      toast.error("Có lỗi xảy ra khi tạo học kỳ!");
    }
  };

  const availableYears = years.filter((y) => !y.isDeleted);

  // Hàm ngăn sự kiện lan truyền
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div>
      <Button className="bg-black text-white" onClick={() => setIsOpen(true)}>
        Tạo học kỳ mới
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/80"
            onClick={() => setIsOpen(false)}
          />
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
            data-state="open"
          >
            <div className="bg-white rounded-lg  " onClick={stopPropagation}>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Tạo học kỳ mới</h2>
                <p className="text-sm text-gray-500">
                  Chọn năm học và nhập thông tin học kỳ bên dưới. Nhấn "Lưu" để
                  xác nhận.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-4 py-4"
                >
                  {/* Năm học */}
                  <FormField
                    control={form.control}
                    name="yearId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right">Năm học</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="col-span-3">
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn năm học" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {yearLoading ? (
                                <SelectItem value="loading" disabled>
                                  Đang tải...
                                </SelectItem>
                              ) : availableYears.length > 0 ? (
                                availableYears.map((year) => (
                                  <SelectItem key={year.id} value={year.id}>
                                    {year.year}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="none" disabled>
                                  Không có năm học nào
                                </SelectItem>
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage className="col-span-4 col-start-2" />
                      </FormItem>
                    )}
                  />

                  {/* Mã học kỳ */}
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right">Mã học kỳ</FormLabel>
                        <FormControl className="col-span-3">
                          <Input placeholder="VD: Spring2025" {...field} />
                        </FormControl>
                        <FormMessage className="col-span-4 col-start-2" />
                      </FormItem>
                    )}
                  />

                  {/* Ngày bắt đầu */}
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right">
                          Ngày bắt đầu
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl className="col-span-3">
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
                          <PopoverContent
                            className="w-auto p-0"
                            align="start"
                            style={{ zIndex: 100 }}
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                console.log("Ngày bắt đầu đã chọn:", date);
                                field.onChange(date);
                              }}
                              disabled={(date) =>
                                date < new Date("2000-01-01") ||
                                (form.getValues("endDate") &&
                                  date > form.getValues("endDate"))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="col-span-4 col-start-2" />
                      </FormItem>
                    )}
                  />

                  {/* Ngày kết thúc */}
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right">
                          Ngày kết thúc
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl className="col-span-3">
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
                          <PopoverContent
                            className="w-auto p-0"
                            align="start"
                            style={{ zIndex: 100 }}
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                console.log("Ngày kết thúc đã chọn:", date);
                                field.onChange(date);
                              }}
                              disabled={(date) =>
                                date < new Date("2000-01-01") ||
                                (form.getValues("startDate") &&
                                  date < form.getValues("startDate"))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="col-span-4 col-start-2" />
                      </FormItem>
                    )}
                  />

                  {/* Nút lưu và đóng */}
                  <div className="mt-1 flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                    >
                      Đóng
                    </Button>
                    <Button type="submit">Lưu học kỳ</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
