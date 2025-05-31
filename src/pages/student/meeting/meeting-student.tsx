import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { fetchMeetingsByGroup } from "@/lib/api/redux/meetingSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";
import Header from "@/components/header";

export const MeetingStudentDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Lấy user từ localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const semesterId = user?.semesterId;

  const groupLoading = useSelector((state: RootState) => state.groups.loading);
  const groupError = useSelector((state: RootState) => state.groups.error);

  const meetings = useSelector((state: RootState) => state.meetings.meetings);
  const meetingLoading = useSelector((state: RootState) => state.meetings.loading);
  const meetingError = useSelector((state: RootState) => state.meetings.error);

  useEffect(() => {
    console.log("useEffect started, semesterId:", semesterId);
    if (!semesterId) return;

    const fetchData = async () => {
      const groupResult = await dispatch(fetchGroupsBySemester(semesterId));
      if (fetchGroupsBySemester.fulfilled.match(groupResult) && groupResult.payload.length > 0) {
        const groupId = groupResult.payload[0].id;
        await dispatch(fetchMeetingsByGroup({ groupId, semesterId }));
      }
    };

    fetchData();
  }, [semesterId, dispatch]);

  const sortedMeetings = [...meetings].sort(
    (a, b) => new Date(a.meetingTime).getTime() - new Date(b.meetingTime).getTime()
  );

  const formatMeetingTime = (time: string) => {
    const date = new Date(time);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          Danh Sách Buổi Họp
        </h1>

        {groupLoading || meetingLoading ? (
          <div className="space-y-6">
            <Skeleton className="w-full h-40 rounded-xl" />
            <Skeleton className="w-full h-40 rounded-xl" />
          </div>
        ) : groupError ? (
          <p className="text-red-600 text-center text-xl font-medium bg-red-50 p-4 rounded-lg">
            Lỗi khi lấy danh sách nhóm: {groupError}
          </p>
        ) : meetingError ? (
          <p className="text-red-600 text-center text-xl font-medium bg-red-50 p-4 rounded-lg">
            Lỗi khi lấy danh sách buổi họp: {meetingError}
          </p>
        ) : sortedMeetings.length === 0 ? (
          <p className="text-gray-600 text-center text-xl font-medium bg-white p-6 rounded-lg shadow">
            Không có buổi họp nào.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMeetings.map((meeting) => (
              <Card
                key={meeting.id}
                className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl border border-gray-200 overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-blue-50 to-gray-50 border-b border-gray-200 p-4">
                  <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-between">
                    <span className="truncate">{meeting.agenda}</span>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-blue-100 text-blue-800 font-medium"
                    >
                      {formatMeetingTime(meeting.meetingTime).split(" ")[0]}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start text-gray-700">
                    <Calendar className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Thời gian:</span>
                      <p className="text-sm">{formatMeetingTime(meeting.meetingTime)}</p>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <User className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Giáo viên:</span>
                      <p className="text-sm">{meeting.mentor.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Địa điểm:</span>
                      <p className="text-sm">{meeting.location}</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    <a href={meeting.url} target="_blank" rel="noopener noreferrer">
                      Tham gia phòng
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};