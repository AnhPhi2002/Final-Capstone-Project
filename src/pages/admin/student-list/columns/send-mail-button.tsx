import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { sendEmails, resetState } from "@/lib/api/redux/sendEmailSlice";
import { fetchEmailTemplates } from "@/lib/api/redux/emailTemplateSlice";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

type SendMailButtonProps = {
  semesterId: string;
};

const SendMailButton = ({ semesterId }: SendMailButtonProps) => {
  const dispatch = useAppDispatch();
  const { templates, loading: loadingTemplates } = useAppSelector(
    (state) => state.emailTemplates
  ) || { templates: [], loading: false };

  const { loading } = useAppSelector((state) => state.sendEmail);

  // const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [emailType, setEmailType] = useState<string | null>(null);
  const [qualificationStatus, setQualificationStatus] = useState<string>("qualified");
  const navigate = useNavigate();

  useEffect(() => {
    if (templates.length === 0) {
      dispatch(fetchEmailTemplates());
    }
  }, [dispatch, templates.length]);

  // Khi chọn template, chỉ lấy `name` làm `emailType`
  const handleTemplateChange = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setEmailType(template.name);
    }
  };
  

  const handleSendEmails = async () => {
    if (!emailType) {
      toast.error("Vui lòng chọn template email!");
      return;
    }

    if (!semesterId) {
      toast.error("Không có semesterId hợp lệ!");
      return;
    }

    try {
      await dispatch(
        sendEmails({
          semesterId,
          qualificationStatus,
          emailType,
        })
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
            Gửi mail thông báo
          </DialogTitle>
          <DialogDescription>
            <div className="mb-4">
              <p className="font-semibold">Chọn loại thông báo:</p>
              <div className="flex gap-4 mt-2">
                <Button
                  variant={qualificationStatus === "qualified" ? "default" : "outline"}
                  onClick={() => setQualificationStatus("qualified")}
                >
                  Đủ điều kiện
                </Button>
                <Button
                  variant={qualificationStatus === "not qualified" ? "default" : "outline"}
                  onClick={() => setQualificationStatus("not qualified")}
                >
                  Không đủ điều kiện
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Chọn mẫu email:</p>
              <Button variant="outline" onClick={() => navigate("/template-detail")}>
                Quản lý Templates
              </Button>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Chọn mẫu email:</p>
              <Select onValueChange={handleTemplateChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn mẫu email" />
                </SelectTrigger>
                <SelectContent>
                  {loadingTemplates ? (
                    <SelectItem value="" disabled>Đang tải...</SelectItem>
                  ) : (
                    templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name} - {template.description}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SendMailButton;
