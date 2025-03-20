import React from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardBvProps = {
  data: {
    id: string;
    code: string;
    year: string;
    start_date_bv1: string;
    end_date_bv1: string;
    start_date_bv2: string;
    end_date_bv2: string;
  }[];
};

export const CardBv: React.FC<CardBvProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string, bvType: string) => {
    navigate(`/council-member/${id}?bvType=${bvType}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {data.map((bv) => (
        <React.Fragment key={bv.id}>
          {/* Card Bảo vệ lần 1 */}
          <Card
            className="cursor-pointer hover:shadow-lg"
            onClick={() => handleCardClick(bv.id, "BV1")}
          >
            <CardHeader>
              <CardTitle>Bảo vệ lần 1 - {bv.code}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Năm học: {bv.year}</p>
              <p className="text-sm text-gray-500">
                Ngày bắt đầu:{" "}
                {bv.start_date_bv1
                  ? new Date(bv.start_date_bv1).toLocaleDateString()
                  : "Chưa có dữ liệu"}
              </p>
              <p className="text-sm text-gray-500">
                Ngày kết thúc:{" "}
                {bv.end_date_bv1
                  ? new Date(bv.end_date_bv1).toLocaleDateString()
                  : "Chưa có dữ liệu"}
              </p>
            </CardContent>
          </Card>

          {/* Card Bảo vệ lần 2 */}
          <Card
            className="cursor-pointer hover:shadow-lg"
            onClick={() => handleCardClick(bv.id, "BV2")}
          >
            <CardHeader>
              <CardTitle>Bảo vệ lần 2 - {bv.code}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Năm học: {bv.year}</p>
              <p className="text-sm text-gray-500">
                Ngày bắt đầu:{" "}
                {bv.start_date_bv2
                  ? new Date(bv.start_date_bv2).toLocaleDateString()
                  : "Chưa có dữ liệu"}
              </p>
              <p className="text-sm text-gray-500">
                Ngày kết thúc:{" "}
                {bv.end_date_bv2
                  ? new Date(bv.end_date_bv2).toLocaleDateString()
                  : "Chưa có dữ liệu"}
              </p>
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
};
