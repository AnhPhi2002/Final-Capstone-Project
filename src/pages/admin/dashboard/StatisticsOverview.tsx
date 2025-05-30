// src/components/statistics-overview.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentQualification,
  fetchGroupStatus,
  fetchTopicStatus,
  fetchReviewRounds,
  fetchDefenseRounds,
  fetchStudentGroupStatus,
  fetchGroupTopicStatus,
  fetchDefenseResultSummary,
  fetchDefenseResultByRound,
  fetchGroupCreationType,
  selectStatistics,
} from "@/lib/api/redux/statisticsSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Cell } from "recharts";

type StatItem = { status?: string; round?: string; type?: string; total: number; percentage?: number };
type DefenseResultByRoundItem = { round: number; PASS: number; NOT_PASS: number; PASS_percentage: number; NOT_PASS_percentage: number };

interface StatisticsOverviewProps {
  semesterId: string;
}

const translateStatus = (status: string, keyField: "status" | "round" | "type"): string => {
  if (keyField === "status") {
    const statusMap: { [key: string]: string } = {
      Qualified: "Đạt",
      "Not Qualified": "Không đạt",
      ACTIVE: "Hoạt động",
      INACTIVE: "Không hoạt động",
      PENDING: "Đang chờ",
      APPROVED: "Đã duyệt",
      IMPROVED: "Cần cải thiện",
      REJECTED: "Bị từ chối",
      "Has Group": "Có nhóm",
      "No Group": "Không có nhóm",
      "Has Topic": "Có đề tài",
      "No Topic": "Không có đề tài",
      PASS: "Đạt",
      NOT_PASS: "Không đạt",
    };
    return statusMap[status] || status;
  } else if (keyField === "round") {
    const roundMap: { [key: string]: string } = {
      "Review 1": "Xét duyệt 1",
      "Review 2": "Xét duyệt 2",
      "Review 3": "Xét duyệt 3",
      "Defense 1": "Bảo vệ 1",
      "Defense 2": "Bảo vệ 2",
    };
    return roundMap[status] || `Vòng ${status}`;
  } else {
    const typeMap: { [key: string]: string } = {
      "Auto Created": "Nhóm tạo tự động",
      "Manually Created": "Tạo tạo thủ công",
    };
    return typeMap[status] || status;
  }
};

const getBarColorByStatus = (status: string): string => {
  switch (status) {
    case "Qualified":
    case "ACTIVE":
    case "APPROVED":
    case "Has Group":
    case "Has Topic":
    case "PASS":
    case "Auto Created":
      return "#4CAF50";
    case "PENDING":
      return "#FF9800";
    default:
      return "#F44336";
  }
};

const getBadgeStyles = (status: string, keyField: "status" | "round" | "type"): string => {
  if (keyField === "status") {
    if (["Qualified", "ACTIVE", "APPROVED", "Has Group", "Has Topic", "PASS"].includes(status)) {
      return "bg-green-100 text-green-700 border-green-500";
    }
    if (status === "PENDING") {
      return "bg-yellow-100 text-yellow-700 border-yellow-500";
    }
    return "bg-red-100 text-red-700 border-red-500";
  } else if (keyField === "round") {
    if (status.includes("Review")) {
      return "bg-blue-100 text-blue-700 border-blue-500";
    }
    return "bg-purple-100 text-purple-700 border-purple-500";
  } else {
    if (status === "Auto Created") {
      return "bg-green-100 text-green-700 border-green-500";
    }
    return "bg-gray-100 text-gray-700 border-gray-500";
  }
};

