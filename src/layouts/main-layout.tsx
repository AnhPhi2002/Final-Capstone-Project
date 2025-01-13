import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {children}
          {/* <div className="p-5 bg-red-600"></div> */}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
