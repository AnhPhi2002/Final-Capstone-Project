export type CouncilMember = {
  id: number; // Mã định danh duy nhất của thành viên hội đồng
  email: string; // Email của thành viên
  phoneNumber: string; // Số điện thoại
  lecturerCode: string; // Mã giảng viên
  role: "Chủ tịch" | "Thư ký" | "Thành viên"; // Vai trò trong hội đồng
  status: "Hoạt động" | "Tạm thay thế" | "Vắng mặt"; // Trạng thái của thành viên
  createdAt: string; // Ngày tạo dữ liệu
  updatedAt: string; // Ngày cập nhật dữ liệu
};
