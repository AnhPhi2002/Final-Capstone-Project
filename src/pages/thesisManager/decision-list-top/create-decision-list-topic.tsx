"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { columns } from "./columns/columns";
import { DataTable } from "./columns/data-table";
import { fetchGuidanceList } from "@/lib/api/redux/getDecisionListTableSlice";
import { uploadDecisionFile } from "@/lib/api/redux/uploadDecisionSlice";
import { createDecision } from "@/lib/api/redux/decisionListTopc";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { z } from "zod";

// Define Zod schema for DecisionFormData
const DecisionFormSchema = z.object({
  decisionName: z
    .string()
    .min(1, "Mã quyết định là bắt buộc"),
  decisionTitle: z.string().min(1, "Tiêu đề quyết định là bắt buộc"),
  decisionDate: z.string().min(1, "Ngày ra quyết định là bắt buộc"),
  type: z.enum(["DRAFT", "FINAL"]),
  semesterId: z.string().min(1, "Học kỳ là bắt buộc"),
  decisionURL: z.string().optional(), // Optional since file upload is not mandatory
});

type DecisionFormData = z.infer<typeof DecisionFormSchema>;

const CreateDecisionListTopic: React.FC = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { guidanceList, loading: guidanceLoading, error: guidanceError } = useSelector(
    (state: RootState) => state.decisionTable
  );

  const { loading: uploadDecisionLoading } = useSelector(
    (state: RootState) => state.uploadDecision
  );

  const [formData, setFormData] = useState<DecisionFormData>({
    decisionName: "",
    decisionTitle: "",
    decisionDate: "",
    type: "DRAFT",
    semesterId: semesterId || "",
    decisionURL: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof DecisionFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textClass = "text-[14.5pt] font-times leading-[1.5]";

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGuidanceList({ semesterId, includeAI: false }));
    }
  }, [semesterId, dispatch]);

  const updateField = (key: keyof DecisionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear error for the field when user starts typing
    setFormErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(uploadDecisionFile({ file, type: formData.type }))
        .unwrap()
        .then((res) => {
          updateField("decisionURL", res.fileUrl);
          toast.success("Tải file thành công");
        })
        .catch((err) => {
          toast.error("Lỗi khi tải file", {
            description: typeof err === "string" ? err : err?.message || "Không rõ lỗi",
          });
        });
    }
  };

  const handleRemoveFile = () => {
    updateField("decisionURL", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.info("Đã xóa file");
  };

  const handleRetryGuidance = () => {
    if (semesterId) {
      dispatch(fetchGuidanceList({ semesterId, includeAI: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data with Zod
    const validationResult = DecisionFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      setFormErrors({
        decisionName: errors.decisionName?.[0],
        decisionTitle: errors.decisionTitle?.[0],
        decisionDate: errors.decisionDate?.[0],
        semesterId: errors.semesterId?.[0],
        type: errors.type?.[0],
        decisionURL: errors.decisionURL?.[0],
      });
      toast.error("Vui lòng sửa các lỗi trong biểu mẫu");
      return;
    }

    const payload = {
      decisionName: formData.decisionName,
      decisionTitle: formData.decisionTitle,
      decisionDate: formData.decisionDate,
      type: formData.type,
      semesterId: formData.semesterId,
      decisionURL: formData.decisionURL,
    };

    setLoading(true);
    dispatch(createDecision(payload))
      .unwrap()
      .then(() => {
        toast.success("Tạo quyết định thành công");
        navigate(`/academic/decision-list-top/${formData.semesterId}`);
      })
      .catch((err) => {
        console.error("❌ Error when creating decision:", err);
        toast.error("Lỗi khi tạo quyết định", {
          description: typeof err === "string" ? err : err?.message || "Không rõ lỗi",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Header title="Tạo quyết định" href="/" currentPage={`Tạo quyết định học kỳ ${semesterId}`} />
      <div className="flex justify-end mt-6 mr-6">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <Select
              value={formData.type}
              onValueChange={(value) => updateField("type", value as "DRAFT" | "FINAL")}
            >
              <SelectTrigger className={`${textClass} w-[180px] border-gray-300`}>
                <SelectValue placeholder="Chọn loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Nháp</SelectItem>
                <SelectItem value="FINAL">Chính thức</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.type && <p className="text-red-500 text-xs mt-1">{formErrors.type}</p>}
          </div>
          <div className="flex flex-col items-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUploadClick}
              disabled={uploadDecisionLoading}
            >
              {uploadDecisionLoading ? "Đang tải..." : `Tải file ${formData.type === "DRAFT" ? "nháp" : "chính thức"}`}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
               accept=".xlsx,.xls,.doc,.docx,.pdf"
            />
            {formData.decisionURL && (
              <div className="flex items-center gap-2 mt-1">
                <p className="text-green-600 text-xs truncate max-w-[150px]">
                  {formData.type === "DRAFT" ? "File nháp" : "File chính thức"} đã tải
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-red-600 hover:text-red-800"
                >
                  Xóa
                </Button>
              </div>
            )}
            {formErrors.decisionURL && (
              <p className="text-red-500 text-xs mt-1">{formErrors.decisionURL}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto p-8">
        <Card className={`${textClass} shadow-lg`}>
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <Textarea
                  value={formData.decisionTitle}
                  onChange={(e) => updateField("decisionTitle", e.target.value)}
                  placeholder="VD: DANH SÁCH GIAO VÀ HƯỚNG DẪN KHÓA LUẬN TỐT NGHIỆP HỌC KỲ SPRING 2025"
                  className={`${textClass} border border-black w-full text-center font-bold uppercase resize-none`}
                  rows={4}
                />
                {formErrors.decisionTitle && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.decisionTitle}</p>
                )}
                <p className="italic mt-3">
                  (Ban hành kèm theo Quyết định số{" "}
                  <span className="inline-block">
                    <Input
                      value={formData.decisionName}
                      onChange={(e) => updateField("decisionName", e.target.value)}
                      placeholder="VD: 123/QĐ-FPTUHCM "
                      className={`${textClass} inline-block w-32 sm:w-40 border border-black px-2 h-[32px]`}
                    />
                    {formErrors.decisionName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.decisionName}</p>
                    )}
                  </span>{" "}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          `${textClass} w-[200px] justify-start text-left border border-black h-[32px]`,
                          !formData.decisionDate && "text-muted-foreground"
                        )}
                      >
                        {formData.decisionDate
                          ? format(new Date(formData.decisionDate), "dd/MM/yyyy")
                          : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.decisionDate ? new Date(formData.decisionDate) : undefined}
                        onSelect={(date) =>
                          updateField("decisionDate", date ? format(date, "yyyy-MM-dd") : "")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {formErrors.decisionDate && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.decisionDate}</p>
                  )}{" "}
                  của Giám Đốc phân hiệu Trường Đại học FPT tại TP. Hồ Chí Minh)
                </p>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Đang lưu..." : "Lưu quyết định"}
                </Button>
              </div>
            </form>

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-2">Danh sách hướng dẫn</h3>
              <div className="mt-6">
                {guidanceLoading && <p>Đang tải...</p>}
                {guidanceError && (
                  <div className="text-red-500">
                    <p>{guidanceError}</p>
                    <Button variant="link" onClick={handleRetryGuidance} className="text-blue-600 mt-2">
                      Thử lại
                    </Button>
                  </div>
                )}
                {!guidanceLoading && !guidanceError && guidanceList.length > 0 ? (
                  <DataTable columns={columns} data={guidanceList} />
                ) : (
                  !guidanceLoading &&
                  !guidanceError && <p className="text-center">Không có dữ liệu để hiển thị</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateDecisionListTopic;