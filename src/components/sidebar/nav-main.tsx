import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router"; // Dùng để điều hướng
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation(); // Lấy URL hiện tại
  const navigate = useNavigate(); // Điều hướng không cần reload trang
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Kiểm soát trạng thái loading

  // Khi click vào nhóm cha, mở/đóng nhóm đó
  const handleToggleGroup = (groupTitle: string) => {
    setExpandedGroup((prev) => (prev === groupTitle ? null : groupTitle));
  };

  // Khi click vào mục con, điều hướng và bỏ hiệu ứng loading
  const handleNavigate = (url: string, parentTitle: string) => {
    setIsLoading(true); // Bật loading
    setExpandedGroup(parentTitle); // Giữ nhóm cha mở
    navigate(url); // Điều hướng

    // Sau khi điều hướng xong, tắt loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // Giả lập thời gian loading
  };

  // Giữ nhóm cha mở nếu một mục con của nó đang active
  useEffect(() => {
    const activeGroup = items.find((item) =>
      item.items?.some((subItem) => subItem.url === location.pathname)
    );
    if (activeGroup) {
      setExpandedGroup(activeGroup.title);
    }
  }, [location.pathname, items]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Quản lí</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            open={expandedGroup === item.title} // Chỉ mở nhóm chính hiện tại
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => handleToggleGroup(item.title)} // Click vào nhóm để mở/đóng
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight
                    className={`ml-auto transition-transform duration-200 ${
                      expandedGroup === item.title ? "rotate-90" : ""
                    }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <button
                          onClick={() => handleNavigate(subItem.url, item.title)}
                          disabled={isLoading} // Vô hiệu hóa nếu đang loading
                          className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
                        >
                          <span>{subItem.title}</span>
                        </button>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
