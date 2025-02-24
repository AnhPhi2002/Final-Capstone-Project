import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import Header from "@/components/header";
import { Label } from "@/components/ui/label";

export const AdminConfigUpdate = () => {
  const [maxMembers, setMaxMembers] = useState(5);
  const [mentors, setMentors] = useState(["Giảng Viên 1", "Giảng Viên 2"]);

  const handleMaxMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxMembers(Number(e.target.value));
  };

  const addMentor = () => setMentors([...mentors, `Giảng Viên ${mentors.length + 1}`]);

  const removeMentor = (index: number) => {
    setMentors(mentors.filter((_, i) => i !== index));
  };

  const updateMentor = (index: number, value: string) => {
    const newMentors = [...mentors];
    newMentors[index] = value;
    setMentors(newMentors);
  };

  return (
    <div>
    <Header title="Tổng quan" href="/" currentPage="Cập nhật admin Config" />
    <div className="h-full w-full flex justify-center items-center p-6">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Cập Nhật Cấu Hình</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="block text-sm font-medium mb-1">Số Thành Viên Tối Đa</Label>
            <Input
              type="number"
              value={maxMembers}
              onChange={handleMaxMembersChange}
              className="w-full"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium mb-1">Danh Sách Giảng Viên</Label>
            <div className="space-y-2">
              {mentors.map((mentor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={mentor}
                    onChange={(e) => updateMentor(index, e.target.value)}
                    placeholder={`Giảng Viên ${index + 1}`}
                  />
                  {mentors.length > 1 && (
                    <Button variant="destructive" size="icon" onClick={() => removeMentor(index)}>
                      <Trash className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button className="mt-3" variant="outline" onClick={addMentor}>
              <Plus className="w-4 h-4 mr-1" /> Thêm Giảng Viên
            </Button>
          </div>
          <div className="flex justify-end mt-4">
            <Button>Cập Nhật</Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>

  );
};
