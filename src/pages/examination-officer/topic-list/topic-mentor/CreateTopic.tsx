"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createTopicByAcademic, fetchTopics } from "@/lib/api/redux/topicSlice";
import { createInterMajorTopicByAcademic } from "@/lib/api/redux/interMajorTopicSlice";
import { fetchMajors } from "@/lib/api/redux/majorSlice";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { fetchInterMajorConfigs } from "@/lib/api/redux/interMajorSlice";
import { uploadFile } from "@/lib/api/redux/uploadSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { debounce } from "lodash";
import { Topic } from "@/lib/api/redux/types/topic";

const topicSchema = z.object({
  nameVi: z.string().min(1, "Tên tiếng Việt không được để trống"),
  nameEn: z.string().min(1, "Tên tiếng Anh không được để trống"),
  name: z.string().min(1, "Tên viết tắt không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  mainMentorId: z.string().email("Nhập format mail @...com").optional().or(z.literal("")),
  subMentorId: z.string().email("Nhập format mail @...com").optional().or(z.literal("")),
  majorId: z.string().optional(),
  majorPairConfigId: z.string().optional(),
  groupCode: z.string().optional(),
  isBusiness: z.boolean(),
  businessPartner: z.string().nullable().optional(),
});

type TopicFormData = z.infer<typeof topicSchema>;

export const CreateTopic: React.FC<{ semesterId: string; submissionPeriodId: string }> = ({ semesterId, submissionPeriodId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: majors, loading: majorLoading } = useSelector((state: RootState) => state.majors);
  const { mentors, loading: mentorLoading } = useSelector((state: RootState) => state.mentors);
  const { groups, loading: groupLoading } = useSelector((state: RootState) => state.groups);
  const { data: interMajors, loading: interMajorLoading } = useSelector((state: RootState) => state.interMajor);
  const { fileUrl, loading: uploadLoading, error: uploadError } = useSelector(
    (state: RootState) => state.upload
  );

  const form = useForm<TopicFormData>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      nameVi: "",
      nameEn: "",
      name: "",
      description: "",
      mainMentorId: "",
      subMentorId: "",
      majorId: "",
      majorPairConfigId: "",
      groupCode: "",
      isBusiness: false,
      businessPartner: null,
    },
  });

  const [open, setOpen] = useState(false);
  const [isInterMajor, setIsInterMajor] = useState(false);
  const [filteredMainEmails, setFilteredMainEmails] = useState<string[]>([]);
  const [filteredSubEmails, setFilteredSubEmails] = useState<string[]>([]);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<
    { fileName: string; draftFileUrl: string; fileType: string }[]
  >([]);

  const isBusiness = form.watch("isBusiness");
  const mainMentorId = form.watch("mainMentorId");
  const subMentorId = form.watch("subMentorId");

  useEffect(() => {
    dispatch(fetchMajors());
    dispatch(fetchMentorsBySemesterId(semesterId));
    dispatch(fetchGroupsBySemester(semesterId));
    dispatch(fetchInterMajorConfigs({ semesterId }));
  }, [dispatch, semesterId]);

  const filterMainEmails = debounce((input: string) => {
    if (!input?.trim()) {
      setFilteredMainEmails([]);
    } else {
      const filtered = mentors
        .map((mentor) => mentor.email)
        .filter((email) => email.toLowerCase().startsWith(input.toLowerCase()));
      setFilteredMainEmails(filtered);
    }
  }, 300);

  const filterSubEmails = debounce((input: string) => {
    if (!input?.trim()) {
      setFilteredSubEmails([]);
    } else {
      const filtered = mentors
        .map((mentor) => mentor.email)
        .filter((email) =>
          email.toLowerCase().startsWith(input.toLowerCase()) &&
          email !== mainMentorId
        );
      setFilteredSubEmails(filtered);
    }
  }, 300);

  useEffect(() => {
    filterMainEmails(mainMentorId || "");
  }, [mainMentorId, mentors]);

  useEffect(() => {
    filterSubEmails(subMentorId || "");
  }, [subMentorId, mentors, mainMentorId]);

  useEffect(() => {
    if (fileUrl && !uploadLoading && !uploadError && documentFile) {
      const fileName = documentFile.name || "Tài liệu";
      const fileType = fileName.split(".").pop() || "unknown";
      setDocuments((prev) => [
        ...prev,
        { fileName, draftFileUrl: fileUrl, fileType },
      ]);
      setDocumentFile(null);
      (document.querySelector('input[type="file"]') as HTMLInputElement).value = "";
      toast.success("Tải file thành công!");
    }
    if (uploadError) {
      toast.error(uploadError);
    }
  }, [fileUrl, uploadLoading, uploadError, documentFile]);

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
      await dispatch(uploadFile(documentFile)).unwrap();
    } catch (error) {
      toast.error("Không thể tải file lên. Vui lòng thử lại!");
    }
  };

  const handleSelectMainEmail = (email: string) => {
    form.setValue("mainMentorId", email);
    setFilteredMainEmails([]);
    filterSubEmails(subMentorId || "");
  };

  const handleSelectSubEmail = (email: string) => {
    form.setValue("subMentorId", email);
    setFilteredSubEmails([]);
  };

  const onSubmit = async (data: TopicFormData) => {
    if (documentFile && documents.length === 0) {
      toast.error("Vui lòng đợi file tải lên hoàn tất trước khi tạo đề tài!");
      return;
    }

    const basePayload: Partial<Topic> & {
      majorId?: string;
      majorPairConfigId?: string;
      mainMentorId?: string;
      subMentorId?: string;
      semesterId: string;
      submissionPeriodId: string;
      isBusiness: boolean;
      businessPartner?: string | null;
      source: string;
      draftFileUrl?: string | null;
    } = {
      nameVi: data.nameVi,
      nameEn: data.nameEn,
      name: data.name,
      description: data.description,
      mainMentorId: data.mainMentorId || undefined,
      subMentorId: data.subMentorId || undefined,
      semesterId,
      submissionPeriodId,
      groupCode: data.groupCode || undefined,
      isBusiness: data.isBusiness,
      businessPartner: data.isBusiness ? data.businessPartner : null,
      source: "Tự đề xuất",
      draftFileUrl: documents.length > 0 ? documents[0].draftFileUrl : null,
    };

    try {
      if (isInterMajor) {
        if (interMajorLoading) {
          toast.error("Đang tải cấu hình liên ngành, vui lòng đợi!");
          return;
        }
        if (!interMajors || interMajors.length === 0) {
          toast.error("Hiện chưa có cấu hình liên ngành nào được tạo!");
          return;
        }
        if (!data.majorPairConfigId) {
          toast.error("Vui lòng chọn liên kết liên ngành!");
          return;
        }
        await dispatch(
          createInterMajorTopicByAcademic({
            ...basePayload,
            majorPairConfigId: data.majorPairConfigId,
          })
        ).unwrap();
        toast.success("Tạo đề tài liên ngành thành công!");
      } else {
        if (!data.majorId) {
          toast.error("Vui lòng chọn ngành học!");
          return;
        }
        await dispatch(
          createTopicByAcademic({
            ...basePayload,
            majorId: data.majorId,
            majors: [{ id: data.majorId, name: majors.find(m => m.id === data.majorId)?.name || "" }],
          })
        ).unwrap();
        toast.success("Tạo đề tài thành công!");
      }

      dispatch(fetchTopics({ semesterId, submissionPeriodId }));
      setOpen(false);
      form.reset();
      setDocuments([]);
      setIsInterMajor(false);
    } catch (error: any) {
      toast.error(`Tạo thất bại: ${error}`);
    }
  };

  const isLoading = majorLoading || mentorLoading || uploadLoading || groupLoading || interMajorLoading;

  return (
    <Dialog open={open} onOpenChange={(open) => (setOpen(open), !open && form.reset())}>
      <DialogTrigger asChild>
        <Button>Tạo Đề Tài</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo Đề Tài Mới</DialogTitle>
          <DialogDescription>Nhập thông tin đề tài mới.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={isInterMajor}
                onCheckedChange={() => {
                  setIsInterMajor(!isInterMajor);
                  form.setValue("majorId", "");
                  form.setValue("majorPairConfigId", "");
                }}
                id="interMajor"
              />
              <FormLabel htmlFor="interMajor">Đề tài liên ngành</FormLabel>
            </div>

            {isInterMajor ? (
              <FormField
                control={form.control}
                name="majorPairConfigId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Liên kết liên ngành</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              interMajorLoading
                                ? "Đang tải cấu hình liên ngành..."
                                : interMajors?.length
                                ? "Chọn liên kết liên ngành"
                                : "Chưa có liên ngành"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
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
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="majorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngành học</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="nameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên đề tài (Tiếng Anh)</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên đề tài (Tiếng Anh)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nameVi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên đề tài (Tiếng Việt)</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên đề tài (Tiếng Việt)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên viết tắt</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên viết tắt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả đề tài</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mô tả đề tài" className="h-24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mainMentorId"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Email giảng viên 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Email giảng viên 1" {...field} />
                  </FormControl>
                  <FormMessage />
                  {filteredMainEmails.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {filteredMainEmails.map((email) => (
                        <li
                          key={email}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectMainEmail(email)}
                        >
                          {email}
                        </li>
                      ))}
                    </ul>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subMentorId"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Email giảng viên 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Email giảng viên 2" {...field} />
                  </FormControl>
                  <FormMessage />
                  {filteredSubEmails.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {filteredSubEmails.map((email) => (
                        <li
                          key={email}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectSubEmail(email)}
                        >
                          {email}
                        </li>
                      ))}
                    </ul>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="groupCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã nhóm</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            groupLoading ? "Đang tải danh sách nhóm..." : "Chọn mã nhóm"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {groups?.length ? (
                            groups.map((group) => (
                              <SelectItem key={group.id} value={group.groupCode}>
                                {group.groupCode}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              Không có nhóm nào
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isBusiness"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Đề tài có liên quan đến doanh nghiệp?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (!checked) form.setValue("businessPartner", null);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isBusiness && (
              <FormField
                control={form.control}
                name="businessPartner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên doanh nghiệp</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên doanh nghiệp" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept=".doc,.docx,.xls,.xlsx"
                onChange={handleFileChange}
                aria-label="Tải lên tài liệu"
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

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Tạo"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};