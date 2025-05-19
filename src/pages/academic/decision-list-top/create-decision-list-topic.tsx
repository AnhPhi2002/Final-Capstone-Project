"use client";

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createDecisionListTopic } from "@/lib/api/redux/decisionListTopicSlice";
import {
  uploadDecisionFile,
  resetSpecificFile,
} from "@/lib/api/redux/uploadDecisionSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { format } from "date-fns";
import { z } from "zod";
// import { cn } from "@/lib/utils";

const DecisionFormSchema = z.object({
  decisionName: z.string().min(1, "Mã quyết định là bắt buộc"),
  decisionTitle: z.string().min(1, "Tiêu đề quyết định là bắt buộc"),
  decisionDate: z.string().min(1, "Ngày ra quyết định là bắt buộc"),
  type: z.enum(["DRAFT", "FINAL"]),
  decisionURL: z.string().optional(),
});

type DecisionFormData = z.infer<typeof DecisionFormSchema>;

const CreateDecisionListTopic: React.FC = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  const {
    draftFile,
    finalFile,
    loading: uploadDecisionLoading,
  } = useSelector((state: RootState) => state.uploadDecision);

  const [formData, setFormData] = useState<DecisionFormData>({
    decisionName: "",
    decisionTitle: "",
    decisionDate: "",
    type: "DRAFT",
    decisionURL: "",
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof DecisionFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateField = <K extends keyof DecisionFormData>(
    key: K,
    value: DecisionFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = DecisionFormSchema.safeParse(formData);

    if (!semesterId) {
      toast.error("Thiếu semesterId trên URL");
      return;
    }

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFormErrors({
        decisionName: errors.decisionName?.[0],
        decisionTitle: errors.decisionTitle?.[0],
        decisionDate: errors.decisionDate?.[0],
        type: errors.type?.[0],
        decisionURL: errors.decisionURL?.[0],
      });
      toast.error("Vui lòng sửa các lỗi trong biểu mẫu");
      return;
    }

    if (!currentUserId) {
      toast.error("Người dùng hiện tại không xác định");
      return;
    }

    const payload = {
      ...formData,
      semesterId,
      createdBy: currentUserId, // Ensure currentUserId is defined
      decisionURL: formData.decisionURL || "", // Ensure decisionURL is a string
    };

    try {
      setLoading(true);
      const created = await dispatch(createDecisionListTopic(payload)).unwrap();
      toast.success("Tạo quyết định thành công");
navigate(`/academic/decision-list-top/${semesterId}/${created.id}`);
    } catch (err: any) {
      toast.error("Lỗi khi tạo quyết định", {
        description:
          typeof err === "string" ? err : err?.message || "Không rõ lỗi",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await dispatch(
        uploadDecisionFile({ file, type: formData.type })
      ).unwrap();
      updateField("decisionURL", result.fileUrl);
    } catch (error) {
      toast.error("Tải file thất bại", { description: error as string });
    }
  };

  const handleRemoveFile = () => {
    dispatch(resetSpecificFile(formData.type));
    updateField("decisionURL", "");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
              placeholder="Tiêu đề quyết định..."
              className="w-full font-bold text-center uppercase border border-black"
              rows={3}
              value={formData.decisionTitle}
              onChange={(e) => updateField("decisionTitle", e.target.value)}
            />
            {formErrors.decisionTitle && (
              <p className="text-red-500 text-xs">{formErrors.decisionTitle}</p>
            )}

            <div className="flex items-center gap-4">
              <Input
                placeholder="Mã quyết định"
                className="border border-black"
                value={formData.decisionName}
                onChange={(e) => updateField("decisionName", e.target.value)}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-black">
                    {formData.decisionDate
                      ? format(new Date(formData.decisionDate), "dd/MM/yyyy")
                      : "Chọn ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={
                      formData.decisionDate
                        ? new Date(formData.decisionDate)
                        : undefined
                    }
                    onSelect={(date) =>
                      updateField(
                        "decisionDate",
                        date ? format(date, "yyyy-MM-dd") : ""
                      )
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-4 items-center">
              <Select
                value={formData.type}
                onValueChange={(val) =>
                  updateField("type", val as "DRAFT" | "FINAL")
                }
              >
                <SelectTrigger className="w-40 border border-gray-300">
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Nháp</SelectItem>
                  <SelectItem value="FINAL">Chính thức</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                onClick={handleUploadClick}
                disabled={uploadDecisionLoading}
              >
                {uploadDecisionLoading
                  ? "Đang tải..."
                  : `Tải file ${
                      formData.type === "DRAFT" ? "nháp" : "chính thức"
                    }`}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              {formData.decisionURL && (
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-green-600 text-xs truncate max-w-[150px]">
                    {(formData.type === "DRAFT"
                      ? draftFile?.fileName
                      : finalFile?.fileName) ?? "Đã tải file"}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xoá
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu quyết định"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDecisionListTopic;
