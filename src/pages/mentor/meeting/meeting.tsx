// MeetingPage.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchMeetings } from "@/lib/api/redux/meetingSlice";
import { fetchGroupDetail } from "@/lib/api/redux/groupDetailSlice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { CreateMeeting } from "./CreateMeeting";

export function MeetingPage() {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { meetings, loading: meetingsLoading, error: meetingsError } = useSelector(
    (state: RootState) => state.meetings
  );
  const { loading: groupLoading } = useSelector(
    (state: RootState) => state.groupDetail
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [groupCodes, setGroupCodes] = useState<{ [key: string]: string }>({}); // Lưu groupCode theo groupId

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchMeetings(semesterId)).then((result) => {
        if (fetchMeetings.fulfilled.match(result)) {
          const meetings = result.payload;
          // Gọi fetchGroupDetail cho từng groupId
          meetings.forEach((meeting: any) => {
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
          });
        }
      });
    }
  }, [semesterId, dispatch]);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  if (meetingsLoading) {
    return <div>Loading meetings...</div>;
  }

  if (meetingsError) {
    return <div>Error: {meetingsError}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        title={`Meetings for Semester ${semesterId || "Unknown"}`}
        href="/meeting"
        currentPage="Meetings"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="mb-6">
          <Button onClick={handleOpenCreateModal}>Create Meeting</Button>
        </div>

        <h2 className="text-2xl font-bold mb-4">Meeting List</h2>
        {meetings.length === 0 ? (
          <p>No meetings available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetings.map((meeting) => (
              <Card
                key={meeting.id}
                className="w-full p-4 shadow-md border border-gray-200 rounded-lg"
              >
                <CardHeader>
                  <CardTitle>{meeting.agenda}</CardTitle>
                  <CardDescription>
                  <p>
                      Group: {groupCodes[meeting.groupId] || (groupLoading ? "Loading..." : "N/A")}
                    </p>
                    <p>Location: {meeting.location}</p>
                    <p>Time: {new Date(meeting.meetingTime).toLocaleString()}</p>
                    <p>
                      URL:{" "}
                      <a
                        href={meeting.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 font-medium break-all"
                      >
                        {meeting.url}
                      </a>
                    </p>
                    {/* <p>Status: {meeting.status}</p> */}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {isCreateModalOpen && semesterId && (
          <CreateMeeting semesterId={semesterId} onClose={handleCloseCreateModal} />
        )}
      </div>
    </div>
  );
}