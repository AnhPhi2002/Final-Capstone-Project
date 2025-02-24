import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

import Header from "@/components/header";
import { Label } from "@/components/ui/label";

export default function ProfileUpdateForm() {
  return (
    <div>
      <Header
        title="Semesters"
        href="/"
        currentPage="Cập nhật thông tin cá nhân"
      />
      <div className="container mx-auto p-6 mt-10">
        <Card className="p-6">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 ">
                <div>
                  <Label className="block text-sm font-medium mb-1">Email</Label>
                  <Input
                    placeholder="phinhase161377@fpt.edu.vn"
                    defaultValue="phinhase161377@fpt.edu.vn"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Phone Number</Label>
                  <Input placeholder="0123456789" defaultValue="0123456789" />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Facebook</Label>
                  <Input
                    type="url"
                    placeholder="Enter Facebook URL"
                    defaultValue="https://www.facebook.com/yourprofile"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium mb-1">Full Name</Label>
                  <Input
                    placeholder="Nguyen Hoang Anh Phi"
                    defaultValue="Nguyen Hoang Anh Phi"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Gender</Label>
                  <Select defaultValue="male">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Roll Number</Label>
                  <Input placeholder="SE161377" defaultValue="SE161377" />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Semester</Label>
                  <Input placeholder="SPRING 2025" defaultValue="SPRING 2025" />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Profession</Label>
                  <Input
                    placeholder="Information Technology"
                    defaultValue="Information Technology"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Specialty</Label>
                  <Input
                    placeholder="Software Engineering"
                    defaultValue="Software Engineering"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Expect Role</Label>
                  <Select defaultValue="Fullstack">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BE">Backend</SelectItem>
                      <SelectItem value="FE">Frontend</SelectItem>
                      <SelectItem value="Fullstack">Fullstack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-5">
            <Button>Cập Nhật</Button>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
