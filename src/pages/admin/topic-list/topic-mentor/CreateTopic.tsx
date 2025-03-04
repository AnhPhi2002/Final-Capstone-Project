import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createTopic } from "@/lib/api/redux/topicSlice";
import { fetchMajors } from "@/lib/api/redux/majorSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import { Switch } from "@/components/ui/switch";

export const CreateTopic: React.FC<{ semesterId: string }> = ({
  semesterId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: majors, loading: majorLoading } = useSelector(
    (state: RootState) => state.majors
  );

  const [open, setOpen] = useState(false);
  const [nameVi, setNameVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);
  const [businessPartner, setBusinessPartner] = useState<string | null>(null);
  const [majorId, setMajorId] = useState<string | null>(null);
  const [subSupervisorEmail, setSubSupervisorEmail] = useState<string | null>(
    null
  );
  const [groupCode, setGroupCode] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [documents, setDocuments] = useState<
    { fileName: string; fileUrl: string; fileType: string }[]
  >([]);

  useEffect(() => {
    dispatch(fetchMajors());
  }, [dispatch]);

  // Xử lý thay đổi trạng thái của isBusiness
  const handleBusinessToggle = (checked: boolean) => {
    setIsBusiness(checked);
    if (!checked) {
      setBusinessPartner(null); // Nếu tắt, đặt businessPartner về null
    }
  };

  // Xử lý thêm tài liệu
  const handleAddDocument = () => {
    if (!documentUrl) {
      toast.error("Vui lòng nhập đường dẫn tài liệu!");
      return;
    }

    const fileName = documentUrl.split("/").pop() || "Tài liệu";
    const fileType = fileName.split(".").pop() || "unknown";

    setDocuments([...documents, { fileName, fileUrl: documentUrl, fileType }]);
    setDocumentUrl("");
  };

  // Xử lý tạo đề tài
  const handleCreateTopic = async () => {
    if (
      !nameVi ||
      !nameEn ||
      !name ||
      !description ||
      !semesterId ||
      !majorId
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newTopic: Record<string, any> = {
      nameVi,
      nameEn,
      name,
      description,
      semesterId,
      majorId,
      isBusiness,
      businessPartner: isBusiness ? businessPartner : null,
      source: "Tự đề xuất",
      documents,
    };

    // Chỉ thêm các trường nếu chúng có giá trị hợp lệ
    if (subSupervisorEmail?.trim()) {
      newTopic.subSupervisorEmail = subSupervisorEmail.trim();
    }
    if (groupCode?.trim()) {
      newTopic.groupCode = groupCode.trim();
    }

    try {
      await dispatch(createTopic(newTopic)).unwrap();
      toast.success("Đề tài đã được tạo thành công!");
      setOpen(false);
      setNameVi("");
      setNameEn("");
      setName("");
      setDescription("");
      setMajorId(null);
      setSubSupervisorEmail(null);
      setGroupCode("");
      setDocuments([]);
      setIsBusiness(false);
      setBusinessPartner(null);
    } catch (error: any) {
      toast.error(error?.message || "Tạo đề tài thất bại!");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Tạo Đề Tài</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tạo Đề Tài Mới</AlertDialogTitle>
          <AlertDialogDescription>
            Nhập thông tin đề tài mới.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3">
          <Input
            value={nameVi}
            onChange={(e) => setNameVi(e.target.value)}
            placeholder="Tên đề tài (Tiếng Việt)"
          />
          <Input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="Tên đề tài (Tiếng Anh)"
          />
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên dự án"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả đề tài"
          />

          {/* Chọn ngành học */}
          <Select
            onValueChange={(value) => setMajorId(value)}
            value={majorId || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn ngành học" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {majorLoading ? (
                  <SelectItem value="loading" disabled>
                    Đang tải...
                  </SelectItem>
                ) : (
                  majors.map((major) => (
                    <SelectItem key={major.id} value={major.id}>
                      {major.name}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Bật/tắt Doanh Nghiệp */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Đề tài có liên quan đến doanh nghiệp?</label>
            <Switch checked={isBusiness} onCheckedChange={handleBusinessToggle} />
          </div>

          {/* Nhập thông tin doanh nghiệp nếu bật */}
          {isBusiness && (
            <Input
              value={businessPartner || ""}
              onChange={(e) => setBusinessPartner(e.target.value)}
              placeholder="Tên doanh nghiệp"
            />
          )}

          {/* Nhập Email của Giảng viên hướng dẫn phụ */}
          <Input
            value={subSupervisorEmail || ""}
            onChange={(e) => setSubSupervisorEmail(e.target.value)}
            placeholder="Email Giảng viên hướng dẫn phụ (nếu có)"
          />

          <Input
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            placeholder="Mã nhóm"
          />

          {/* Thêm file tài liệu */}
          <div className="flex items-center gap-2">
            <Input
              value={documentUrl}
              onChange={(e) => setDocumentUrl(e.target.value)}
              placeholder="URL tài liệu"
            />
            <Button onClick={handleAddDocument}>Thêm</Button>
          </div>

          {/* Hiển thị danh sách tài liệu đã thêm */}
          {documents.length > 0 && (
            <ul className="text-sm text-gray-600">
              {documents.map((doc, index) => (
                <li key={index}>📄 {doc.fileName}</li>
              ))}
            </ul>
          )}
        </div>
        {/* Bật/tắt Doanh Nghiệp */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">
            Đề tài có liên quan đến doanh nghiệp?
          </label>
          <Switch checked={isBusiness} onCheckedChange={handleBusinessToggle} />
        </div>

        {/* Nhập thông tin doanh nghiệp nếu bật */}
        {isBusiness && (
          <Input
            value={businessPartner || ""}
            onChange={(e) => setBusinessPartner(e.target.value)}
            placeholder="Tên doanh nghiệp"
          />
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleCreateTopic}>Tạo</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
