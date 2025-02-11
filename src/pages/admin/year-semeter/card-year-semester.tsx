import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const sampleData = [
  { id: "1", year: "2025", semester: "Học kỳ 1" },
  { id: "2", year: "2026", semester: "Học kỳ 2" },
  { id: "3", year: "2027", semester: "Học kỳ 1" },
];

export const CardYearSemester: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {sampleData.map((item) => (
        <Card key={item.id} className="w-full p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">
              Năm học {item.year}
            </CardTitle>
          </CardHeader>
      
        </Card>
      ))}
    </div>
  );
};
