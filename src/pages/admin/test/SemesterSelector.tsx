import React, { useState } from "react";
import { useNavigate } from "react-router";

export type Semester = {
  id: string;
  code: string;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  status: "Active" | "Inactive";
  created_at: string;
  year: string;
};

const semesters: Semester[] = [
  {
    id: "1",
    year: "2025",
    code: "Spring2025",
    start_date: "2025-01-01",
    end_date: "2025-05-31",
    registration_deadline: "2024-12-15",
    status: "Active",
    created_at: "2024-11-01",
  },
  {
    id: "2",
    year: "2025",
    code: "Summer2025",
    start_date: "2025-06-01",
    end_date: "2025-08-31",
    registration_deadline: "2025-05-01",
    status: "Inactive",
    created_at: "2024-12-01",
  },
  {
    id: "3",
    year: "2025",
    code: "Fall2025",
    start_date: "2025-09-01",
    end_date: "2025-12-31",
    registration_deadline: "2025-08-15",
    status: "Active",
    created_at: "2025-01-01",
  },
  {
    id: "4",
    year: "2024",
    code: "Spring2024",
    start_date: "2024-01-01",
    end_date: "2024-05-31",
    registration_deadline: "2023-12-15",
    status: "Active",
    created_at: "2023-11-01",
  },
  {
    id: "5",
    year: "2024",
    code: "Summer2024",
    start_date: "2024-06-01",
    end_date: "2024-08-31",
    registration_deadline: "2024-05-01",
    status: "Inactive",
    created_at: "2023-12-01",
  },
  {
    id: "6",
    year: "2024",
    code: "Fall2024",
    start_date: "2024-09-01",
    end_date: "2024-12-31",
    registration_deadline: "2024-08-15",
    status: "Active",
    created_at: "2024-01-01",
  },
];

const cardData: { [key: string]: string[] } = {
  Spring2025: ["Card Test 1", "Card Test 2", "Card Test 3"],
  Spring2024: ["Card Test 4", "Card Test 5", "Card Test 6"],
};

export default function SemesterSelector() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const navigate = useNavigate();

  const years = Array.from(new Set(semesters.map((semester) => semester.year)));

  const semestersForSelectedYear = semesters.filter(
    (semester) => semester.year === selectedYear
  );

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Semester Selector</h1>

      {/* Select Year */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Year</label>
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setSelectedSemester(""); // Reset semester selection
          }}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Select Semester */}
      {selectedYear && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Semester</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Semester</option>
            {semestersForSelectedYear.map((semester) => (
              <option key={semester.id} value={semester.code}>
                {semester.code}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Cards */}
      {selectedSemester && (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {cardData[selectedSemester]?.map((card, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/columns")}
            >
              {card}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
