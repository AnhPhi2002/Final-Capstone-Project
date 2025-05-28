"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchInterMajorConfigs } from "@/lib/api/redux/interMajorSlice";
import { fetchSemesterDetail } from "@/lib/api/redux/semesterSlice";
import Header from "@/components/header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateInterMajorDialog } from "./CreateInterMajorDialog";
import { useNavigate } from "react-router";

export const InterMajorDetailPage: React.FC = () => {
  const { id: semesterId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: configs, loading: configsLoading, error: configsError } = useSelector(
    (state: RootState) => state.interMajor
  );
  const { semesterDetail: semester, loading: semesterLoading, error: semesterError } = useSelector(
    (state: RootState) => state.semesters
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchInterMajorConfigs({ semesterId }));
      dispatch(fetchSemesterDetail(semesterId));
    }
  }, [dispatch, semesterId]);

  const activeConfigs = configs.filter((config) => !config.isDeleted);

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/academic/inter-major"
        currentPage="Danh sách liên ngành"
      />

     <div className="flex justify-end px-6 mt-4">
  <CreateInterMajorDialog semesterId={semesterId!} />
</div>


      <div className="p-6 flex-1 overflow-auto">
        {semesterLoading ? (
          <p className="text-center text-gray-500">Đang tải thông tin kỳ...</p>
        ) : semesterError ? (
          <p className="text-center text-red-500">Lỗi: {semesterError}</p>
        ) : configsLoading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : configsError ? (
          <p className="text-center text-red-500">Lỗi: {configsError}</p>
        ) : activeConfigs.length === 0 ? (
          <p className="text-center text-gray-500">Không có dữ liệu liên ngành</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeConfigs.map((config) => (
              <Card
                key={config.id}
                onClick={() => navigate(`/academic/inter-major/${semesterId}/${config.id}`)}
                className="w-full p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {config.name}
                  </CardTitle>
                  <CardDescription>
                    {config.firstMajor.name} & {config.secondMajor.name}
                  </CardDescription>
                  {semester && (
                    <div className="text-sm text-gray-600">
                      Kỳ: {semester.code}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span>Trạng thái</span>
                    <Badge
                      className={
                        config.isActive
                          ? "bg-green-100 text-green-600 border border-green-500 hover:bg-green-200"
                          : "bg-gray-100 text-gray-600 border border-gray-500 hover:bg-gray-200"
                      }
                    >
                      {config.isActive ? "Đang hoạt động" : "Không hoạt động"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};