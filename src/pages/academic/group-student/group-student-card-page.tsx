import Header from "@/components/header";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { fetchStudentsWithoutGroup } from "@/lib/api/redux/studentWithoutGroupSlice";
import { PaginationDashboardPage } from "@/pages/admin/pagination";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ManualCreateGroupDialog from "./create-group-button";
import { columns } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";
import { ExportExcelGroupStudent } from "./export-excel-group-student";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateRandomGroup } from "./create-random-group";

export const GroupStudentCardPage = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    groups,
    loading: groupsLoading,
    error: groupsError,
  } = useAppSelector((state) => state.groups);
  const {
    students,
    loading: studentsLoading,
    error: studentsError,
  } = useAppSelector((state) => state.studentsWithoutGroup);

  const [currentPage, setCurrentPage] = useState(1);
  const [isAutoCreatedFilter, setIsAutoCreatedFilter] = useState<string>("all");
  const activeGroups = groups.filter((group) => !group.isDeleted);
  const itemsPerPage = 10;

  // Lấy danh sách nhóm và sinh viên chưa có nhóm
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
      dispatch(fetchStudentsWithoutGroup(semesterId));
    }
  }, [dispatch, semesterId]);

  // Lọc nhóm theo isAutoCreated
  const filteredGroups = activeGroups.filter((group) => {
    if (isAutoCreatedFilter === "all") return true;
    return group.isAutoCreated === (isAutoCreatedFilter === "true");
  });

  // Tính tổng số trang dựa trên filteredGroups
  const totalPages =
    filteredGroups.length > 0 ? Math.ceil(filteredGroups.length / itemsPerPage) : 1;

  // Lấy các nhóm hiện tại cho trang hiện tại
  const currentGroups = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hàm xử lý khi nhấn nút Quay lại
  const handleBack = () => {
    navigate("/academic/group-student");
  };

  if (groupsLoading || studentsLoading) return <p>Đang tải dữ liệu...</p>;
  if (groupsError) return <p className="text-red-500">Lỗi: {groupsError}</p>;
  if (studentsError)
    return (
      <p className="text-red-500">
        Lỗi khi tải danh sách sinh viên: {studentsError}
      </p>
    );

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách nhóm sinh viên"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Button onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
          </div>
          <div className="flex gap-x-4 items-center">
            {/* Thêm bộ lọc isAutoCreated */}
            <Select
              onValueChange={setIsAutoCreatedFilter}
              value={isAutoCreatedFilter}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Lọc theo cách tạo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lọc nhóm</SelectLabel>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="true">Tự động tạo</SelectItem>
                  <SelectItem value="false">Thủ công tạo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <div className="flex justify-end mb-4 gap-x-4"> */}
              {semesterId && <CreateRandomGroup semesterId={semesterId} />}
            {/* </div> */}
            <ExportExcelGroupStudent />
            <ManualCreateGroupDialog
              semesterId={semesterId!}
              students={students}
            />
          </div>
        </div>

        <DataTable columns={columns} data={currentGroups} />
        <div className="flex justify-end mt-6">
          <PaginationDashboardPage
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => {
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};