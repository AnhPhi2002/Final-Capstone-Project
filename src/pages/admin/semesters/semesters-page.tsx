import Header from "@/components/header";
import { SelectSemester } from "./select-semester";

export function SemestersPage() {

  return (
    <div className="flex flex-col h-screen">
      <Header title="Semesters" href="/" currentPage="Semester Management" />
      <div className="p-5 flex-1 overflow-auto">
       <SelectSemester />
      </div>
    </div>
  );
}
