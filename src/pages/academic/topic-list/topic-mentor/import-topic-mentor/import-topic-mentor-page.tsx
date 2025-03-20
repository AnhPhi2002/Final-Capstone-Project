import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Header from "@/components/header"
import { ImportTopicMentorTab } from "./import-topic-mentor-tab";

export const ImportTopicMentorPage = () => {
  const [currentPage, setCurrentPage] = useState("Import đề tài ");

  const handleTabChange = (value: string) => {
    switch (value) {
      case "all":
        setCurrentPage("Import đề tài ");
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
          <TabsTrigger value="all">Import đề tài 
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
         <ImportTopicMentorTab />
        </TabsContent>

      </Tabs>
    </div>
  );
};