import Header from "@/components/header";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { fetchStudentsWithoutGroup } from "@/lib/api/redux/studentWithoutGroupSlice";
import { PaginationDashboardPage } from "@/pages/admin/pagination";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ManualCreateGroupDialog from "./create-group-button";
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
import ToolPanel from "./data-table/tool-panel";
import { getColumns } from "./data-table/columns";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    setCurrentPage(1); // luôn quay về trang 1 khi search
  }, [searchTerm]);

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
      dispatch(fetchStudentsWithoutGroup(semesterId));
    }
  }, [dispatch, semesterId]);

  const activeGroups = groups.filter((group) => !group.isDeleted);

  const keyword = searchTerm.trim().toLowerCase();

  // Lọc theo searchTerm + isAutoCreated
  const filteredGroups = activeGroups.filter((group) => {
    const mentorEmails = group.mentors?.map((m) => m.email || "").join(" ");
    const statusText =
      group.status === "ACTIVE"
        ? "Đang Hoạt Động"
        : group.status === "PENDING"
        ? "Chờ Xử Lý"
        : "Ngừng Hoạt Động";

    const matchesSearch =
      !keyword ||
      group.groupCode?.toLowerCase().includes(keyword) ||
      mentorEmails?.toLowerCase().includes(keyword) ||
      statusText.toLowerCase().includes(keyword);

    const matchesFilter =
      isAutoCreatedFilter === "all" ||
      group.isAutoCreated === (isAutoCreatedFilter === "true");

    return matchesSearch && matchesFilter;
  });

  const itemsPerPage = 10;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredGroups.length / itemsPerPage)
  );
  const offset = (currentPage - 1) * itemsPerPage;

  const currentGroups = filteredGroups.slice(offset, offset + itemsPerPage);
  const columns = getColumns(offset, searchTerm);

  const handleBack = () => navigate("/academic/group-student");

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
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <Button onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <ToolPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          <div className="flex gap-x-4 items-center">
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
            {semesterId && <CreateRandomGroup semesterId={semesterId} />}
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
