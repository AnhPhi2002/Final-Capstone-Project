// src/components/statistics-overview.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchStudentQualification,
  fetchGroupStatus,
  fetchTopicStatus,
  fetchReviewRounds,
  fetchDefenseRounds,
  fetchStudentGroupStatus,
  fetchGroupTopicStatus,
  selectStatistics,
} from "@/lib/api/redux/statisticsSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

// Định nghĩa type chung cho dữ liệu thống kê
type StatItem = { status: string; total: number } | { round: string; total: number };

// Hàm dịch trạng thái sang tiếng Việt
const translateStatus = (status: string, keyField: "status" | "round"): string => {
  if (keyField === "status") {
    const statusMap: { [key: string]: string } = {
      Qualified: "Đạt",
      "Not Qualified": "Không đạt",
      ACTIVE: "Hoạt động",
      INACTIVE: "Không hoạt động",
      PENDING: "Đang chờ",
      APPROVED: "Đã duyệt",
      REJECTED: "Bị từ chối",
      "Has Group": "Có nhóm",
      "No Group": "Không có nhóm",
      "Has Topic": "Có đề tài",
      "No Topic": "Không có đề tài",
    };
    return statusMap[status] || status;
  } else {
    const roundMap: { [key: string]: string } = {
      "Review 1": "Xét duyệt 1",
      "Review 2": "Xét duyệt 2",
      "Review 3": "Xét duyệt 3",
      "Defense 1": "Bảo vệ 1",
      "Defense 2": "Bảo vệ 2",
    };
    return roundMap[status] || status;
  }
};

const StatisticsOverview: React.FC = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    studentQualification,
    groupStatus,
    topicStatus,
    reviewRounds,
    defenseRounds,
    studentGroupStatus,
    groupTopicStatus,
  } = useSelector((state: RootState) => selectStatistics(state));

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchStudentQualification(semesterId));
      dispatch(fetchGroupStatus(semesterId));
      dispatch(fetchTopicStatus(semesterId));
      dispatch(fetchReviewRounds(semesterId));
      dispatch(fetchDefenseRounds(semesterId));
      dispatch(fetchStudentGroupStatus(semesterId));
      dispatch(fetchGroupTopicStatus(semesterId));
    }
  }, [dispatch, semesterId]);

  const getBadgeStyles = (status: string, keyField: "status" | "round") => {
    if (keyField === "status") {
      if (status === "Qualified" || status === "ACTIVE" || status === "APPROVED" || status === "Has Group" || status === "Has Topic") {
        return "bg-green-100 text-green-700 border-green-500";
      }
      if (status === "PENDING") {
        return "bg-yellow-100 text-yellow-700 border-yellow-500";
      }
      return "bg-red-100 text-red-700 border-red-500";
    } else {
      if (status.includes("Review")) {
        return "bg-blue-100 text-blue-700 border-blue-500";
      }
      return "bg-purple-100 text-purple-700 border-purple-500";
    }
  };

  const renderBarChart = (data: StatItem[], keyField: "status" | "round") => (
    <BarChart width={300} height={200} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={keyField}
        tickFormatter={(value) => translateStatus(value, keyField)}
        tick={{ fontSize: 12 }}
      />
      <YAxis />
      <Tooltip
        formatter={(value: number, name: string) => [
          value,
          translateStatus(name, keyField),
        ]}
      />
      <Bar dataKey="total" fill="#4CAF50" />
    </BarChart>
  );

  const renderLineChart = (data: StatItem[], keyField: "status" | "round") => (
    <LineChart width={300} height={200} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={keyField}
        tickFormatter={(value) => translateStatus(value, keyField)}
        tick={{ fontSize: 12 }}
      />
      <YAxis />
      <Tooltip
        formatter={(value: number, name: string) => [
          value,
          translateStatus(name, keyField),
        ]}
      />
      <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
  );

  const renderStatSection = (
    title: string,
    data: StatItem[],
    loading: boolean,
    error: string | null,
    keyField: "status" | "round",
    chartType: "bar" | "line"
  ) => {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        <Card className="shadow-lg border border-gray-200 rounded-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardDescription className="text-sm text-gray-500">
              Tổng quan thống kê
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            {/* Biểu đồ */}
            <div className="flex-1">
              {loading ? (
                <p className="text-gray-500">Đang tải...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : !Array.isArray(data) || data.length === 0 ? (
                <p className="text-gray-500">Không có dữ liệu</p>
              ) : chartType === "bar" ? (
                renderBarChart(data, keyField)
              ) : (
                renderLineChart(data, keyField)
              )}
            </div>
            {/* Danh sách dữ liệu */}
            <div className="flex-1">
              {loading ? (
                <p className="text-gray-500">Đang tải...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : !Array.isArray(data) || data.length === 0 ? (
                <p className="text-gray-500">Không có dữ liệu</p>
              ) : (
                <div className="space-y-3">
                  {data.map((item, index) => {
                    const displayKey =
                      keyField === "status"
                        ? (item as { status: string }).status
                        : (item as { round: string }).round;
                    const translatedKey = translateStatus(displayKey, keyField);
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-base font-medium text-gray-700">
                          {translatedKey}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-base font-semibold px-3 py-1 border ${getBadgeStyles(
                            displayKey,
                            keyField
                          )}`}
                        >
                          {item.total}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg">
      {renderStatSection(
        "Sinh viên đạt/không đạt",
        studentQualification.data,
        studentQualification.loading,
        studentQualification.error,
        "status",
        "bar"
      )}
      {renderStatSection(
        "Trạng thái nhóm",
        groupStatus.data,
        groupStatus.loading,
        groupStatus.error,
        "status",
        "bar"
      )}
      {renderStatSection(
        "Trạng thái đề tài",
        topicStatus.data,
        topicStatus.loading,
        topicStatus.error,
        "status",
        "bar"
      )}
      {renderStatSection(
        "Vòng xét duyệt",
        reviewRounds.data,
        reviewRounds.loading,
        reviewRounds.error,
        "round",
        "line"
      )}
      {renderStatSection(
        "Vòng bảo vệ",
        defenseRounds.data,
        defenseRounds.loading,
        defenseRounds.error,
        "round",
        "line"
      )}
      {renderStatSection(
        "Sinh viên có/không có nhóm",
        studentGroupStatus.data,
        studentGroupStatus.loading,
        studentGroupStatus.error,
        "status",
        "bar"
      )}
      {renderStatSection(
        "Nhóm có/không có đề tài",
        groupTopicStatus.data,
        groupTopicStatus.loading,
        groupTopicStatus.error,
        "status",
        "bar"
      )}
    </div>
  );
};

export default StatisticsOverview;