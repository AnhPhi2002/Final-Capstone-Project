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

const submissionTypes = ["TOPIC", "CHECK-TOPIC", "REVIEW", "DEFENSE"] as const;
type SubmissionType = (typeof submissionTypes)[number];

const formSchema = z
  .object({
    yearId: z.string().min(1, "Vui lòng chọn năm học"),
    semesterId: z.string().min(1, "Vui lòng chọn kỳ học"),
    type: z.enum(submissionTypes, {
      errorMap: () => ({ message: "Vui lòng chọn loại" }),
    }),
    roundNumber: z.string().min(1, "Vui lòng chọn lần nộp"),
    description: z.string().min(1, "Vui lòng nhập mô tả"),
    startDate: z
      .date({ required_error: "Vui lòng chọn ngày bắt đầu" })
      .default(new Date()),
    endDate: z
      .date({ required_error: "Vui lòng chọn ngày kết thúc" })
      .default(new Date()),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "Ngày kết thúc phải lớn hơn ngày bắt đầu",
    path: ["endDate"],
  });

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  yearId: "",
  semesterId: "",
  type: "TOPIC" as SubmissionType,
  roundNumber: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
};

export const CreateSubmissionRound = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: years, loading: yearLoading } = useSelector(
    (state: RootState) => state.years
  );
  const { data: semesters, loading: semesterLoading } = useSelector(
    (state: RootState) => state.semesters
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit, watch, reset, setValue } = form;
  const yearId = watch("yearId");
  const type = watch("type");
  const semesterId = watch("semesterId");

  const availableYears = years.filter((y) => !y.isDeleted);
  const availableSemesters = semesters.filter(
    (s) => !s.isDeleted && s.yearId === yearId
  );
  const sortedSemesters = availableSemesters.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  const selectedSemester = semesters.find((s) => s.id === semesterId);

  useEffect(() => {
    dispatch(fetchAllYears());
  }, [dispatch]);

  useEffect(() => {
    if (yearId) {
      dispatch(fetchSemesters({ yearId }));
      setValue("semesterId", "");
      setValue("startDate", new Date());
      setValue("endDate", new Date());
    }
  }, [yearId, dispatch, setValue]);

  useEffect(() => {
    if (type) {
      setValue("roundNumber", "");
    }
  }, [type, setValue]);

  const convertToISODate = (date: Date, isEnd = false) =>
    isEnd
      ? new Date(date.setHours(23, 59, 59, 999)).toISOString()
      : new Date(date.setHours(0, 0, 0, 0)).toISOString();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const { semesterId, type, roundNumber, description, startDate, endDate } =
        data;
      const parsedRound = Number(roundNumber);

      if (isNaN(parsedRound) || parsedRound <= 0) {
        toast.error("Lần nộp phải là số hợp lệ lớn hơn 0!");
        return;
      }

      if (selectedSemester) {
        const semesterStart = new Date(selectedSemester.startDate);
        const semesterEnd = new Date(selectedSemester.endDate);
        if (startDate < semesterStart || endDate > semesterEnd) {
          toast.error("Ngày phải nằm trong khoảng thời gian của kỳ học!");
          return;
        }
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
      setIsOpen(false);
      reset(defaultValues);
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra khi tạo vòng nộp!");
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
        Tạo vòng nộp mới
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/80"
            onClick={handleClose}
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
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Tạo vòng nộp mới</h2>
              <p className="text-sm text-muted-foreground">
                Chọn năm học, kỳ học và thông tin vòng nộp bên dưới.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="yearId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Năm học</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
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
                                Không có năm học
                              </SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="semesterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kỳ học</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!yearId || semesterLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kỳ học" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {semesterLoading ? (
                              <SelectItem value="loading" disabled>
                                Đang tải...
                              </SelectItem>
                            ) : sortedSemesters.length > 0 ? (
                              sortedSemesters.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                  {s.code}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>
                                Không có kỳ học
                              </SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại</FormLabel>
                      <Select
                        onValueChange={(value: SubmissionType) =>
                          field.onChange(value)
                        }
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="TOPIC">
                              Đợt nộp đề tài
                            </SelectItem>
                            <SelectItem value="CHECK-TOPIC">
                              Xét duyệt đề tài
                            </SelectItem>
                            <SelectItem value="REVIEW">
                              Kiểm tra đồ án
                            </SelectItem>
                            <SelectItem value="DEFENSE">
                              Bảo vệ đồ án
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roundNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lần nộp</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!type}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn lần nộp" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            {type !== "DEFENSE" && (
                              <SelectItem value="3">3</SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="VD: Đợt đăng ký lần 2"
                          {...field}
                          maxLength={100}
                        />
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

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
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
