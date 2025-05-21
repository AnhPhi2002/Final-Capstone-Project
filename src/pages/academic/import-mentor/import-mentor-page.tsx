import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ImportStudentEligibleTab from "./import-student-eligible-page";
import ImportMentorTab from "./import-mentor-tab";
import Header from "@/components/header";
// import ImportRoleMentor from "./import-role-mentor";

const ImportMentorPage = () => {
  const [currentPage, setCurrentPage] = useState("Import danh sách giảng viên");

  const handleTabChange = (value: string) => {
    switch (value) {
      case "all":
        setCurrentPage("Import danh sách giảng viên");
        break;
      // case "eligible":
      //   setCurrentPage("Import role gv");
        break;
      default:
        setCurrentPage("Import");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage={currentPage} />
      <Tabs defaultValue="all" onValueChange={handleTabChange} className="">
        <TabsList className="flex gap-5 justify-start">
          <TabsTrigger value="all">Import danh sách giảng viên trong kỳ</TabsTrigger>
          {/* <TabsTrigger value="eligible">
          Import role GV trong kỳ
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="all">
          <ImportMentorTab />
        </TabsContent>
        {/* <TabsContent value="w3">
            <ImportRoleMentor/>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default ImportMentorPage;
