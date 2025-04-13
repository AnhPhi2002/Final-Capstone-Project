import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchMentorReports} from "@/lib/api/redux/mentorProgressReportSlice";
import Header from "@/components/header";
import { MentorProgressReportList } from "../MentorProgressReportList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateReportPeriodForm from "../CreateReportPeriodForm";

export const MentorProgressReportPage = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { groups, loading: groupsLoading } = useSelector((state: RootState) => state.groups);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  // Gọi lại danh sách khi đóng dialog sau khi tạo
  const handleCloseDialog = () => {
    if (semesterId) {
      dispatch(fetchMentorReports(semesterId));
    }
    setOpenCreateDialog(false);
  };

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
      dispatch(fetchMentorReports(semesterId)); // Gọi khi load page
    }
  }, [dispatch, semesterId]);

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Báo cáo tiến độ"
        href="/lecturer"
        currentPage="Danh sách báo cáo tiến độ"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4">
          <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <DialogTrigger asChild>
              <Button disabled={groupsLoading || !semesterId}>
                {groupsLoading ? "Đang tải nhóm..." : "Tạo lịch báo cáo"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Tạo lịch báo cáo</DialogTitle>
              </DialogHeader>
              <CreateReportPeriodForm
                semesterId={semesterId!}
                groups={groups}
                onCancel={handleCloseDialog} // <- Quan trọng
              />
            </DialogContent>
          </Dialog>
        </div>
        {semesterId && <MentorProgressReportList semesterId={semesterId} />}
      </div>
    </div>
  );
};
