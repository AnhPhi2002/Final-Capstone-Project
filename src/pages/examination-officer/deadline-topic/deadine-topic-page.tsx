import Header from "@/components/header";
import { SelectSemester } from "./select-semester";
import { CreateSubmissionRound } from "./columns/create-deadline-topic";
import { useState, useEffect } from "react";
import { useLocation } from "react-router"; // ✅ THÊM

export const DeadineTopicPage = () => {
  const location = useLocation(); // ✅ ĐỌC LẠI STATE

  // ✅ Nếu có navigate kèm state thì ưu tiên dùng
  const [selectedYear, setSelectedYear] = useState<string>(location.state?.yearId || "");
  const [selectedSemester, setSelectedSemester] = useState<string>(location.state?.semesterId || "");

  // ✅ Nếu bạn muốn đồng bộ lại khi state thay đổi (nếu trang chưa unmount), dùng useEffect:
  useEffect(() => {
    if (location.state?.yearId) setSelectedYear(location.state.yearId);
    if (location.state?.semesterId) setSelectedSemester(location.state.semesterId);
  }, [location.state]);

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Thời gian đăng ký và duyệt đề tài"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div>
            <CreateSubmissionRound
              onCreated={(yearId, semesterId) => {
                setSelectedYear(yearId);
                setSelectedSemester(semesterId);
              }}
            />
          </div>
          <div className="w-full">
            <SelectSemester
              selectedYear={selectedYear}
              selectedSemester={selectedSemester}
              onYearChange={setSelectedYear}
              onSemesterChange={setSelectedSemester}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
