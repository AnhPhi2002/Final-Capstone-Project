import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";
import { Label } from "@/components/ui/label";

const CreateGroup = () => {
  const [open, setOpen] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const [topicCode, setTopicCode] = useState("");
  const [mentor1, setMentor1] = useState("");
  const [mentor2, setMentor2] = useState("");
  const [status, setStatus] = useState("active");
  const [maxMembers, setMaxMembers] = useState(4);
  const [isMultiMajor, setIsMultiMajor] = useState("no");

  const handleCreateGroup = () => {
    if (!groupCode || !topicCode || !mentor1) {
      toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    const newGroup = {
      group_code: groupCode,
      topic_code: topicCode,
      mentor_1_id: mentor1,
      mentor_2_id: mentor2 || null,
      status,
      max_members: maxMembers,
      is_multi_major: isMultiMajor === "yes",
    };

    console.log("New Group:", newGroup);
    toast.success("Nhóm KLTN đã được tạo thành công!");
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setGroupCode("");
    setTopicCode("");
    setMentor1("");
    setMentor2("");
    setStatus("active");
    setMaxMembers(4);
    setIsMultiMajor("no");
  };

  return (
    <div>
      <Toaster position="top-right" richColors duration={3000} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-black text-white hover:bg-gray-800">
            Tạo nhóm KLTN
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tạo nhóm KLTN mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin nhóm KLTN bên dưới và nhấn "Tạo nhóm".
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Mã Nhóm */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="group_code" className="text-right">
                Mã Nhóm
              </Label>
              <Input
                id="group_code"
                placeholder="VD: G2025A01"
                className="col-span-3"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
              />
            </div>

            {/* Mã Đề Tài */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="topic_code" className="text-right">
                Mã Đề Tài
              </Label>
              <Input
                id="topic_code"
                placeholder="VD: T2025A01"
                className="col-span-3"
                value={topicCode}
                onChange={(e) => setTopicCode(e.target.value)}
              />
            </div>

            {/* Giảng Viên 1 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mentor_1_id" className="text-right">
                Giảng Viên 1
              </Label>
              <Input
                id="mentor_1_id"
                placeholder="Mã Giảng Viên 1"
                className="col-span-3"
                value={mentor1}
                onChange={(e) => setMentor1(e.target.value)}
              />
            </div>

            {/* Giảng Viên 2 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mentor_2_id" className="text-right">
                Giảng Viên 2
              </Label>
              <Input
                id="mentor_2_id"
                placeholder="Mã Giảng Viên 2 (tùy chọn)"
                className="col-span-3"
                value={mentor2}
                onChange={(e) => setMentor2(e.target.value)}
              />
            </div>

            {/* Trạng Thái */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Trạng Thái
              </Label>
              <Select onValueChange={(value) => setStatus(value)} defaultValue="active">
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

     

            {/* Liên Ngành */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is_multi_major" className="text-right">
                Liên Ngành
              </Label>
              <Select onValueChange={(value) => setIsMultiMajor(value)} defaultValue="no">
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn loại nhóm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="yes">Có</SelectItem>
                    <SelectItem value="no">Không</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleCreateGroup}>Tạo nhóm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateGroup;
