import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchMajors } from "@/lib/api/redux/majorSlice";
import { updateTopic } from "@/lib/api/redux/topicSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type UpdateTopicProps = {
  topicId: string;
};

export const UpdateTopic: React.FC<UpdateTopicProps> = ({ topicId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { topicDetails, loading } = useSelector((state: RootState) => state.topics);
  const { data: majors, loading: majorsLoading } = useSelector((state: RootState) => state.majors);

  const [open, setOpen] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>();
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [businessPartner, setBusinessPartner] = useState<string>("");

  useEffect(() => {
    dispatch(fetchMajors());
  }, [dispatch]);

  useEffect(() => {
    if (topicDetails && topicDetails.id === topicId) {
      setTopicName(topicDetails.name);
      setTopicDescription(topicDetails.description);
      setIsBusiness(topicDetails.isBusiness);
      setBusinessPartner(topicDetails.businessPartner || "");
      setSelectedMajor(topicDetails.detailMajorTopics[0]?.major.id);
    }
  }, [topicDetails, topicId]);

  const handleUpdateTopic = async () => {
    if (!topicName || !topicDescription || !selectedMajor) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      await dispatch(
        updateTopic({
          topicId,
          updatedData: {
            name: topicName,
            description: topicDescription,
            isBusiness,
            businessPartner: isBusiness ? businessPartner : "",
            majors: [selectedMajor],
            status: "ACTIVE",
          },
        })
      ).unwrap();

      toast.success("Đề tài đã được cập nhật thành công!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.message || "Cập nhật đề tài thất bại!");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Cập nhật</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cập nhật Đề Tài</AlertDialogTitle>
          <AlertDialogDescription>Vui lòng chỉnh sửa thông tin đề tài.</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Tên đề tài</label>
            <Input value={topicName} onChange={(e) => setTopicName(e.target.value)} placeholder="Nhập tên đề tài" />
          </div>

          <div>
            <label className="block text-sm font-medium">Mô tả</label>
            <Input value={topicDescription} onChange={(e) => setTopicDescription(e.target.value)} placeholder="Nhập mô tả đề tài" />
          </div>

          <div>
            <label className="block text-sm font-medium">Kỳ học</label>
            <Input value={topicDetails?.semester.code || "Đang tải..."} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium">Ngành học</label>
            <Select onValueChange={setSelectedMajor} value={selectedMajor}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn ngành học" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {majorsLoading ? (
                    <SelectItem value="loading" disabled>Đang tải...</SelectItem>
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
          </div>

          {/* Công tắc chọn Business Project */}
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={isBusiness} onChange={() => setIsBusiness(!isBusiness)} />
            <label className="text-sm font-medium">Là đề tài doanh nghiệp?</label>
          </div>

          {isBusiness && (
            <div>
              <label className="block text-sm font-medium">Doanh nghiệp</label>
              <Input value={businessPartner} onChange={(e) => setBusinessPartner(e.target.value)} placeholder="Nhập tên doanh nghiệp" />
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleUpdateTopic} disabled={loading}>
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
