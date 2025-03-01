import React from "react";
import Header from "@/components/header";

import { SelectSemester } from "./select-semester";
import { CreateBvListing } from "./create-bv-listing";


const CouncilMemberPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan" 
        href="/"
        currentPage="Danh sách hội đồng đánh giá"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div>
            <CreateBvListing />
          </div>
          <div className="w-full">
            <SelectSemester />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouncilMemberPage;
