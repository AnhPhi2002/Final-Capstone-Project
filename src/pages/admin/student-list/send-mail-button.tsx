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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SendMailButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Gửi mail thông báo</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            Gửi mail thông báo kết quả đủ điều kiện khóa luận tốt nghiệp cho
            sinh viên
          </DialogTitle>
          <DialogDescription>
            <Tabs defaultValue="account" className="">
              <TabsList>
                <TabsTrigger value="account">
                  Gửi cho tất cả sinh viên trong 1 kìkì
                </TabsTrigger>
                <TabsTrigger value="password">
                  Gửi cho từng sinh viên cụ thể
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">SPRING2025</SelectItem>
                    <SelectItem value="dark">FALL2024</SelectItem>
                    <SelectItem value="system">SUMMER2024</SelectItem>
                  </SelectContent>
                </Select>

                <Button>Gửi</Button>
              </TabsContent>
              <TabsContent value="password">
                <div className="flex gap-2">
                  <Input placeholder="Nhap mail sinh vien"></Input>
                  <Button>+</Button>
                </div>
                <div className="flex gap-2">
                  <p>phi@fpt.edu.vn</p>
                  <button className="text-red-500">X</button>
                </div>
                <div className="flex gap-2">
                  <p>phi@fpt.edu.vn</p>
                  <button className="text-red-500">X</button>
                </div>
                <div className="flex gap-2">
                  <p>phi1@fpt.edu.vn</p>
                  <button className="text-red-500">X</button>
                </div>
                <div className="flex gap-2">
                  <p>phi2@fpt.edu.vn</p>
                  <button className="text-red-500">X</button>
                </div>
                <Button>Gửi</Button>
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SendMailButton;
