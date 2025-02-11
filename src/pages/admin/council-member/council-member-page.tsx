import React from "react";
import Header from "@/components/header";

import { SelectSemester } from "./select-semester";

const CouncilMemberPage: React.FC = () => {

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách hội đồng đánh giá" />
      <div className="p-5 flex-1 overflow-auto">
        <SelectSemester />
     
      </div>
    </div>
  );
};

export default CouncilMemberPage;
