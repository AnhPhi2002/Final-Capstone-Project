import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import data from "@/data/students.json";
import { Link } from "react-router";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import SendMailButton from "./send-mail-button";
const StudentListPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="border flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={"/"}>Tổng quanquan</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Danh sách sinh viên</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
      </header>
      <div className="p-5 flex justify-between">
        <div>
          <Input></Input>
        </div>
        <div className="flex justify-end gap-3">
          <SendMailButton />
          <Link to={"/import-student"}>
            <Button>Import</Button>
          </Link>
          <Button>Xuất file</Button>
        </div>
      </div>

      <div className="px-5 flex-1 overflow-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default StudentListPage;
