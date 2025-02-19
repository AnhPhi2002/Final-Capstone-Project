import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // Import useNavigate
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaginationDashboardPage } from "../../pagination";

// Hàm rút gọn mô tả với giới hạn ký tự
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// Dữ liệu mẫu
const mockData = [
  {
    id: 1,
    name: "AI-Powered Chatbots for Customer Support",
    date: "10/01/2024",
    createdBy: "Admin",
    description:
      "Develop an AI-driven chatbot to improve customer service efficiency. The project focuses on NLP models to enhance user experience in automated responses and real-time support.",
  },
  {
    id: 2,
    name: "Blockchain-Based Voting System",
    date: "15/02/2024",
    createdBy: "John Doe",
    description:
      "Implement a secure, transparent voting system using blockchain technology. The system will ensure fairness, immutability, and eliminate fraud in online elections.",
  },
  {
    id: 3,
    name: "Real-Time Traffic Management System",
    date: "20/03/2024",
    createdBy: "Jane Smith",
    description:
      "Design a smart traffic management system that uses real-time data from IoT sensors to reduce congestion and optimize road usage efficiently.",
  },
];

export const TopicList = () => {
  const itemsPerPage = 3;
  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState<typeof mockData>([]);
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVisibleItems(mockData.slice(startIndex, endIndex));
  }, [currentPage]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex flex-1 flex-col gap-4">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/topic-detail/${item.id}`)} // Khi click, chuyển trang
            className="min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6 cursor-pointer hover:bg-muted transition-all"
          >
            {/* Avatar */}
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={`https://robohash.org/${encodeURIComponent(item.name)}.png?size=100x100`}
                alt={item.name}
              />
              <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* Nội dung */}
            <div className="flex-1 py-3">
              <h4 className="font-semibold text-lg text-primary">
                <span className="text-blue-500 font-medium">Topic:</span>{" "}
                {item.name}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {truncateText(item.description, 120)}
              </p>

              {/* Ngày tạo & Người tạo */}
              <div className="mt-2 text-xs text-muted-foreground">
                <p>
                   Ngày tạo: <span className="font-medium">{item.date}</span>
                </p>
                <p>
                   Được tạo bởi:{" "}
                  <span className="font-medium">{item.createdBy}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6">
        <PaginationDashboardPage
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
