import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { importConditionsBlock3, resetState } from "@/lib/api/redux/importConditionsSlice";
import { useNavigate, useParams } from "react-router";

const ImportStudentEligibleBlock3Tab = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { loading, error } = useAppSelector((state) => state.importConditions);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      toast.info(`Đã chọn file: ${acceptedFiles[0].name}`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error("Vui lòng chọn file để import!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("semesterId", semesterId!);

    try {
      await dispatch(importConditionsBlock3({ formData })).unwrap();
      toast.success("Import danh sách đủ điều kiện thành công!");
      setTimeout(() => {
        navigate(`/academic/student/${semesterId}`);
        dispatch(resetState());
      }, 2000);
    } catch (err: any) {
      console.error("API Error:", err);
      toast.error(err.message || "Import thất bại!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import danh sách sinh viên Block3</CardTitle>
        <CardDescription>Thêm danh sách sinh viên đủ điều kiện từ file Excel.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <h3 className="font-semibold">Định dạng excel</h3>
        <img alt="Excel Format Example" />
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #888",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
          className="rounded-lg"
        >
          <input {...getInputProps()} />
          {selectedFile ? (
            <p>File đã chọn: <strong>{selectedFile.name}</strong></p>
          ) : isDragActive ? (
            <p>Thả file vào đây ...</p>
          ) : (
            <div className="text-gray-500 flex items-center flex-col">
              <Upload className="size-20 py-5" />
              <p>Kéo và thả tệp ở đây hoặc nhấp để chọn tệp.</p>
              <p>Định dạng file: .xlsx hoặc .xls</p>
            </div>
          )}
        </div>
        {loading && <p className="text-blue-500">Đang xử lý import...</p>}
        {error && <p className="text-red-500">Lỗi: {error}</p>}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleImport} disabled={loading}>
          {loading ? "Đang import..." : "Import"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImportStudentEligibleBlock3Tab;
