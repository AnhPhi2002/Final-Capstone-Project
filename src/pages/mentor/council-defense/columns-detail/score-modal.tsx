import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { evaluateStudentDefense } from "@/lib/api/redux/councilDefenseSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Định nghĩa schema cho từng sinh viên
const studentEvaluationSchema = z.object({
  studentId: z.string().min(1, "Sinh viên không hợp lệ"),
  result: z.enum(["PASS", "NOT_PASS"], { required_error: "Vui lòng chọn kết quả" }),
  feedback: z.string().optional(),
});

// Định nghĩa schema cho form
const formSchema = z.object({
  evaluations: z.array(studentEvaluationSchema),
});

// Định nghĩa kiểu dữ liệu cho form
type FormData = z.infer<typeof formSchema>;

type ScoreModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: DefenseSchedule;
  semesterId: string;
};

export const ScoreModal: React.FC<ScoreModalProps> = ({ open, setOpen, session, semesterId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loadingScore, errorScore } = useSelector((state: RootState) => state.councilDefense);

  // Tạo map để lấy status và email từ group.members dựa trên studentId
  const studentStatusMap = new Map<string, { status: string; studentCode: string; email: string }>(
    session.group.members.map((member) => [
      member.studentId,
      {
        status: member.status,
        studentCode: member.student.studentCode,
        email: member.student.user.email,
      },
    ])
  );

  // Danh sách sinh viên INACTIVE để hiển thị trong toast
  const inactiveStudents = session.memberResults
    .filter((result) => studentStatusMap.get(result.studentId)?.status === "INACTIVE")
    .map((result) => ({
      studentCode: studentStatusMap.get(result.studentId)?.studentCode || "N/A",
      email: studentStatusMap.get(result.studentId)?.email || "N/A",
    }));

  // Khởi tạo form với dữ liệu mặc định
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      evaluations: session.memberResults.map((result) => ({
        studentId: result.studentId,
        result:
          studentStatusMap.get(result.studentId)?.status === "INACTIVE"
            ? "NOT_PASS"
            : undefined, // undefined cho ACTIVE, NOT_PASS cho INACTIVE
        feedback: "",
      })),
    },
  });

  // Hiển thị thông báo khi có sinh viên INACTIVE
  useEffect(() => {
    if (open && inactiveStudents.length > 0) {
      const message = `Các sinh viên sau ở trạng thái INACTIVE và sẽ tự động được đặt kết quả NOT_PASS: ${inactiveStudents
        .map((s) => `${s.studentCode} (${s.email})`)
        .join(", ")}.`;
      toast.info(message);
    }
  }, [open, inactiveStudents]);

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Kiểm tra nếu có sinh viên ACTIVE chưa được chọn kết quả
      const hasEmptyResult = data.evaluations.some(
        (evaluation) =>
          studentStatusMap.get(evaluation.studentId)?.status === "ACTIVE" && !evaluation.result
      );
      if (hasEmptyResult) {
        toast.error("Vui lòng chọn kết quả cho tất cả sinh viên ACTIVE!");
        return;
      }

      // Gửi đánh giá cho từng sinh viên
      for (const evaluation of data.evaluations) {
        await dispatch(
          evaluateStudentDefense({
            scheduleId: session.id,
            studentId: evaluation.studentId,
            semesterId,
            result: evaluation.result,
            feedback: evaluation.feedback || "",
          })
        ).unwrap();
      }

      toast.success(`Chấm điểm thành công cho ${data.evaluations.length} sinh viên!`);
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error(errorScore || "Lỗi khi chấm điểm!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chấm điểm cho nhóm {session.group?.groupCode}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Mã nhóm</Label>
                <Input value={session.group?.groupCode || "N/A"} disabled />
              </div>
              <div>
                <Label>Tên đề tài</Label>
                <Input
                  value={session.group.topicAssignments[0]?.topic.name || "N/A"}
                  disabled
                />
              </div>

              {/* Danh sách sinh viên */}
              <FormField
                control={form.control}
                name="evaluations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đánh giá sinh viên</FormLabel>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {field.value.map((evaluation, index) => {
                        const student = session.memberResults.find(
                          (result) => result.studentId === evaluation.studentId
                        )?.student;
                        const studentInfo = studentStatusMap.get(evaluation.studentId);
                        const email = studentInfo?.email ?? "Chưa có email";
                        const isActive = studentInfo?.status === "ACTIVE";

                        return (
                          <div
                            key={evaluation.studentId}
                            className="border p-4 rounded-md space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {student?.studentCode} - {email} ({studentInfo?.status})
                              </span>
                            </div>
                            <div>
                              <FormLabel>Kết quả</FormLabel>
                              <FormControl>
                                {isActive ? (
                                  <Select
                                    value={evaluation.result}
                                    onValueChange={(value) => {
                                      const updatedEvaluations = [...field.value];
                                      updatedEvaluations[index] = {
                                        ...updatedEvaluations[index],
                                        result: value as "PASS" | "NOT_PASS",
                                      };
                                      form.setValue("evaluations", updatedEvaluations, {
                                        shouldValidate: true,
                                      });
                                    }}
                                    disabled={loadingScore}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn kết quả" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="PASS">PASS</SelectItem>
                                      <SelectItem value="NOT_PASS">NOT_PASS</SelectItem>
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input value="NOT_PASS" disabled />
                                )}
                              </FormControl>
                              <FormMessage />
                            </div>
                            <div>
                              <FormLabel>Nhận xét</FormLabel>
                              <FormControl>
                                <Textarea
                                  value={evaluation.feedback || ""}
                                  onChange={(e) => {
                                    const updatedEvaluations = [...field.value];
                                    updatedEvaluations[index] = {
                                      ...updatedEvaluations[index],
                                      feedback: e.target.value,
                                    };
                                    form.setValue("evaluations", updatedEvaluations, {
                                      shouldValidate: true,
                                      shouldDirty: true,
                                    });
                                  }}
                                  placeholder="Nhập nhận xét..."
                                  disabled={loadingScore || !isActive}
                                />
                              </FormControl>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={loadingScore}>
                Hủy
              </Button>
              <Button type="submit" disabled={loadingScore}>
                {loadingScore ? "Đang lưu..." : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};