// CreateGroupButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import CreateGroupDialogContent from "./CreateGroupDialog"; // phần bạn đã code

const CreateGroupButton = ({ semesterId }: { semesterId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-800">
          Tạo nhóm
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <CreateGroupDialogContent
          semesterId={semesterId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupButton;
