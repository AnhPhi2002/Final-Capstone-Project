"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchMajors } from "@/lib/api/redux/majorSlice";
import {
  createInterMajorConfig,
  fetchInterMajorConfigs,
} from "@/lib/api/redux/interMajorSlice";
import { toast } from "sonner";

type Props = {
  semesterId: string;
};

export const CreateInterMajorDialog: React.FC<Props> = ({ semesterId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const majors = useSelector((state: RootState) => state.majors.data);
  const loading = useSelector((state: RootState) => state.interMajor.loading);

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [firstMajorId, setFirstMajorId] = useState("");
  const [secondMajorId, setSecondMajorId] = useState("");

  useEffect(() => {
    dispatch(fetchMajors());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!name || !firstMajorId || !secondMajorId) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (firstMajorId === secondMajorId) {
      toast.error("Hai ngành không được trùng nhau");
      return;
    }

    try {
      const resultAction = await dispatch(
        createInterMajorConfig({
          name,
          semesterId,
          firstMajorId,
          secondMajorId,
        })
      );

      if (createInterMajorConfig.fulfilled.match(resultAction)) {
        toast.success("Tạo liên ngành thành công 🎉");

        // ✅ Gọi lại danh sách đầy đủ thay vì push vào slice
        await dispatch(fetchInterMajorConfigs({ semesterId }));

        setIsOpen(false);
        setName("");
        setFirstMajorId("");
        setSecondMajorId("");
      } else {
        toast.error(resultAction.payload as string);
      }
    } catch (err: any) {
      toast.error("Có lỗi xảy ra khi tạo liên ngành");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Tạo liên kết liên ngành</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="mb-4">
          <DialogTitle>Tạo liên kết liên ngành</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Tên liên kết</Label>
            <Input
              placeholder="VD: SE_AI"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-2 block">Ngành thứ nhất</Label>
            <Select value={firstMajorId} onValueChange={setFirstMajorId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn ngành thứ nhất" />
              </SelectTrigger>
              <SelectContent>
                {majors.map((major) => (
                  <SelectItem key={major.id} value={major.id}>
                    {major.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block">Ngành thứ hai</Label>
            <Select value={secondMajorId} onValueChange={setSecondMajorId}>
              <SelectTrigger className="mb-2">
                <SelectValue placeholder="Chọn ngành thứ hai" />
              </SelectTrigger>
              <SelectContent>
                {majors.map((major) => (
                  <SelectItem key={major.id} value={major.id}>
                    {major.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo liên ngành"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
