import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AdminConfig = () => {
  return (
    <div className=" p-6">
      <Card className="">
        <CardHeader>
          <CardTitle>Cấu hình số lượng thành viên và giảng viên hướng dẫn </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="block text-sm font-medium mb-1">
              Số Thành Viên Tối Đa
            </Label>
            <Input type="number" value={5} readOnly className="w-full" />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-2">
              Danh Sách Giảng Viên
            </Label>
            <div className="space-y-2">
              {["Giảng Viên 1", "Giảng Viên 2"].map((mentor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={mentor}
                    readOnly
                    placeholder={`Giảng Viên ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
