"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createDecision } from "@/lib/api/redux/decisionListTopicSlice";
import { toast } from "sonner";

interface DecisionFormData {
  decisionName: string;
  decisionTitle: string;
  decisionDate: string;
  type: "DRAFT" | "FINAL";
  semesterId: string;
}

export const CreateDecisionListTopic: React.FC = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.decisionList);

  const [formData, setFormData] = useState<DecisionFormData>({
    decisionName: "",
    decisionTitle: "",
    decisionDate: "",
    type: "DRAFT",
    semesterId: semesterId || "",
  });

  useEffect(() => {
    if (semesterId) {
      setFormData((prev) => ({ ...prev, semesterId }));
    }
  }, [semesterId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: "DRAFT" | "FINAL") => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createDecision(formData)).unwrap();
      toast.success("Quyết định đã được tạo thành công!", {
        description: "Quyết định giao đề tài luận văn mới đã được thêm.",
      });
      setFormData({
        decisionName: "",
        decisionTitle: "",
        decisionDate: "",
        type: "DRAFT",
        semesterId: semesterId || "",
      });
      navigate(`/academic/decision-list-top/${semesterId}`);
    } catch (err) {
      toast.error("Không thể tạo quyết định", {
        description: error || "Đã xảy ra lỗi khi tạo quyết định.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Tạo Quyết Định Giao Đề Tài Luận Văn Mới</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="decisionName">Mã Quyết Định</Label>
              <Input
                id="decisionName"
                name="decisionName"
                value={formData.decisionName}
                onChange={handleChange}
                placeholder="ví dụ: 123"
                required
              />
            </div>

            <div>
              <Label htmlFor="decisionTitle">Tiêu Đề Quyết Định</Label>
              <Input
                id="decisionTitle"
                name="decisionTitle"
                value={formData.decisionTitle}
                onChange={handleChange}
                placeholder="ví dụ: DANH SÁCH GIAO VÀ HƯỚNG DẪN KHÓA LUẬN..."
                required
              />
            </div>

            <div>
              <Label htmlFor="decisionDate">Ngày Quyết Định</Label>
              <Input
                id="decisionDate"
                name="decisionDate"
                type="date"
                value={formData.decisionDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Loại Quyết Định</Label>
              <Select onValueChange={handleTypeChange} value={formData.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Nháp</SelectItem>
                  <SelectItem value="FINAL">Chính thức</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="semesterId">ID Học Kỳ</Label>
              <Input
                id="semesterId"
                name="semesterId"
                value={formData.semesterId}
                onChange={handleChange}
                placeholder="ví dụ: 83b0bb1f-01dd-41d8-aba1-31e45f0aa2b8"
                required
                disabled={!!semesterId}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Đang tạo..." : "Tạo Quyết Định"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDecisionListTopic;