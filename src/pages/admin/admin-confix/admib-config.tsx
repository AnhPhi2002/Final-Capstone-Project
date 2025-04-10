import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfig } from "@/lib/api/redux/configSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { CONFIG_KEYS, getAllConfigKeys } from "@/lib/api/redux/types/configKeys";

export const AdminConfig = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { configData, loading } = useSelector((state: RootState) => state.config);

  useEffect(() => {
    dispatch(fetchConfig(getAllConfigKeys()));
  }, [dispatch]);

  if (loading) {
    return <p className="p-6 text-gray-500">Đang tải cấu hình...</p>;
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Cấu hình hệ thống</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {CONFIG_KEYS.map((config) => (
            <div key={config.key}>
              <Label className="block text-sm font-medium mb-1">
                {config.label}
              </Label>
              <Input
                type="number"
                value={configData[config.key]?.value ?? ""}
                readOnly
                className="w-full"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
