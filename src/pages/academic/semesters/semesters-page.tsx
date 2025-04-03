import Header from "@/components/header";
import { SelectSemester } from "./select-semester";
import { CreateSemesters } from "./columns/create-semesters";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export function SemestersPage() {
  const location = useLocation();

  const [selectedYear, setSelectedYear] = useState<string>(location.state?.yearId || "");
  const [selectedSemester, setSelectedSemester] = useState<string>(location.state?.semesterId || "");

  useEffect(() => {
    if (location.state?.yearId) setSelectedYear(location.state.yearId);
    if (location.state?.semesterId) setSelectedSemester(location.state.semesterId);
  }, [location.state]);

  return (
    <div className="flex flex-col h-screen">
      <Header title="Dashboard" href="/" currentPage="Quản lý năm học và học kỳ" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div>
            <CreateSemesters
              onCreated={(yearId) => {
                setSelectedYear(yearId);
                // setSelectedSemester(semesterId); // This will be used if SelectSemester supports semester selection
              }}
            />
          </div>
          <div className="w-full">
            <SelectSemester
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
            />
          </div>
        </div>
      </div>
    </div>
  );
}