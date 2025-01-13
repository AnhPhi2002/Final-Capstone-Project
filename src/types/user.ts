export type User = {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  role: 
    | "Academic Officer" 
    | "Graduation Thesis Manager" 
    | "Examination Officer" 
    | "Mentors" 
    | "Student" 
    | "Admin";
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
};

// export type User = {
//   id: number;                  // Mã định danh duy nhất của người dùng (PK)
//   username: string;            // Tên đăng nhập (unique)
//   email: string;               // Địa chỉ email (unique)
//   password_hash: string;       // Mật khẩu được mã hóa
//   full_name: string;           // Họ và tên đầy đủ
//   age: string;                 // Tuổi (dạng chuỗi, có thể là "25", "30")
//   address: string;             // Địa chỉ của người dùng
//   avata: string;               // URL ảnh đại diện
//   about: string;               // Giới thiệu ngắn về người dùng
//   gender: string;              // Giới tính (Male, Female, hoặc Other)
//   phone: string;               // Số điện thoại
//   is_active: boolean;          // Trạng thái kích hoạt tài khoản
//   last_login: string | null;   // Thời gian đăng nhập lần cuối (nullable)
//   created_at: string;          // Thời gian tạo người dùng
//   updated_at: string;          // Thời gian cập nhật thông tin người dùng
// };
