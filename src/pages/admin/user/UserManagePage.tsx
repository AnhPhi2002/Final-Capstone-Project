import Header from "@/components/header";
import { SelectSemester } from "./seclect-semester/select-semester";

const UserManagePage = () => {
  return (
    <div>
      <Header title="Tổng quan" href="/" currentPage="Dashboard" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div className="w-full mt-[52px]">
            <SelectSemester />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagePage;