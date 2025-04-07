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
import { X } from "lucide-react";

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

  const [errors, setErrors] = useState({
    groupId: "",
    meetingTime: "",
    location: "",
    agenda: "",
  });

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
    }
  }, [semesterId, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "meetingTime" && value) {
      formattedValue = `${value}:00Z`;
    }
    setNewMeeting({ ...newMeeting, [name]: formattedValue });

    if (value.trim() || name === "meetingTime") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleGroupChange = (value: string) => {
    setNewMeeting({ ...newMeeting, groupId: value });
    if (value) {
      setErrors((prev) => ({ ...prev, groupId: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      groupId: newMeeting.groupId ? "" : "Vui lòng chọn nhóm",
      meetingTime: newMeeting.meetingTime ? "" : "Vui lòng chọn thời gian họp",
      location: newMeeting.location?.trim() ? "" : "Vui lòng nhập địa điểm",
      agenda: newMeeting.agenda?.trim() ? "" : "Vui lòng nhập chủ đề",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleCreateMeeting = async () => {
    if (validateForm() && semesterId && newMeeting.groupId) {
      const meetingDataBase = {
        groupId: newMeeting.groupId,
        meetingTime: newMeeting.meetingTime,
        location: newMeeting.location,
        agenda: newMeeting.agenda,
      };
      const meetingData = newMeeting.url?.trim()
        ? { ...meetingDataBase, url: newMeeting.url }
        : meetingDataBase;
  
      await dispatch(createMeeting({ semesterId, meetingData: meetingData as Meeting }));
      onClose();
    }
  };

  const isFormValid = () =>
    newMeeting.groupId &&
    newMeeting.meetingTime &&
    newMeeting.location?.trim() &&
    newMeeting.agenda?.trim();

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
              Nhóm <span className="text-red-500">*</span>
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
            {errors.groupId && <p className="text-red-500 text-xs">{errors.groupId}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingTime" className="text-sm font-medium text-gray-700">
              Thời gian họp <span className="text-red-500">*</span>
            </Label>
            <Input
              id="meetingTime"
              name="meetingTime"
              type="datetime-local"
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={newMeeting.meetingTime?.replace(":00Z", "") || ""}
              onChange={handleInputChange}
            />
            {errors.meetingTime && <p className="text-red-500 text-xs">{errors.meetingTime}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Địa điểm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              value={newMeeting.location || ""}
              onChange={handleInputChange}
              placeholder="Nhập địa điểm (VD: NVH302)"
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="agenda" className="text-sm font-medium text-gray-700">
              Chủ đề <span className="text-red-500">*</span>
            </Label>
            <Input
              id="agenda"
              name="agenda"
              value={newMeeting.agenda || ""}
              onChange={handleInputChange}
              placeholder="Nhập chủ đề (VD: Thảo luận tiến độ dự án)"
              className="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.agenda && <p className="text-red-500 text-xs">{errors.agenda}</p>}
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
              disabled={!isFormValid()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Tạo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};