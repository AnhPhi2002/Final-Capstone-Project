"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { updateInterMajorConfig } from "@/lib/api/redux/interMajorSlice";
import { toast } from "sonner";

interface EditDialogProps {
  id: string;
  currentName: string;
  semesterId: string;
  firstMajorId: string;
  secondMajorId: string;
  isActive: boolean;
}

export const EditInterMajorDialog: React.FC<EditDialogProps> = ({
  id,
  currentName,
  semesterId,
  firstMajorId,
  secondMajorId,
  isActive,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(currentName);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await dispatch(
        updateInterMajorConfig({
          id,
          name,
          semesterId,
          firstMajorId,
          secondMajorId,
          isActive,
        })
      ).unwrap();
      toast.success("Cập nhật tên liên ngành thành công");
      setOpen(false);
    } catch (err) {
      toast.error(`Lỗi: ${err}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">✏️ Chỉnh sửa</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa tên liên ngành</DialogTitle>
        </DialogHeader>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
