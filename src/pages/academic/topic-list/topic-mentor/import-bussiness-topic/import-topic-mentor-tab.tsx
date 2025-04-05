import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { importBussinessTopic, resetState } from "@/lib/api/redux/importBusinessTopicSlice"; 

export const ImportBussinessTopicTab = () => {
  const { semesterId, submissionPeriodId } = useParams<{ semesterId: string; submissionPeriodId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { loading, error } = useAppSelector((state) => state.importBusinessTopic);

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

    try {
      await dispatch(importBussinessTopic({ formData, semesterId: semesterId!, submissionPeriodId: submissionPeriodId! })).unwrap();
      toast.success("Import thành công!");
      setTimeout(() => {
        navigate(`/academic/topic/${semesterId}`);
        dispatch(resetState());
      }, 2000);
    } catch (err: any) {
      toast.error(err.message || "Import thất bại!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import đề tài</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #888",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          {selectedFile ? (
            <p>File đã chọn: <strong>{selectedFile.name}</strong></p>
          ) : isDragActive ? (
            <p>Thả file vào đây ...</p>
          ) : (
            <p>Kéo và thả tệp hoặc nhấp để chọn tệp.</p>
          )}
        </div>
        {loading && <p>Đang xử lý import...</p>}
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
