import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterMajorById, deleteInterMajorConfig, updateInterMajorConfig } from "@/lib/api/redux/interMajorSlice";
import { fetchSemesterDetail } from "@/lib/api/redux/semesterSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { interMajorDetailColumns, InterMajorDetailRow } from "./columns/interMajorDetailColumns";
import { DataTable } from "./columns/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

export const InterMajorDetail: React.FC = () => {
  const { interMajorId } = useParams<{ interMajorId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { selected, loading, error } = useSelector((state: RootState) => state.interMajor);
  const [semesterCode, setSemesterCode] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (interMajorId) {
      dispatch(fetchInterMajorById({ id: interMajorId }));
    }
  }, [dispatch, interMajorId]);

  useEffect(() => {
    if (selected) {
      setName(selected.name || "");
      if (selected.semesterId) {
        dispatch(fetchSemesterDetail(selected.semesterId))
          .unwrap()
          .then((data) => setSemesterCode(data.code))
          .catch(() => setSemesterCode(null));
      }
    }
  }, [dispatch, selected]);

  const handleDelete = async () => {
    if (selected?.id) {
      try {
        await dispatch(deleteInterMajorConfig(selected.id)).unwrap();
        toast.success("Đã xóa liên ngành thành công");
        navigate("/academic/inter-major");
      } catch (err) {
        toast.error(`Lỗi khi xóa: ${err}`);
      }
    }
  };

  const handleSubmit = async () => {
    if (selected?.id) {
      try {
        await dispatch(
          updateInterMajorConfig({
            id: selected.id,
            name,
            semesterId: selected.semesterId,
            firstMajorId: selected.firstMajorId,
            secondMajorId: selected.secondMajorId,
            isActive: selected.isActive,
          })
        ).unwrap();
        toast.success("Cập nhật tên liên ngành thành công");
        setOpen(false);
        dispatch(fetchInterMajorById({ id: interMajorId! }));
      } catch (err) {
        toast.error(`Lỗi: ${err}`);
      }
    }
  };

  if (loading) return <p className="text-center mt-6 text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">Lỗi: {error}</p>;
  if (!selected) return null;

  const rows: InterMajorDetailRow[] = [
    { field: "Tên liên ngành", value: selected.name },
    { field: "Ngành thứ nhất", value: selected.firstMajor?.name || "" },
    { field: "Ngành thứ hai", value: selected.secondMajor?.name || "" },
    { field: "Học kỳ", value: semesterCode ?? selected.semesterId },
    {
      field: "Trạng thái",
      value: (
        <Badge className={selected.isActive ? "badge-active" : "badge-inactive"}>
          {selected.isActive ? "Đang hoạt động" : "Không hoạt động"}
        </Badge>
      ),
    },
    {
      field: "Đã xóa",
      value: (
        <Badge className={selected.isDeleted ? "badge-deleted" : "badge-not-deleted"}>
          {selected.isDeleted ? "Đã xóa" : "Chưa xóa"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="p-6 w-full space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="border-gray-300 hover:bg-gray-100">
          ← Quay lại
        </Button>
        <div className="space-x-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Chỉnh sửa tên liên ngành</DialogTitle>
              </DialogHeader>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="border-gray-300 focus:ring-blue-500" />
              <DialogFooter className="mt-4">
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">Lưu</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
            <Trash2 className="mr-2 h-4 w-4" /> Xóa
          </Button>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 text-center">Chi tiết liên ngành</h2>
      <div className="w-full">
        <DataTable columns={interMajorDetailColumns} data={rows} />
      </div>
    </div>
  );
};