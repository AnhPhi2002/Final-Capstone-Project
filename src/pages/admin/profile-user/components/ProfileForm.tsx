import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  id?: string;
  email?: string;
  username?: string;
  avatar?: string | null;
  gender?: string | null;
  phone?: string | null;
  personal_Email?: string | null;
  profession?: string | null;
  specialty?: string | null;
  programming_language?: string | null;
  updatedAt?: string;
}

interface ProfileFormProps {
  user: UserProfile;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
      {/* Avatar + Thông tin liên hệ */}
      <div className="bg-white rounded-lg p-6 border shadow-sm">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage
              src={user.avatar || "https://avatar.iran.liara.run/public/boy?username=FAMS"}
              alt="Avatar"
            />
            <AvatarFallback>
              {user.username ? user.username.charAt(0).toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-lg font-semibold mt-6">Thông tin liên hệ</h2>
        <div className="mt-4 space-y-2">
          <p><strong>Số điện thoại: </strong> {user.phone || "Chưa cập nhật"}</p>
          <p><strong>Email: </strong> {user.email || "Chưa cập nhật"}</p>
          <p><strong>Email cá nhân: </strong> {user.personal_Email || "Chưa cập nhật"}</p>
        </div>
      </div>

      {/* Thông tin cơ bản */}
      <div className="bg-white rounded-lg p-6 border shadow-sm">
        <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>
        <div className="mt-4 space-y-2">
          <p><strong>Họ và tên: </strong> {user.username || "Chưa cập nhật"}</p>
          <p><strong>Giới tính: </strong> {user.gender || "Chưa cập nhật"}</p>
          <p><strong>Chuyên ngành hẹp: </strong> {user.profession || "Chưa cập nhật"}</p>
          <p><strong>Chuyên môn: </strong> {user.specialty || "Chưa cập nhật"}</p>
          <p><strong>Kỹ năng: </strong> {user.programming_language || "Chưa cập nhật"}</p>
        </div>
      </div>

      {/* Thông tin bổ sung */}
      <div className="bg-white rounded-lg p-6 border shadow-sm col-span-2">
        <h2 className="text-lg font-semibold">Thông tin bổ sung</h2>
        <div className="mt-4 space-y-2">
          <p><strong>Cập nhật lần cuối: </strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "Chưa cập nhật"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
