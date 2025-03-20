import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createTopic } from "@/lib/api/redux/topicSlice";
import { fetchMajors } from "@/lib/api/redux/majorSlice";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
import { uploadFile } from "@/lib/api/redux/uploadSlice";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Thêm các thành phần ShadCN Form
import { debounce } from "lodash";

// Định nghĩa schema Zod
const topicSchema = z.object({
  nameVi: z.string().min(1, "Tên tiếng Việt không được để trống"),
  nameEn: z.string().min(1, "Tên tiếng Anh không được để trống"),
  name: z.string().min(1, "Tên viết tắt không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  subSupervisorEmail: z.string().email("Email không hợp lệ").optional(),
  majorId: z.string().min(1, "Vui lòng chọn ngành học"),
  groupCode: z.string().optional(),
  isBusiness: z.boolean(),
  businessPartner: z.string().nullable().optional(),
});

type TopicFormData = z.infer<typeof topicSchema>;

export const CreateTopic: React.FC<{ semesterId: string }> = ({ semesterId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: majors, loading: majorLoading } = useSelector(
    (state: RootState) => state.majors
  );
  const { mentors, loading: mentorLoading } = useSelector(
    (state: RootState) => state.mentors
  );
  const {
    fileUrl,
    loading: uploadLoading,
    error: uploadError,
  } = useSelector((state: RootState) => state.upload);

  // Khởi tạo form với React Hook Form
  const form = useForm<TopicFormData>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      nameVi: "",
      nameEn: "",
      name: "",
      description: "",
      subSupervisorEmail: "",
      majorId: "",
      groupCode: "",
      isBusiness: false,
      businessPartner: null,
    },
  });

  const [open, setOpen] = React.useState(false);
  const [filteredEmails, setFilteredEmails] = React.useState<string[]>([]);
  const [documentFile, setDocumentFile] = React.useState<File | null>(null);
  const [documents, setDocuments] = React.useState<
    { fileName: string; draftFileUrl: string; fileType: string }[]
  >([]);

  const isBusiness = form.watch("isBusiness");
  const subSupervisorEmail = form.watch("subSupervisorEmail");

  // Fetch majors và mentors khi component mount
  useEffect(() => {
    dispatch(fetchMajors());
    dispatch(fetchMentorsBySemesterId(semesterId));
  }, [dispatch, semesterId]);

  // Debounced email filtering
  const filterEmails = debounce((input: string) => {
    if (input?.trim() === "") {
      setFilteredEmails([]);
    } else {
      const filtered = mentors
        .map((mentor) => mentor.email)
        .filter((email) => email.toLowerCase().startsWith(input.toLowerCase()));
      setFilteredEmails(filtered);
    }
  }, 300);

  useEffect(() => {
    filterEmails(subSupervisorEmail || "");
  }, [subSupervisorEmail, mentors]);

  // Xử lý fileUrl từ API upload
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

  const handleSelectEmail = (email: string) => {
    form.setValue("subSupervisorEmail", email);
    setFilteredEmails([]);
  };

  const onSubmit = async (data: TopicFormData) => {
    if (documentFile && documents.length === 0) {
      toast.error("Vui lòng đợi file tải lên hoàn tất trước khi tạo đề tài!");
      return;
    }

    const newTopic: Record<string, any> = {
      ...data,
      semesterId,
      businessPartner: data.isBusiness ? data.businessPartner : null,
      source: "Tự đề xuất",
      draftFileUrl: documents.length > 0 ? documents[0].draftFileUrl : null,
    };

    try {
      await dispatch(createTopic(newTopic)).unwrap();
      toast.success("Đề tài đã được tạo thành công!");
      setOpen(false);
      form.reset();
      setDocuments([]);
    } catch (error: any) {
      toast.error(error?.message || "Tạo đề tài thất bại!");
    }
  };

  const isLoading = majorLoading || mentorLoading || uploadLoading;

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
              name="subSupervisorEmail"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Email giảng viên phụ trách</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email giảng viên phụ trách"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="groupCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã nhóm</FormLabel>
                  <FormControl>
                    <Input placeholder="Mã nhóm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <a
                      href={doc.draftFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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