
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Header from "@/components/header";

export default function ProfileUpdateForm() {

  return (
    <div>
      <Header
        title="Semesters"
        href="/"
        currentPage="Cập nhật thông tin cá nhân  "
      />
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Side */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input
                placeholder="phinhase161377@fpt.edu.vn"
                defaultValue="phinhase161377@fpt.edu.vn"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <Input placeholder="0123456789" defaultValue="0123456789" />
            </div>
            <div>
              <label className="block text-sm font-medium">Facebook</label>
              <Input
                type="url"
                placeholder="Enter Facebook URL"
                defaultValue="https://www.facebook.com/yourprofile"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <Input
                placeholder="Nguyen Hoang Anh Phi"
                defaultValue="Nguyen Hoang Anh Phi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
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
              <label className="block text-sm font-medium">Roll Number</label>
              <Input placeholder="SE161377" defaultValue="SE161377" />
            </div>
            <div>
              <label className="block text-sm font-medium">Semester</label>
              <Input placeholder="SPRING 2025" defaultValue="SPRING 2025" />
            </div>
            <div>
              <label className="block text-sm font-medium">Profession</label>
              <Input
                placeholder="Information Technology"
                defaultValue="Information Technology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Specialty</label>
              <Input
                placeholder="Software Engineering"
                defaultValue="Software Engineering"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Expect Role</label>
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

        {/* Be Grouped */}
        {/* <div className="mt-6">
          <h2 className="text-red-500 font-semibold">Be Grouped</h2>
          <p>Do you want to be grouped in a random group?</p>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="group" value="yes" className="accent-purple-700" /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="group" value="no" defaultChecked className="accent-purple-700" /> No
            </label>
          </div>
        </div> */}

        {/* Update Button */}
        <div className="mt-6">
          <Button className="w-full">Update Profile</Button>
        </div>
      </div>
    </div>
  );
}
