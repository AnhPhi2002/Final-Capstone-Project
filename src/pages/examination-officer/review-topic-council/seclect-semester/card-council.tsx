import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Council } from "@/lib/api/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PaginationDashboardPage } from "@/pages/admin/pagination";
import { Badge } from "@/components/ui/badge";

type CardCouncilProps = {
  councils: Council[];
};

export const CardCouncil: React.FC<CardCouncilProps> = ({ councils }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số lượng items trên mỗi trang

  const totalPages = Math.ceil(councils.length / itemsPerPage);

  const handleCardClick = (councilId: string) => {
    navigate(`/review-topic-council-detail/${councilId}`);
    // navigate(`/review-topic-council-detail`);
  };

  const paginatedData = councils.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {paginatedData.length === 0 ? (
        <p className="text-gray-500 text-center">Không có hội đồng nào</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((council) => (
              <Card
                key={council.id}
                className="w-full p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
                onClick={() => handleCardClick(council.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {council.name}
                  </CardTitle>
                  <CardDescription>
                    Ngày tạo: {new Date(council.createdDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span>🔹 Vòng {council.round}</span>
                    <Badge
                      className={
                        council.status === "ACTIVE"
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }
                    >
                      {council.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <PaginationDashboardPage
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};
