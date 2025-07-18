import Header from "@/components/header";
import { TopicGroupRegister } from "./topic-group-register-list";


export const TopicGroupRegisterPage = () => {


  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Đề tài nhóm đăng ký" />
      <div className="p-5 flex-1 overflow-auto">
        <TopicGroupRegister />
      </div>
    </div>
  );
};
