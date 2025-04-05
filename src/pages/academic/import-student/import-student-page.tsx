import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImportStudentEligibleTab from "./import-student-eligible-page";
import ImportStudentTab from "./import-student-tab";
import Header from "@/components/header";
import ImportStudentEligibleBlock3Tab from "./import-student-eligible-block3";

const ImportStudentPage = () => {
  const [currentPage, setCurrentPage] = useState("Import danh sách sinh viên");

  const handleTabChange = (value: string) => {
    switch (value) {
      case "all":
        setCurrentPage("Import danh sách sinh viên");
        break;
      case "eligible":
        setCurrentPage("Import danh sách đủ điều kiện");
        break;
      case "w3":
        setCurrentPage("Import danh sách Block 3W");
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
          <TabsTrigger value="all">Import danh sách sinh viên</TabsTrigger>
          <TabsTrigger value="eligible">
            Import danh sách đủ điều kiện thực hiện KLTN
          </TabsTrigger>
          <TabsTrigger value="w3">Import danh sách Block 3W</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ImportStudentTab />
        </TabsContent>
        <TabsContent value="eligible">
          <ImportStudentEligibleTab />
        </TabsContent>
        <TabsContent value="w3">
          <ImportStudentEligibleBlock3Tab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportStudentPage;
