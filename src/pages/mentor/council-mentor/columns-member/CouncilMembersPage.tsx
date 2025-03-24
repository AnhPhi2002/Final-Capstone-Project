import React, { useEffect} from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetail } from "@/lib/api/redux/councilReviewSlice"; // Sửa thành councilReviewSlice
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { memberColumns } from "./columns";
import Header from "@/components/header";
// import { AddMemberReviewCouncil } from "./add-council-member";
// import { Button } from "@/components/ui/button";

export const CouncilReviewMembersPage: React.FC = () => {
  const { councilId, semesterId } = useParams<{ councilId?: string; semesterId?: string }>(); // Cho phép undefined
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector((state: RootState) => state.councilReview); // Sửa thành councilReviews nếu dùng key này trong store
  // const [openAddMember, setOpenAddMember] = useState(false);

  const refetchData = () => {
    if (councilId) {
      dispatch(fetchCouncilDetail(councilId));
    }
  };

  useEffect(() => {
    if (councilId) {
      refetchData();
    }
  }, [councilId, dispatch]);

  const table = useReactTable({
    data: councilDetail?.members || [],
    columns: memberColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Kiểm tra councilId và semesterId có hợp lệ không
  if (!councilId || !semesterId) {
    return <p className="text-center text-red-500">Council ID hoặc Semester ID không hợp lệ!</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title="Thành viên hội đồng" href="/review-topic-council" currentPage="Quản lý hội đồng" />
      <div className="p-6 flex-1 overflow-auto">
        {/* <div className="mb-4 flex justify-end">
          <Button
            className="bg-black text-white"
            onClick={() => setOpenAddMember(true)}
            disabled={loadingDetail}
          >
            Thêm thành viên
          </Button>
        </div> */}

        {/* Tích hợp AddMemberReviewCouncil */}
        {/* <AddMemberReviewCouncil
          open={openAddMember}
          setOpen={setOpenAddMember}
          councilId={councilId}
          semesterId={semesterId}
        /> */}

        {loadingDetail ? (
          <p className="text-center text-gray-500">Đang tải danh sách thành viên...</p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
};