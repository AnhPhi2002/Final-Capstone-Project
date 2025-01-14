import excelFormat from "@/assets/images/import-student-excel-format.jpg";
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
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImportStudentEligibleTab = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Files:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Import danh sách sinh viên vào hệ thống</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <h3 className="font-semibold">Định dạng excel</h3>
          <img src={excelFormat} alt="" />
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
            {isDragActive ? (
              <p>Thả file vào đây ...</p>
            ) : (
              <div className="text-gray-500 flex items-center flex-col">
                <Upload className="size-20 py-5" />
                <p>Kéo và thả tệp ở đây hoặc nhấp để chọn tệp.</p>
                <p> Định dạng file .excel</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Import</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImportStudentEligibleTab;
