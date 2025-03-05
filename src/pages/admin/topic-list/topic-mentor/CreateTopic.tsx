import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createTopic } from "@/lib/api/redux/topicSlice";
import { fetchMajors } from "@/lib/api/redux/majorSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [groupCode, setGroupCode] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [documents, setDocuments] = useState<
    { fileName: string; fileUrl: string; fileType: string }[]
  >([]);

  useEffect(() => {
    dispatch(fetchMajors());
  }, [dispatch]);

  const handleBusinessToggle = (checked: boolean) => {
    setIsBusiness(checked);
    if (!checked) setBusinessPartner(null);
  };

  const handleAddDocument = () => {
    if (!documentUrl.trim()) {
      toast.error("Vui lòng nhập đường dẫn tài liệu!");
      return;
    }
    const fileName = documentUrl.split("/").pop() || "Tài liệu";
    const fileType = fileName.split(".").pop() || "unknown";
    setDocuments([...documents, { fileName, fileUrl: documentUrl, fileType }]);
    setDocumentUrl("");
  };

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

    try {
      await dispatch(createTopic(newTopic)).unwrap();
      toast.success("Đề tài đã được tạo thành công!");
      setOpen(false);
      setNameVi("");
      setNameEn("");
      setName("");
      setDescription("");
      setMajorId(null);
      setGroupCode("");
      setDocuments([]);
      setIsBusiness(false);
      setBusinessPartner(null);
    } catch (error: any) {
      toast.error(error?.message || "Tạo đề tài thất bại!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tạo Đề Tài</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo Đề Tài Mới</DialogTitle>
          <DialogDescription>Nhập thông tin đề tài mới.</DialogDescription>
        </DialogHeader>

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
      <Textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Mô tả đề tài"
  className="h-24" // Đặt chiều cao trực tiếp nếu `rows` không hoạt động
/>


          <Select onValueChange={setMajorId} value={majorId || ""}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  majorLoading ? "Đang tải ngành học..." : "Chọn ngành học"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {majors?.length ? (
                  majors.map((major) => (
                    <SelectItem key={major.id} value={major.id}>
                      {major.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    Không có ngành học
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              Đề tài có liên quan đến doanh nghiệp?
            </label>
            <Switch
              checked={isBusiness}
              onCheckedChange={handleBusinessToggle}
            />
          </div>

          {isBusiness && (
            <Input
              value={businessPartner || ""}
              onChange={(e) => setBusinessPartner(e.target.value)}
              placeholder="Tên doanh nghiệp"
            />
          )}

          <Input
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            placeholder="Mã nhóm"
          />

          <div className="flex items-center gap-2">
            <Input
              value={documentUrl}
              onChange={(e) => setDocumentUrl(e.target.value)}
              placeholder="URL tài liệu"
            />
            <Button onClick={handleAddDocument}>Thêm</Button>
          </div>

          {documents.length > 0 && (
            <ul className="text-sm text-gray-600">
              {documents.map((doc, index) => (
                <li key={index}>📄 {doc.fileName}</li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleCreateTopic} disabled={majorLoading}>
            Tạo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
