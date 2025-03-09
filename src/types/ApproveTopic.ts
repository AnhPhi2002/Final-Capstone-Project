export type ApproveTopic = {
  id: string;
  groupCode: string;
  topic: { nameEn: string };
  isActive: boolean; // true: Chấp nhận, false: Từ chối
};
