// lib/api/configKeys.ts
export const CONFIG_KEYS = [
    { key: "MAX_GROUP_MEMBERS", label: "Số Thành Viên Tối Đa Trong Nhóm" },
    { key: "MAX_GROUP_MENTORS", label: "Số Giảng Viên Hướng Dẫn Tối Đa Của Nhóm" },
    { key: "MAX_GROUPS_PER_MENTOR", label: "Số Nhóm Tối Đa Mỗi Giảng Viên" },
    { key: "MAX_TOPICS_PER_COUNCIL_SCHEDULE", label: "Số Đề Tài Tối Đa Mỗi Lịch Hội Đồng" },
    { key: "MIN_DEFENSE_MEMBERS", label: "Số Thành Viên Tối Thiểu Hội Đồng Bảo Vệ" },
    { key: "MAX_DEFENSE_MEMBERS", label: "Số Thành Viên Tối Đa Hội Đồng Bảo Vệ" },
    { key: "MIN_DEFENSE_CHAIRMAN", label: "Số Chủ Tịch Tối Thiểu Hội Đồng Bảo Vệ" },
    { key: "MAX_DEFENSE_CHAIRMAN", label: "Số Chủ Tịch Tối Đa Hội Đồng Bảo Vệ" },
    { key: "MIN_DEFENSE_SECRETARY", label: "Số Thư Ký Tối Thiểu Hội Đồng Bảo Vệ" },
    { key: "MAX_DEFENSE_SECRETARY", label: "Số Thư Ký Tối Đa Hội Đồng Bảo Vệ" },
    { key: "MIN_DEFENSE_REVIEWERS", label: "Số Phản Biện Tối Thiểu Hội Đồng Bảo Vệ" },
    { key: "MAX_DEFENSE_REVIEWERS", label: "Số Phản Biện Tối Đa Hội Đồng Bảo Vệ" },
    { key: "MAX_REVIEW_MEMBERS", label: "Số Thành Viên Tối Đa Hội Đồng Kiểm Tra" },
    { key: "MAX_COUNCIL_MEMBERS", label: "Số Thành Viên Tối Đa Hội Đồng" },
    { key: "MAX_COUNCILS_PER_SEMESTER", label: "Số Hội Đồng Tối Đa Mỗi Học Kỳ" },
  ];
  export const getAllConfigKeys = () => CONFIG_KEYS.map((config) => config.key);