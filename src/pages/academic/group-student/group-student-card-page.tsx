import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupsBySemester, createGroupForAcademic } from "@/lib/api/redux/groupSlice";
import { fetchStudentsWithoutGroup } from "@/lib/api/redux/studentWithoutGroupSlice";
import Header from "@/components/header";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import { ExportExcelGroupStudent } from "./export-excel-group-student";
import { PaginationDashboardPage } from "@/pages/admin/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const GroupStudentCardPage = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useAppDispatch();
  const { groups, loading: groupsLoading, error: groupsError } = useAppSelector((state) => state.groups);
  const { students, loading: studentsLoading, error: studentsError } = useAppSelector(
    (state) => state.studentsWithoutGroup
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLeaderEmail, setSelectedLeaderEmail] = useState<string>("");

  const itemsPerPage = 10;

  // Lọc các nhóm có isAutoCreated === false
  const filteredGroups = groups.filter((group) => group.isAutoCreated === false);
  const totalPages = filteredGroups.length > 0 ? Math.ceil(filteredGroups.length / itemsPerPage) : 1;

  // Lấy danh sách nhóm và sinh viên chưa có nhóm
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
      dispatch(fetchStudentsWithoutGroup(semesterId));
    }
  }, [dispatch, semesterId]);

  // Lấy các nhóm hiện tại sau khi lọc
  const currentGroups = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Xử lý tạo nhóm
  const handleCreateGroup = async () => {
    if (!selectedLeaderEmail || !semesterId) {
      alert("Vui lòng chọn trưởng nhóm và kiểm tra semesterId!");
      return;
    }

    try {
      const result = await dispatch(
        createGroupForAcademic({ leaderEmail: selectedLeaderEmail, semesterId })
      ).unwrap();
      console.log("Nhóm đã được tạo:", result);
      setIsDialogOpen(false); // Đóng dialog sau khi tạo thành công
      setSelectedLeaderEmail(""); // Reset lựa chọn
      dispatch(fetchGroupsBySemester(semesterId)); // Làm mới danh sách nhóm
    } catch (error) {
      console.error("Lỗi khi tạo nhóm:", error);
      alert("Có lỗi xảy ra khi tạo nhóm!");
    }
  };

  if (groupsLoading || studentsLoading) return <p>Đang tải dữ liệu...</p>;
  if (groupsError) return <p className="text-red-500">Lỗi: {groupsError}</p>;
  if (studentsError) return <p className="text-red-500">Lỗi khi tải danh sách sinh viên: {studentsError}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách nhóm sinh viên" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4 gap-x-4">
          <ExportExcelGroupStudent />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Tạo Nhóm</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo nhóm mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Select
                  onValueChange={(value) => setSelectedLeaderEmail(value)}
                  value={selectedLeaderEmail}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trưởng nhóm" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.studentCode} value={student.email}>
                        {student.email} ({student.studentCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleCreateGroup} disabled={!selectedLeaderEmail}>
                  Xác nhận tạo nhóm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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