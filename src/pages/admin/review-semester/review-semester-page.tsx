import Header from "@/components/header";

export const ReviewSemesterPage = () => {
  return (
    <div className="flex flex-col h-screen">
    <Header title="Semesters" href="/" currentPage="Quản lý review " />
    <div className="p-5 flex-1 overflow-auto">
      <div className="flex flex-col items-end gap-4">
        <div>
       {/* <CreateDeadlineTopic /> */}
        </div>
        <div className="w-full">
          {/* <SelectSemester /> */}
        </div>
      </div>
    </div>
  </div>
);
}