const StatisticsOverview: React.FC<StatisticsOverviewProps> = ({ semesterId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    studentQualification,
    groupStatus,
    topicStatus,
    reviewRounds,
    defenseRounds,
    studentGroupStatus,
    groupTopicStatus,
    defenseResultSummary,
    defenseResultByRound,
    groupCreationType,
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
      dispatch(fetchDefenseResultSummary(semesterId));
      dispatch(fetchDefenseResultByRound(semesterId));
      dispatch(fetchGroupCreationType(semesterId));
    }
  }, [dispatch, semesterId]);

  const renderBarChart = (data: StatItem[], keyField: "status" | "round" | "type") => {
    if (!Array.isArray(data)) {
      return <p className="text-gray-500">Dữ liệu không hợp lệ</p>;
    }

    const enhancedData = data.map((item) => ({
      ...item,
      fill: getBarColorByStatus(item[keyField] || ""),
    }));

    return (
      <BarChart width={300} height={200} data={enhancedData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 Cookies 3" />
        <XAxis
          dataKey={keyField}
          tickFormatter={(value) => translateStatus(value, keyField)}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip
          formatter={(value: number, name: string) => [value, translateStatus(name, keyField)]}
        />
        <Bar dataKey="total">
          {enhancedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    );
  };

  const renderLineChart = (data: StatItem[], keyField: "status" | "round") => {
    if (!Array.isArray(data)) {
      return <p className="text-gray-500">Dữ liệu không hợp lệ</p>;
    }

    return (
      <LineChart width={300} height={200} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 Cookies 3" />
        <XAxis
          dataKey={keyField}
          tickFormatter={(value) => translateStatus(value, keyField)}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip
          formatter={(value: number, name: string) => [value, translateStatus(name, keyField)]}
        />
        <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    );
  };

  const renderDefenseResultByRoundChart = (data: DefenseResultByRoundItem[]) => {
    if (!Array.isArray(data)) {
      return <p className="text-gray-500">Dữ liệu không hợp lệ</p>;
    }

    return (
      <BarChart width={300} height={200} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 Cookies 3" />
        <XAxis dataKey="round" tickFormatter={(value) => `Vòng ${value}`} tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="PASS" stackId="a" fill="#4CAF50" />
        <Bar dataKey="NOT_PASS" stackId="a" fill="#F44336" />
      </BarChart>
    );
  };

  const renderStatSection = (
    title: string,
    data: StatItem[] | DefenseResultByRoundItem[],
    total: number | undefined,
    loading: boolean,
    error: string | null,
    keyField: "status" | "round" | "type",
    chartType: "bar" | "line" | "stackedBar"
  ) => {
    // Xử lý dữ liệu dạng { total, data }
    const chartData = Array.isArray(data) ? data : (data as any)?.data || [];

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        <Card className="shadow-lg border border-gray-200 rounded-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardDescription className="text-sm text-gray-500">
              {total !== undefined ? `Tổng: ${total}` : "Tổng quan thống kê"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            <div className="flex-1">
              {loading ? (
                <p className="text-gray-500">Đang tải...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : !chartData || chartData.length === 0 ? (
                <p className="text-gray-500">Không có dữ liệu</p>
              ) : chartType === "bar" ? (
                renderBarChart(chartData as StatItem[], keyField)
              ) : chartType === "line" ? (
                renderLineChart(chartData as StatItem[], keyField as "status" | "round")
              ) : (
                renderDefenseResultByRoundChart(chartData as DefenseResultByRoundItem[])
              )}
            </div>
            <div className="flex-1">
              {loading ? (
                <p className="text-gray-500">Đang tải...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : !chartData || chartData.length === 0 ? (
                <p className="text-gray-500">Không có dữ liệu</p>
              ) : keyField === "round" && chartType === "stackedBar" ? (
                <div className="space-y-3">
                  {(chartData as DefenseResultByRoundItem[]).map((item, index) => (
                    <div key={index} className="flex flex-col py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-medium text-gray-700">Vòng {item.round}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Đạt:</span>
                        <Badge variant="outline" className={`text-base font-semibold px-3 py-1 border ${getBadgeStyles("PASS", "status")}`}>
                          {item.PASS} ({item.PASS_percentage}%)
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Không đạt:</span>
                        <Badge variant="outline" className={`text-base font-semibold px-3 py-1 border ${getBadgeStyles("NOT_PASS", "status")}`}>
                          {item.NOT_PASS} ({item.NOT_PASS_percentage}%)
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {(chartData as StatItem[]).map((item, index) => {
                    const displayKey = item[keyField] || "";
                    const translatedKey = translateStatus(displayKey, keyField);
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-base font-medium text-gray-700">{translatedKey}</span>
                        <Badge
                          variant="outline"
                          className={`text-base font-semibold px-3 py-1 border ${getBadgeStyles(displayKey, keyField)}`}
                        >
                          {item.total}
                          {item.percentage !== undefined ? ` (${item.percentage}%)` : ""}
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
    <div className="rounded-lg mt-6">
      {renderStatSection(
        "Sinh viên đủ điều kiện và không đủ điều kiện làm đồ án tốt nghiệp",
        studentQualification.data,
        studentQualification.total,
        studentQualification.loading,
        studentQualification.error,
        "status",
        "bar"
      )}
      {renderStatSection(
        "Trạng thái hoạt động của nhóm",
        groupStatus.data,
        groupStatus.total,
        groupStatus.loading,
        groupStatus.error,
        "status",
        "bar"
      )}
      {renderStatSection(
        "Trạng thái đề tài được đăng ký của giảng viên",
        topicStatus.data,
        undefined,
        topicStatus.loading,
        topicStatus.error,
        "status",
        "bar"
      )}
      {renderStatSection(
        "Số nhóm hội đồng đã kiểm tra trong vòng review",
        reviewRounds.data,
        reviewRounds.total,
        reviewRounds.loading,
        reviewRounds.error,
        "round",
        "line"
      )}
      {renderStatSection(
        "Số nhóm hội đồng đã kiểm tra trong vòng bảo vệ",
        defenseRounds.data,
        defenseRounds.total,
        defenseRounds.loading,
        defenseRounds.error,
        "round",
        "line"
      )}
      {renderStatSection(
        "Sinh viên có/không nhóm làm đồ án tốt nghiệp",
        studentGroupStatus.data,
        studentGroupStatus.total,
        studentGroupStatus.loading,
        studentGroupStatus.error,
        "status",
        "bar"
      )}
      {renderStatSection(
        "Nhóm có/không đề tài",
        groupTopicStatus.data,
        undefined,
        groupTopicStatus.loading,
        groupTopicStatus.error,
        "status",
        "bar"
      )}
      {renderStatSection(
        "Tổng hợp kết quả bảo vệ của từng sinh viên",
        defenseResultSummary.data,
        undefined,
        defenseResultSummary.loading,
        defenseResultSummary.error,
        "status",
        "bar"
      )}
      {renderStatSection(
        "Kết quả bảo vệ theo vòng của sinh viên",
        defenseResultByRound.data,
        undefined,
        defenseResultByRound.loading,
        defenseResultByRound.error,
        "round",
        "stackedBar"
      )}
      {renderStatSection(
        "Loại hình tạo nhóm làm đồ án tốt nghiệp",
        groupCreationType.data?.breakdown || [],
        groupCreationType.data?.totalGroups,
        groupCreationType.loading,
        groupCreationType.error,
        "type",
        "bar"
      )}
    </div>
  );
};

export default StatisticsOverview;