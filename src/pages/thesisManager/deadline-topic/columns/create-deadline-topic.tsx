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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchAllYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters } from "@/lib/api/redux/semesterSlice";
import { createSubmissionRound } from "@/lib/api/redux/submissionRoundSlice";
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

// Chỉ lấy "REVIEW" và "DEFENSE"
const submissionTypes = ["REVIEW", "DEFENSE"] as const;

const formSchema = z
  .object({
    yearId: z.string().min(1, "Vui lòng chọn năm học"),
    semesterId: z.string().min(1, "Vui lòng chọn kỳ học"),
    type: z.enum(submissionTypes, {
      errorMap: () => ({ message: "Vui lòng chọn loại" }),
    }),
    roundNumber: z.string().min(1, "Vui lòng chọn lần nộp"),
    description: z.string().min(1, "Vui lòng nhập mô tả"),
    startDate: z.date({ required_error: "Vui lòng chọn ngày bắt đầu" }).optional(),
    endDate: z.date({ required_error: "Vui lòng chọn ngày kết thúc" }).optional(),
  })
  .refine(
    (data) => !data.endDate || !data.startDate || data.endDate > data.startDate,
    {
      message: "Ngày kết thúc phải lớn hơn ngày bắt đầu",
      path: ["endDate"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  yearId: "",
  semesterId: "",
  type: "REVIEW", // Mặc định là "REVIEW" thay vì "TOPIC"
  roundNumber: "",
  description: "",
  startDate: undefined,
  endDate: undefined,
};

type CreateSubmissionRoundProps = {
  onCreated?: (yearId: string, semesterId: string) => void;
};

export const CreateSubmissionRound: React.FC<CreateSubmissionRoundProps> = ({ onCreated }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: years, loading: yearLoading } = useSelector((state: RootState) => state.years);
  const { data: semesters, loading: semesterLoading } = useSelector((state: RootState) => state.semesters);

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit, watch, reset, setValue } = form;
  const yearId = watch("yearId");
  const type = watch("type");

  const availableYears = years.filter((y) => !y.isDeleted);
  const availableSemesters = semesters.filter((s) => !s.isDeleted && s.yearId === yearId);
  const sortedSemesters = availableSemesters.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  useEffect(() => {
    dispatch(fetchAllYears());
  }, [dispatch]);

  useEffect(() => {
    if (yearId) {
      dispatch(fetchSemesters({ yearId }));
      setValue("semesterId", "");
      setValue("startDate", undefined);
      setValue("endDate", undefined);
    }
  }, [yearId, dispatch, setValue]);

  useEffect(() => {
    if (type) setValue("roundNumber", "");
  }, [type, setValue]);

  const convertToISODate = (date: Date, isEnd = false) =>
    isEnd
      ? new Date(date.setHours(23, 59, 59, 999)).toISOString()
      : new Date(date.setHours(0, 0, 0, 0)).toISOString();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const { semesterId, type, roundNumber, description, startDate, endDate } = data;
      const parsedRound = Number(roundNumber);

      if (isNaN(parsedRound) || parsedRound <= 0) {
        toast.error("Lần nộp phải là số hợp lệ lớn hơn 0!");
        return;
      }

      if (!startDate || !endDate) {
        toast.error("Vui lòng chọn cả ngày bắt đầu và kết thúc!");
        return;
      }

      await dispatch(
        createSubmissionRound({
          semesterId,
          type,
          roundNumber: parsedRound,
          description,
          startDate: convertToISODate(startDate),
          endDate: convertToISODate(endDate, true),
        })
      ).unwrap();

      toast.success("Tạo vòng nộp thành công!");

      if (onCreated) onCreated(data.yearId, data.semesterId);

      setIsOpen(false);
      reset(defaultValues);
    } catch (err: any) {
      toast.error(`${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    reset(defaultValues);
  };

  return (
    <div>
      <Button className="bg-black text-white" onClick={() => setIsOpen(true)}>
        Tạo vòng thời gian mới
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/80" onClick={handleClose} />
          <div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold">Tạo thời gian</h2>
            <p className="text-sm text-muted-foreground">
              Chọn năm học, kỳ học và thông tin vòng nộp bên dưới.
            </p>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Năm học */}
                <FormField
                  control={form.control}
                  name="yearId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Năm học</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn năm học" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {yearLoading ? (
                              <SelectItem value="loading" disabled>Đang tải...</SelectItem>
                            ) : availableYears.length > 0 ? (
                              availableYears.map((year) => (
                                <SelectItem key={year.id} value={year.id}>
                                  {year.year}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>Không có năm học</SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Kỳ học */}
                <FormField
                  control={form.control}
                  name="semesterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kỳ học</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!yearId || semesterLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kỳ học" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {semesterLoading ? (
                              <SelectItem value="loading" disabled>Đang tải...</SelectItem>
                            ) : sortedSemesters.length > 0 ? (
                              sortedSemesters.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                  {s.code}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>Không có kỳ học</SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Loại vòng nộp */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại vòng nộp" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="REVIEW">Kiểm tra đồ án</SelectItem>
                          <SelectItem value="DEFENSE">Bảo vệ đồ án</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Lần nộp */}
                <FormField
                  control={form.control}
                  name="roundNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lần nộp</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!type}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn lần nộp" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          {type !== "DEFENSE" && <SelectItem value="3">3</SelectItem>}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mô tả */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Input placeholder="VD: Đợt kiểm tra lần 2" maxLength={100} {...field} />
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
                    <FormItem>
                      <FormLabel>Ngày bắt đầu</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP", { locale: vi }) : "Chọn ngày"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const endDate = form.getValues("endDate");
                              return date < new Date("2000-01-01") || (endDate instanceof Date && date > endDate);
                            }}
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
                    <FormItem>
                      <FormLabel>Ngày kết thúc</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP", { locale: vi }) : "Chọn ngày"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const startDate = form.getValues("startDate");
                              return date < new Date("2000-01-01") || (startDate instanceof Date && date < startDate);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Đang lưu..." : "Lưu vòng nộp"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};