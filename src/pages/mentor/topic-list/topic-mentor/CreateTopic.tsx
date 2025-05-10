"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createTopic, fetchTopics } from "@/lib/api/redux/topicSlice";
import { createInterMajorTopic } from "@/lib/api/redux/interMajorTopicSlice";
import { fetchMajors } from "@/lib/api/redux/majorSlice";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { fetchInterMajorConfigs } from "@/lib/api/redux/interMajorSlice";
import { uploadFile } from "@/lib/api/redux/uploadSlice";

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
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Props = {
  semesterId: string;
  submissionPeriodId: string;
};

export const CreateTopic: React.FC<Props> = ({ semesterId, submissionPeriodId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: majors } = useSelector((state: RootState) => state.majors);
  const { mentors } = useSelector((state: RootState) => state.mentors);
  const { groups } = useSelector((state: RootState) => state.groups);
  const { data: interMajors, loading: interMajorLoading } = useSelector((state: RootState) => state.interMajor);
  const { fileUrl, loading: uploadLoading, error: uploadError } = useSelector((state: RootState) => state.upload);

  const [open, setOpen] = useState(false);
  const [nameVi, setNameVi] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subSupervisorEmail, setSubSupervisorEmail] = useState("");
  const [filteredEmails, setFilteredEmails] = useState<string[]>([]);
  const [groupCode, setGroupCode] = useState("");
  const [filteredGroups, setFilteredGroups] = useState<string[]>([]);
  const [isBusiness, setIsBusiness] = useState(false);
  const [businessPartner, setBusinessPartner] = useState<string | null>(null);
  const [majorId, setMajorId] = useState<string | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<{ fileName: string; draftFileUrl: string; fileType: string }[]>([]);
  const [isInterMajor, setIsInterMajor] = useState(false);
  const [selectedInterMajorId, setSelectedInterMajorId] = useState("");

  useEffect(() => {
    dispatch(fetchMajors());
    dispatch(fetchMentorsBySemesterId(semesterId));
    dispatch(fetchGroupsBySemester(semesterId));
    dispatch(fetchInterMajorConfigs({ semesterId }));
  }, [dispatch, semesterId]);

  useEffect(() => {
    if (subSupervisorEmail.trim() === "") {
      setFilteredEmails([]);
    } else {
      const filtered = mentors
        .map((mentor) => mentor.email)
        .filter((email) => email.toLowerCase().startsWith(subSupervisorEmail.toLowerCase()));
      setFilteredEmails(filtered);
    }
  }, [subSupervisorEmail, mentors]);

  useEffect(() => {
    if (groupCode.trim() === "") {
      setFilteredGroups([]);
    } else {
      const filtered = groups
        .map((group) => group.groupCode)
        .filter((code) => code.toLowerCase().startsWith(groupCode.toLowerCase()));
      setFilteredGroups(filtered);
    }
  }, [groupCode, groups]);

  useEffect(() => {
    if (fileUrl && !uploadLoading && documentFile) {
      const fileName = documentFile.name;
      const fileType = fileName.split(".").pop() || "unknown";
      setDocuments([...documents, { fileName, draftFileUrl: fileUrl, fileType }]);
      setDocumentFile(null);
      toast.success("Tải file thành công");
    }
    if (uploadError) toast.error(uploadError);
  }, [fileUrl, uploadLoading, uploadError, documentFile, documents]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setDocumentFile(file);
  };

  const handleAddDocument = async () => {
    if (!documentFile) {
      toast.error("Chọn file trước khi tải");
      return;
    }
    await dispatch(uploadFile(documentFile));
  };

  const handleSelectEmail = (email: string) => {
    setSubSupervisorEmail(email);
    setFilteredEmails([]);
  };

  const handleSelectGroup = (group: string) => {
    setGroupCode(group);
    setFilteredGroups([]);
  };

  const handleCreateTopic = async () => {
    if (!nameVi || !nameEn || !name || !description || !semesterId) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const basePayload = {
      nameVi,
      majorId,
      nameEn,
      name,
      description,
      semesterId,
      submissionPeriodId,
      subSupervisorEmail,
      isBusiness,
      businessPartner: isBusiness ? businessPartner : null,
      groupCode,
      source: "Tự đề xuất",
      draftFileUrl: documents[0]?.draftFileUrl || null,
    };

    try {
      if (isInterMajor) {
        if (interMajorLoading) {
          toast.error("Đang tải cấu hình liên ngành, vui lòng đợi");
          return;
        }
        if (!interMajors || interMajors.length === 0) {
          toast.error("Hiện chưa có cấu hình liên ngành nào được tạo");
          return;
        }
        if (!selectedInterMajorId) {
          toast.error("Vui lòng chọn liên kết liên ngành");
          return;
        }
        await dispatch(
          createInterMajorTopic({ ...basePayload, majorPairConfigId: selectedInterMajorId })
        ).unwrap();
        toast.success("Tạo đề tài liên ngành thành công");
      } else {
        if (!majorId) {
          toast.error("Vui lòng chọn ngành học");
          return;
        }
        await dispatch(
          createTopic({
            ...basePayload,
            majors: [{ id: majorId, name: majors.find(m => m.id === majorId)?.name || "" }],
          })
        ).unwrap();
        toast.success("Tạo đề tài thành công");
      }

      dispatch(fetchTopics({ semesterId, submissionPeriodId }));
      setOpen(false);
      setNameVi(""); setNameEn(""); setName(""); setDescription("");
      setSubSupervisorEmail(""); setGroupCode(""); setMajorId(null); setBusinessPartner(null);
      setDocuments([]); setIsBusiness(false); setSelectedInterMajorId(""); setIsInterMajor(false);
    } catch (error: any) {
      toast.error(`${error}` || "Lỗi khi tạo đề tài");
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
          <DialogDescription>Nhập thông tin đề tài</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox checked={isInterMajor} onCheckedChange={() => setIsInterMajor(!isInterMajor)} id="inter" />
            <Label htmlFor="inter">Đề tài liên ngành</Label>
          </div>

          {isInterMajor ? (
            <Select value={selectedInterMajorId} onValueChange={setSelectedInterMajorId} disabled={interMajorLoading}>
              <SelectTrigger>
                <SelectValue placeholder={interMajorLoading ? "Đang tải..." : interMajors?.length ? "Chọn liên kết liên ngành" : "Chưa có liên ngành"} />
              </SelectTrigger>
              <SelectContent>
                {interMajors?.length ? (
                  interMajors
                    .filter((m) => !m.isDeleted)
                    .map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name} ({m.firstMajor.name} & {m.secondMajor.name})
                      </SelectItem>
                    ))
                ) : (
                  <SelectItem value="none" disabled>
                    Chưa có cấu hình liên ngành
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          ) : (
            <Select onValueChange={setMajorId} value={majorId || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn ngành học" />
              </SelectTrigger>
              <SelectContent>
                {majors.map((major) => (
                  <SelectItem key={major.id} value={major.id}>
                    {major.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Input placeholder="Tên đề tài (Tiếng Việt)" value={nameVi} onChange={(e) => setNameVi(e.target.value)} />
          <Input placeholder="Tên đề tài (Tiếng Anh)" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
          <Input placeholder="Tên dự án" value={name} onChange={(e) => setName(e.target.value)} />
          <Textarea placeholder="Mô tả đề tài" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className="relative">
            <Input
              placeholder="Email giảng viên phụ"
              value={subSupervisorEmail}
              onChange={(e) => setSubSupervisorEmail(e.target.value)}
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

          <div className="relative">
            <Input
              placeholder="Mã nhóm"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
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

          <div className="flex items-center justify-between">
            <Label>Đề tài doanh nghiệp?</Label>
            <Switch checked={isBusiness} onCheckedChange={setIsBusiness} />
          </div>
          {isBusiness && (
            <Input placeholder="Tên doanh nghiệp" value={businessPartner || ""} onChange={(e) => setBusinessPartner(e.target.value)} />
          )}

          <div className="flex items-center gap-2">
            <Input type="file" accept=".doc,.docx,.xls,.xlsx" onChange={handleFileChange} />
            <Button onClick={handleAddDocument} disabled={uploadLoading}>
              {uploadLoading ? "Đang tải..." : "Thêm"}
            </Button>
          </div>

          {documents.length > 0 && (
            <ul className="text-sm text-gray-600">
              {documents.map((doc, idx) => (
                <li key={idx}>
                  📄 <a href={doc.draftFileUrl} target="_blank" rel="noopener noreferrer">{doc.fileName}</a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={handleCreateTopic}>Tạo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};