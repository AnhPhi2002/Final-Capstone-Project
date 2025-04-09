import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfig, updateConfig } from "@/lib/api/redux/configSlice"; // Import fetchConfig
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONFIG_KEYS, getAllConfigKeys } from "@/lib/api/redux/types/configKeys";

export const AdminConfigUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.config);
  const [selectedKey, setSelectedKey] = useState<string>("MAX_COUNCIL_MEMBERS");
  const [value, setValue] = useState<string>("2");
  const [description, setDescription] = useState<string>("");

  const handleUpdate = () => {
    if (!selectedKey || !value || !description) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    dispatch(
      updateConfig({
        key: selectedKey,
        value,
        description,
      })
    ).then((action) => {
      if (updateConfig.fulfilled.match(action)) {
        toast.success("Cập nhật cấu hình thành công!");
        // Refetch config data after successful update
        dispatch(fetchConfig(getAllConfigKeys())).then(() => {
          navigate("/admin/admin-config");
        });
      } else {
        toast.error(action.payload as string || "Cập nhật cấu hình thất bại!");
      }
    });
  };

  return (
    <div>
      <Header title="Tổng quan" href="/" currentPage="Cập nhật admin Config" />
      <div className="h-full w-full flex justify-center items-center p-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Cập Nhật Cấu Hình</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-1">
                Chọn Key Cấu Hình
              </Label>
              <Select onValueChange={setSelectedKey} value={selectedKey}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn key cấu hình" />
                </SelectTrigger>
                <SelectContent>
                  {CONFIG_KEYS.map((config) => (
                    <SelectItem key={config.key} value={config.key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">
                Giá Trị
              </Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">
                Mô Tả
              </Label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả lý do thay đổi"
                className="w-full"
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleUpdate} disabled={loading}>
                {loading ? "Đang cập nhật..." : "Cập Nhật"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};