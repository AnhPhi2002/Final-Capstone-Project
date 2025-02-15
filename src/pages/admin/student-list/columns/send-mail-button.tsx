import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { sendEmails, resetState } from "@/lib/api/redux/sendEmailSlice";
import { toast } from "sonner";
import { useState } from "react"; // Thêm useState để quản lý trạng thái lựa chọn

type SendMailButtonProps = {
  semesterId: string;
};

const SendMailButton = ({ semesterId }: SendMailButtonProps) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.sendEmail);
  const [qualificationStatus, setQualificationStatus] = useState<string>("qualified"); // Mặc định là "qualified"

  const handleSendEmails = async () => {
    if (!semesterId) {
      toast.error("Không có kỳ học hợp lệ!");
      return;
    }

    try {
      await dispatch(sendEmails({ semesterId, qualificationStatus })).unwrap();
      toast.success(`Gửi email thành công cho sinh viên ${qualificationStatus}!`);
    } catch (err: any) {
      const errorMessage = typeof err === "string" ? err : err?.message || "Gửi email thất bại!";
      toast.error(errorMessage);
    } finally {
      dispatch(resetState());
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-4 py-2">Gửi mail thông báo</Button>
        </DialogTrigger>
        <DialogContent className="min-w-[700px] p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Gửi mail thông báo kết quả khóa luận tốt nghiệp
            </DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="account" className="mt-4">
                <TabsList className="flex gap-4 border-b pb-2">
                  <TabsTrigger value="account" className="px-4 py-2">
                    Gửi mail
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-6">
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
                  <div className="flex justify-end mt-6">
                    <Button
                      className="px-4 py-2 bg-green-600 text-white hover:bg-green-700"
                      onClick={handleSendEmails}
                      disabled={loading}
                    >
                      {loading ? "Đang gửi..." : "Gửi"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SendMailButton;
