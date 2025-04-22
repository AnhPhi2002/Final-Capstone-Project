import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createTopic, fetchTopics } from "@/lib/api/redux/topicSlice";
import { fetchMajors } from "@/lib/api/redux/majorSlice";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
import { uploadFile } from "@/lib/api/redux/uploadSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
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

export const CreateTopic: React.FC<{ semesterId: string; submissionPeriodId: string }> = ({ semesterId,submissionPeriodId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: majors, loading: majorLoading } = useSelector(
    (state: RootState) => state.majors
  );
  const { mentors, loading: mentorLoading } = useSelector(
    (state: RootState) => state.mentors
  );
const { groups, loading: groupLoading } = useSelector(
  (state: RootState) => state.groups);

  const { fileUrl, loading: uploadLoading, error: uploadError } = useSelector(
    (state: RootState) => state.upload
  );

  const [open, setOpen] = useState(false);
  const [nameVi, setNameVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subSupervisorEmail, setSubSupervisorEmail] = useState("");
  const [filteredEmails, setFilteredEmails] = useState<string[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<string[]>([]);
  const [isBusiness, setIsBusiness] = useState(false);
  const [businessPartner, setBusinessPartner] = useState<string | null>(null);
  const [majorId, setMajorId] = useState<string | null>(null);
  const [groupCode, setGroupCode] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<
    { fileName: string; draftFileUrl: string; fileType: string }[]
  >([]);

  // Fetch majors và mentors khi component mount
  useEffect(() => {
    dispatch(fetchMajors());
    dispatch(fetchMentorsBySemesterId(semesterId));
    dispatch(fetchGroupsBySemester(semesterId));
  }, [dispatch, semesterId]);

  // Lọc email dựa trên input subSupervisorEmail
  useEffect(() => {
    if (subSupervisorEmail.trim() === "") {
      setFilteredEmails([]);
    } else {
      const filtered = mentors
        .map((mentor) => mentor.email)
        .filter((email) =>
          email.toLowerCase().startsWith(subSupervisorEmail.toLowerCase())
        );
      setFilteredEmails(filtered);
    }
  }, [subSupervisorEmail, mentors]);

  useEffect(() => {
    if (groupCode.trim() === "") {
      setFilteredGroups([]);
    } else {
      const filteredGroup = groups
        .map((group) => group.groupCode)
        .filter((code) =>
          code.toLowerCase().startsWith(groupCode.toLowerCase())
        );
      setFilteredGroups(filteredGroup);
    }
  }, [groupCode, groups]);

  // Xử lý fileUrl từ API upload
  useEffect(() => {
    if (fileUrl && !uploadLoading && !uploadError && documentFile) {
      const fileName = documentFile.name || "Tài liệu";
      const fileType = fileName.split(".").pop() || "unknown";
      setDocuments([...documents, { fileName, draftFileUrl: fileUrl, fileType }]);
      setDocumentFile(null); // Reset file sau khi upload thành công
      toast.success("Tải file thành công!");
    }
    if (uploadError) {
      toast.error(uploadError);
    }
  }, [fileUrl, uploadLoading, uploadError, documentFile, documents]);

  const handleBusinessToggle = (checked: boolean) => {
    setIsBusiness(checked);
    if (!checked) setBusinessPartner(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const handleAddDocument = async () => {
    if (!documentFile) {
      toast.error("Vui lòng chọn file để tải lên!");
      return;
    }

    try {
      await dispatch(uploadFile(documentFile)).unwrap(); // Gọi API upload và đợi kết quả
    } catch (error) {
      toast.error("Không thể tải file lên. Vui lòng thử lại!");
    }
  };

  const handleCreateTopic = async () => {
    if (!nameVi || !nameEn || !name || !description || !semesterId || !majorId) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (documentFile && documents.length === 0) {
      toast.error("Vui lòng đợi file tải lên hoàn tất trước khi tạo đề tài!");
      return;
    }

    const newTopic: Record<string, any> = {
      nameVi,
      nameEn,
      name,
      description,
      semesterId,
      majorId,
      subSupervisorEmail,
      submissionPeriodId,
      isBusiness,
      businessPartner: isBusiness ? businessPartner : null,
      groupCode: groupCode,
      source: "Tự đề xuất",
      draftFileUrl: documents.length > 0 ? documents[0].draftFileUrl : null,
    };

    try {
      await dispatch(createTopic(newTopic)).unwrap();
      toast.success("Đề tài đã được tạo thành công!");
      dispatch(fetchTopics({ semesterId, submissionPeriodId}));
      setOpen(false);
      setNameVi("");
      setNameEn("");
      setName("");
      setDescription("");
      setSubSupervisorEmail("");
      setMajorId(null);
      setGroupCode("");
      setDocuments([]);
      setIsBusiness(false);
      setBusinessPartner(null);
      setDocumentFile(null);
    } catch (error: any) {
      // toast.error(error?.message || "Tạo đề tài thất bại!");
      toast.error(`${error}`);
    }
  };

  const handleSelectEmail = (email: string) => {
    setSubSupervisorEmail(email);
    setFilteredEmails([]);
  };

  const handleSelectGroup = (group: string) => {
    setGroupCode(group);
    setFilteredGroups([]);
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
            className="h-24"
          />

          <div className="relative">
            <Input
              value={subSupervisorEmail}
              onChange={(e) => setSubSupervisorEmail(e.target.value)}
              placeholder="Email giảng viên phụ"
            />
            {filteredEmails.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
                {filteredEmails.map((email) => (
                  <li
                    key={email}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectEmail(email)}
                  >
                    {email}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
          {/* <div className="relative">
            <Input
              value={subSupervisorEmail}
              onChange={(e) => setSubSupervisorEmail(e.target.value)}
              placeholder="Email giảng viên phụ trách"
            />
            {filteredEmails.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
                {filteredEmails.map((email) => (
                  <li
                    key={email}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectEmail(email)}
                  >
                    {email}
                  </li>
                ))}
              </ul>
            )}
          </div> */}
          <div className="relative">
            <Input
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              placeholder="Mã nhóm"
            />
            {filteredGroups.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
                {filteredGroups.map((group) => (
                  <li
                    key={group}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectGroup(group)}
                  >
                    {group}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept=".doc,.docx,.xls,.xlsx"
              onChange={handleFileChange}
            />
            <Button onClick={handleAddDocument} disabled={uploadLoading}>
              {uploadLoading ? "Đang tải..." : "Thêm"}
            </Button>
          </div>

          {documents.length > 0 && (
            <ul className="text-sm text-gray-600">
              {documents.map((doc, index) => (
                <li key={index}>
                  📄{" "}
                  <a href={doc.draftFileUrl} target="_blank" rel="noopener noreferrer">
                    {doc.fileName}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleCreateTopic}
            disabled={majorLoading || mentorLoading || uploadLoading || groupLoading}
          >
            Tạo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};