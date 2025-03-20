import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/header";

export default function TopicEnterpriseDetail() {
  return (
    <div>
      <Header title="Tổng quan" href="/" currentPage="Danh sách sinh viên " />
      <div className="p-6 bg-white ">

        <Card className="p-6">

          {/* Thông tin chung */}
          <div className="flex items-center mt-4 gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Group Avatar"
              />
              <AvatarFallback>G</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Final Capstone Project Register and Information Management
                System For FPTU HCM
              </h3>
              <p className="text-sm text-gray-500 italic">
                Created at: 02/01/2025
              </p>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Abbreviations */}
              <div>
                <p className="text-sm text-gray-500">Abbreviations</p>
                <p className="font-semibold italic">FPTU HCM FCPRIMS</p>
              </div>

              {/* Vietnamese Title */}
              <div>
                <p className="text-sm text-gray-500">Vietnamese Title</p>
                <p className="font-semibold italic">
                  Xây dựng ứng dụng đăng kí và quản lí thông tin liên quan đến
                  khóa luận tốt nghiệp của trường đại học FPT cơ sở HCM
                </p>
              </div>

              {/* Profession */}
              <div>
                <p className="text-sm text-gray-500">Profession</p>
                <p className="font-semibold italic">Information Technology</p>
              </div>

              {/* Specialty */}
              <div>
                <p className="text-sm text-gray-500">Specialty</p>
                <p className="font-semibold italic">Software Engineering</p>
              </div>
            </div>

            {/* Mô tả dự án */}
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="italic text-gray-800">
                Build a web application to manage the registration and tracking
                information of the graduation thesis process for students at FPT
                University, HCMC campus. All stages described in the context
                section must be recorded and statistical reports provided to the
                relevant stakeholders involved. This system is applied to IT
                majors such as SE, ITS, JA, AI and internal users are students,
                staff, ...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
