import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchMeetings } from "@/lib/api/redux/meetingSlice";
import { fetchGroupDetail } from "@/lib/api/redux/groupDetailSlice";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Edit } from "lucide-react";
import Header from "@/components/header";
import { CreateMeeting } from "./CreateMeeting";
import { UpdateMeeting } from "./UpdateMeeting";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function MeetingPage() {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { meetings, loading: meetingsLoading, error: meetingsError } = useSelector(
    (state: RootState) => state.meetings
  );
  const { groups, loading: groupsLoading } = useSelector((state: RootState) => state.groups);
  const { loading: groupLoading } = useSelector((state: RootState) => state.groupDetail);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<null | any>(null);
  const [groupCodes, setGroupCodes] = useState<{ [key: string]: string }>({});
  const [selectedGroupId, setSelectedGroupId] = useState<string>("all");

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
      dispatch(fetchMeetings(semesterId));
    }
  }, [semesterId, dispatch]);

  // Fetch group details for meetings whenever the meetings array changes
  useEffect(() => {
    if (semesterId && meetings.length > 0) {
      meetings.forEach((meeting: any) => {
        // Only fetch if groupCode for this groupId hasn't been fetched yet
        if (!groupCodes[meeting.groupId]) {
          dispatch(fetchGroupDetail({ groupId: meeting.groupId, semesterId })).then(
            (groupResult) => {
              if (fetchGroupDetail.fulfilled.match(groupResult)) {
                setGroupCodes((prev) => ({
                  ...prev,
                  [meeting.groupId]: groupResult.payload.groupCode,
                }));
              }
            }
          );
        }
      });
    }
  }, [meetings, semesterId, dispatch, groupCodes]);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleOpenUpdateModal = (meeting: any) => {
    setSelectedMeeting(meeting);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedMeeting(null);
  };

  const handleGroupFilterChange = (value: string) => {
    setSelectedGroupId(value);
  };

  const sortedAndFilteredMeetings = [...meetings]
    .sort((a, b) => new Date(a.meetingTime).getTime() - new Date(b.meetingTime).getTime())
    .filter((meeting) => selectedGroupId === "all" || meeting.groupId === selectedGroupId);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header
        title={`Tổng quan`}
        href="/meeting"
        currentPage="Lịch họp"
      />
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Danh Sách Buổi Họp
          </h2>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select onValueChange={handleGroupFilterChange} value={selectedGroupId}>
              <SelectTrigger className="w-full sm:w-64 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Lọc theo nhóm" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lọc theo nhóm</SelectLabel>
                  <SelectItem value="all">Tất cả nhóm</SelectItem>
                  {groupsLoading ? (
                    <SelectItem value="loading" disabled>
                      Đang tải...
                    </SelectItem>
                  ) : groups.length === 0 ? (
                    <SelectItem value="no-groups" disabled>
                      Không có nhóm nào
                    </SelectItem>
                  ) : (
                    groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.groupCode}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              onClick={handleOpenCreateModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm"
            >
              Tạo Buổi Họp
            </Button>
          </div>
        </div>

        {meetingsLoading ? (
          <div className="space-y-6">
            <div className="w-full h-40 bg-gray-200 rounded-xl animate-pulse" />
            <div className="w-full h-40 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        ) : meetingsError ? (
          <p className="text-red-600 text-center text-xl font-medium bg-red-50 p-4 rounded-lg">
            Lỗi: {meetingsError}
          </p>
        ) : sortedAndFilteredMeetings.length === 0 ? (
          <p className="text-gray-600 text-center text-xl font-medium bg-white p-6 rounded-lg shadow">
            Không có buổi họp nào cho nhóm đã chọn.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAndFilteredMeetings.map((meeting) => (
              <Card
                key={meeting.id}
                className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl border border-gray-200 overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-blue-50 to-gray-50 border-b border-gray-200 p-4">
                  <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-between">
                    <span className="truncate">{meeting.agenda}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-sm bg-blue-100 text-blue-800 font-medium"
                      >
                        {new Date(meeting.meetingTime).toLocaleDateString("vi-VN")}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenUpdateModal(meeting)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start text-gray-700">
                    <Calendar className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Thời gian:</span>
                      <p className="text-sm">
                        {new Date(meeting.meetingTime).toLocaleString("vi-VN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Địa điểm:</span>
                      <p className="text-sm">{meeting.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <span className="font-medium w-20">Nhóm:</span>
                    <p className="text-sm">
                      {groupCodes[meeting.groupId] || (groupLoading ? "Đang tải..." : "N/A")}
                    </p>
                  </div>
                  {meeting.url ? (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 rounded-lg transition-colors"
                    >
                      <a href={meeting.url} target="_blank" rel="noopener noreferrer">
                        Tham gia phòng
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full border-gray-400 text-gray-600 font-semibold py-2 rounded-lg cursor-not-allowed"
                      onClick={() => toast.error("Không có phòng họp online")}
                    >
                      Tham gia phòng
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isCreateModalOpen && semesterId && (
          <CreateMeeting semesterId={semesterId} onClose={handleCloseCreateModal} />
        )}
        {isUpdateModalOpen && semesterId && selectedMeeting && (
          <UpdateMeeting
            semesterId={semesterId}
            meeting={selectedMeeting}
            onClose={handleCloseUpdateModal}
          />
        )}
      </div>
    </div>
  );
}