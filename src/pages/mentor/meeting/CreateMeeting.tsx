import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createMeeting, Meeting } from "@/lib/api/redux/meetingSlice";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react"; // Icon đóng

type CreateMeetingProps = {
  semesterId: string;
  onClose: () => void;
};

export const CreateMeeting: React.FC<CreateMeetingProps> = ({ semesterId, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, loading: groupsLoading } = useSelector((state: RootState) => state.groups);

  const [newMeeting, setNewMeeting] = useState<Partial<Meeting>>({
    groupId: "",
    meetingTime: "",
    location: "",
    agenda: "",
    url: "",
  });

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
    }
  }, [semesterId, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "meetingTime" && value) {
      setNewMeeting({ ...newMeeting, [name]: `${value}:00Z` });
    } else {
      setNewMeeting({ ...newMeeting, [name]: value });
    }
  };

  const handleGroupChange = (value: string) => {
    setNewMeeting({ ...newMeeting, groupId: value });
  };

  const handleCreateMeeting = async () => {
    if (semesterId && newMeeting.groupId) {
      await dispatch(createMeeting({ semesterId, meetingData: newMeeting as Meeting }));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tạo Buổi Họp Mới</h2>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="groupId" className="text-sm font-medium text-gray-700">
              Nhóm
            </Label>
            <Select onValueChange={handleGroupChange} value={newMeeting.groupId}>
              <SelectTrigger className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Chọn nhóm" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Danh sách nhóm</SelectLabel>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingTime" className="text-sm font-medium text-gray-700">
              Thời gian họp
            </Label>
            <Input
              id="meetingTime"
              name="meetingTime"
              type="datetime-local"
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={newMeeting.meetingTime?.replace(":00Z", "") || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Địa điểm
            </Label>
            <Input
              id="location"
              name="location"
              value={newMeeting.location || ""}
              onChange={handleInputChange}
              placeholder="Nhập địa điểm (VD: NVH302)"
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agenda" className="text-sm font-medium text-gray-700">
              Chủ đề
            </Label>
            <Input
              id="agenda"
              name="agenda"
              value={newMeeting.agenda || ""}
              onChange={handleInputChange}
              placeholder="Nhập chủ đề (VD: Thảo luận tiến độ dự án)"
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium text-gray-700">
              URL
            </Label>
            <Input
              id="url"
              name="url"
              value={newMeeting.url || ""}
              onChange={handleInputChange}
              placeholder="Nhập URL (VD: https://meet.google.com/abc-def-ghi)"
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-lg"
            >
              Hủy
            </Button>
            <Button
              onClick={handleCreateMeeting}
              disabled={!newMeeting.groupId}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
            >
              Tạo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};