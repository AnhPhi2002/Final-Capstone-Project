// CreateMeeting.tsx
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Meeting</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="groupId" className="text-right">
              Group
            </Label>
            <Select onValueChange={handleGroupChange} value={newMeeting.groupId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Groups</SelectLabel>
                  {groupsLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : groups.length === 0 ? (
                    <SelectItem value="no-groups" disabled>
                      No groups available
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="meetingTime" className="text-right">
              Meeting Time
            </Label>
            <Input
              id="meetingTime"
              name="meetingTime"
              type="datetime-local"
              className="col-span-3"
              value={newMeeting.meetingTime?.replace(":00Z", "")}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={newMeeting.location}
              onChange={handleInputChange}
              placeholder="Location (e.g., NVH302)"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agenda" className="text-right">
              Agenda
            </Label>
            <Input
              id="agenda"
              name="agenda"
              value={newMeeting.agenda}
              onChange={handleInputChange}
              placeholder="Agenda (e.g., Discuss project progress)"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input
              id="url"
              name="url"
              value={newMeeting.url}
              onChange={handleInputChange}
              placeholder="Meeting URL (e.g., https://meet.google.com/abc-def-ghi)"
              className="col-span-3"
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={handleCreateMeeting} disabled={!newMeeting.groupId}>
              Create
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};