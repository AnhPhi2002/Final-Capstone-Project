"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics } from "@/lib/api/redux/topicSlice";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { DataTable } from "./columns/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "./columns/columns";
import { fetchGroupDetail } from "@/lib/api/redux/groupDetailSliceV2";

interface GroupMember {
  id: string;
  groupId: string;
  studentId: string;
  joinedAt: string;
  leaveAt: string | null;
  leaveReason: string | null;
  isActive: boolean;
  status: "ACTIVE" | "INACTIVE";
  student: {
    id: string;
    studentCode: string;
    user: {
      username: string;
      email: string;
      profession: string;
      specialty: string;
    };
  };
  role: {
    id: string;
    name: "leader" | "member";
  };
}

interface CombinedData {
  id: string;
  topicCode: string;
  groupCode: string;
  nameEn: string;
  nameVi: string;
  creator: { fullName: string };
  majors: { name: string }[];
  student: GroupMember["student"] | null;
}

export const DecisionListTopView: React.FC<{
  semesterId: string;
  submissionPeriodId?: string;
  majorId?: string;
  decisionId?: string;
}> = ({ semesterId, submissionPeriodId, majorId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const topicsState = useSelector((state: RootState) => state.topics);
  const groupState = useSelector((state: RootState) => state.groupDetail);

  const topics = topicsState.data;
  const topicsLoading = topicsState.loading;
  const topicsError = topicsState.error;

  const group = groupState.group;
  const groupLoading = groupState.loading;
  const groupError = groupState.error;

  // Fetch topics and group detail (1 nhóm đầu tiên)
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchTopics({ semesterId, submissionPeriodId, majorId }));
    }
  }, [dispatch, semesterId, submissionPeriodId, majorId]);

  useEffect(() => {
    const groupId = topics?.[0]?.group?.id;
    if (groupId) {
      dispatch(fetchGroupDetail({ groupId, semesterId }));
    }
  }, [dispatch, semesterId, topics]);

  // Tạo map nhómId -> thành viên
  const groupMap: Record<string, GroupMember[]> = {};
  if (group?.id && group?.members) {
    groupMap[group.id] = group.members;
  }

  // Gộp dữ liệu
  const combinedData: CombinedData[] = [];

  topics.forEach((topic) => {
    const groupCode = topic.group?.groupCode || "N/A";
    const groupMembers = groupMap[topic.group?.id || ""] || [];
  
    groupMembers.forEach((member) => {
      combinedData.push({
        id: topic.id,
        topicCode: topic.topicCode || "N/A",
        groupCode,
        nameEn: topic.nameEn,
        nameVi: topic.nameVi,
        creator: topic.creator || { fullName: "N/A" },
        majors: topic.majors || [],
        student: member.student,
      });
    });
  });

  const textClass = "text-[14.5pt] font-times leading-[1.5]";

  return (
    <div>
      <div className="max-w-8xl mx-auto p-8">
        <Card className={`${textClass} shadow-lg`}>
          <CardContent className="p-10">
            <div className="text-center">
              <p className="font-bold uppercase">
                DANH SÁCH GIAO VÀ HƯỚNG DẪN KHÓA LUẬN TỐT NGHIỆP HỌC KỲ SPRING 2025
              </p>
              <p className="font-bold uppercase mt-1">
                NGÀNH CÔNG NGHỆ THÔNG TIN, KỸ THUẬT PHẦN MỀM, AN TOÀN THÔNG TIN,
                THIẾT KẾ ĐỒ HỌA, QUẢN TRỊ KINH DOANH, KINH DOANH QUỐC TẾ, NGÔN NGỮ ANH,
                VÀ NGÔN NGỮ NHẬT - CƠ SỞ HỒ CHÍ MINH
              </p>
              <p className="italic mt-3">
                (Ban hành kèm theo Quyết định số ……/QĐ-FPTUHCM ngày …… tháng …… năm …… <br />
                của Giám Đốc phân hiệu Trường Đại học FPT tại TP.Hồ Chí Minh)
              </p>
            </div>
            <div className="mt-4">
              {topicsLoading || groupLoading ? (
                <p>Đang tải...</p>
              ) : topicsError || groupError ? (
                <p className="text-red-500">
                  {topicsError || groupError} (semesterId: {semesterId})
                </p>
              ) : combinedData.length > 0 ? (
                <DataTable columns={columns} data={combinedData} />
              ) : (
                <p className="text-gray-500">Không có dữ liệu cho học kỳ này.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DecisionListTopView;
