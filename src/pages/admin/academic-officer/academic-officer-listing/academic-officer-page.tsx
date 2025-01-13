import React from 'react'

const AcademicOfficerPage = () => {
  const data = productData as Product[];
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách hội đồng đánh giá " />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default AcademicOfficerPage