import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import excelFormat from "@/assets/images/import-student-excel-format.jpg";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const ImportStudentTab = () => {
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
          <h3 className="font-semibold text-lg">Xử lí trùng email đã tồn tại</h3>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Báo lỗi và không thực hiện</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Bỏ qua và tiếp tục import các sinh viên khác</Label>
            </div>
          </RadioGroup>
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

export default ImportStudentTab;
