import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { sendEmails, resetState } from "@/lib/api/redux/sendEmailSlice";
import { toast } from "sonner";
import { useState } from "react";
import QualifiedButton from "./QualifiedButton";
import NotQualifiedButton from "./NotQualifiedButton";
import PreviewEmail from "./PreviewEmail";

type SendMailButtonProps = {
  semesterId: string;
};

const SendMailButton = ({ semesterId }: SendMailButtonProps) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.sendEmail);

  const [qualificationStatus, setQualificationStatus] =
    useState<string>("qualified");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [emailSubject, setEmailSubject] = useState<string>(
    "THÔNG BÁO LẬP NHÓM KHÓA LUẬN"
  );
  const [mainContent, setMainContent] = useState<string>(
    "Sinh viên đủ điều kiện tham gia lập nhóm khóa luận tốt nghiệp."
  );
  const [additionalContent, setAdditionalContent] = useState<string>(
    "Vui lòng đăng nhập vào hệ thống để tiến hành lập nhóm và thực hiện các bước tiếp theo."
  );
  const [emailData, setEmailData] = useState({
    studentName: "",
    studentCode: "",
    major: "",
    specialization: "",
    term: "",
    startDate: "",
    endDate: "",
    deadline: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "emailSubject") setEmailSubject(value);
    else if (name === "mainContent") setMainContent(value);
    else if (name === "additionalContent") setAdditionalContent(value);
    else setEmailData({ ...emailData, [name]: value });
  };

  const generateEmailBody = () => {
    const {
      studentName,
      studentCode,
      major,
      specialization,
      term,
      startDate,
      endDate,
      deadline,
    } = emailData;
    return `
      <div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <h2 style='color: #007BFF; text-align: center;'>${emailSubject}</h2>
        <p><strong>Sinh viên:</strong> ${studentName}</p>
        <p><strong>MSSV:</strong> ${studentCode}</p>
        <p><strong>Ngành:</strong> ${major}</p>
        <p><strong>Chuyên ngành:</strong> ${specialization}</p>
        <p>${mainContent.replace(/\n/g, "<br>")}</p>
        <p>${additionalContent.replace(/\n/g, "<br>")}</p>
        <p><strong>Học kỳ:</strong> ${term}</p>
        <hr style='border: 1px solid #ddd;' />
        <p><strong>Thời gian lập nhóm:</strong> từ ${startDate} đến ${endDate}.</p>
        <p><strong>Hạn cuối để hoàn tất:</strong> ${deadline}</p>
        <p>Trân trọng,<br><strong>Phòng Đào Tạo</strong></p>
      </div>
    `;
  };

  const handleSendEmails = async () => {
    if (!semesterId) {
      toast.error("Không có kỳ học hợp lệ!");
      return;
    }

    try {
      const emailBodyHtml = generateEmailBody();
      await dispatch(
        sendEmails({ semesterId, emailBody: emailBodyHtml })
      ).unwrap();
      toast.success("Gửi email thành công!");
    } catch (err: any) {
      const errorMessage =
        typeof err === "string" ? err : err?.message || "Gửi email thất bại!";
      toast.error(errorMessage);
    } finally {
      dispatch(resetState());
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2">Gửi mail thông báo</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px] p-6 rounded-lg max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Gửi mail thông báo kết quả khóa luận tốt nghiệp
          </DialogTitle>
          <DialogDescription>
            {!showPreview ? (
              <>
                <div className="mb-4">
                  <p className="font-semibold">Chọn loại thông báo:</p>
                  <div className="flex gap-4 mt-2">
                    <QualifiedButton
                      onClick={() => setQualificationStatus("qualified")}
                      isActive={qualificationStatus === "qualified"}
                    />
                    <NotQualifiedButton
                      onClick={() => setQualificationStatus("not qualified")}
                      isActive={qualificationStatus === "not qualified"}
                    />
                    <Button
                      className="bg-blue-600 text-white"
                      onClick={() => setShowPreview(true)}
                    >
                      Preview Email
                    </Button>
                  </div>
                </div>
                {/* Form nhập liệu */}
                <div className="mt-4">
                  <Input
                    placeholder="Tiêu đề email"
                    name="emailSubject"
                    value={emailSubject}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-4">
                  <Textarea
                    placeholder="Nội dung chính (VD: Sinh viên đủ điều kiện tham gia lập nhóm khóa luận...)"
                    name="mainContent"
                    rows={4}
                    value={mainContent}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-4">
                  <Textarea
                    placeholder="Nội dung bổ sung (VD: Vui lòng đăng nhập vào hệ thống...)"
                    name="additionalContent"
                    rows={4}
                    value={additionalContent}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid gap-4 mt-4">
                  {/* <Input
                    placeholder="Tên sinh viên"
                    name="studentName"
                    value={emailData.studentName}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Mã số sinh viên"
                    name="studentCode"
                    value={emailData.studentCode}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Ngành học"
                    name="major"
                    value={emailData.major}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Chuyên ngành"
                    name="specialization"
                    value={emailData.specialization}
                    onChange={handleInputChange}
                  /> */}
                  <Input
                    placeholder="Học kỳ (VD: Spring 2028)"
                    name="term"
                    value={emailData.term}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Ngày bắt đầu (VD: 01/03/2028)"
                    name="startDate"
                    value={emailData.startDate}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Ngày kết thúc (VD: 15/03/2028)"
                    name="endDate"
                    value={emailData.endDate}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Hạn cuối (VD: 15/03/2028)"
                    name="deadline"
                    value={emailData.deadline}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    className="px-4 py-2 bg-green-600 text-white hover:bg-green-700"
                    onClick={handleSendEmails}
                    disabled={loading}
                  >
                    {loading ? "Đang gửi..." : "Gửi"}
                  </Button>
                </div>
              </>
            ) : (
              <PreviewEmail
                content={generateEmailBody()}
                onBack={() => setShowPreview(false)}
              />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SendMailButton;
