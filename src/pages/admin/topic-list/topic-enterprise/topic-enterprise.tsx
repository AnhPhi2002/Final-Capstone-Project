import { useState, useEffect } from "react";
import Header from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaginationDashboardPage } from "../../pagination";

// Hàm rút gọn mô tả với giới hạn ký tự
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
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
  {
    id: 4,
    name: "Automated Cybersecurity Threat Detection",
    date: "05/04/2024",
    createdBy: "David Clark",
    description:
      "Build an AI-powered system that detects and mitigates cybersecurity threats in real time, ensuring data security for businesses and government entities.",
  },
  {
    id: 5,
    name: "Personalized E-Learning Platform",
    date: "12/05/2024",
    createdBy: "Emma Watson",
    description:
      "Develop an adaptive e-learning platform that customizes course content based on user preferences and learning speed, improving knowledge retention.",
  },
  {
    id: 6,
    name: "Smart Home Automation Using IoT",
    date: "18/06/2024",
    createdBy: "Admin",
    description:
      "Create a smart home automation system that integrates IoT devices for controlling lighting, security, and energy consumption via a mobile app.",
  },
  {
    id: 7,
    name: "AI-Based Resume Screening System",
    date: "22/07/2024",
    createdBy: "John Doe",
    description:
      "Develop an AI-driven system that screens job applications based on predefined criteria, improving hiring efficiency and reducing human bias.",
  },
  {
    id: 8,
    name: "Predictive Maintenance for Manufacturing",
    date: "30/08/2024",
    createdBy: "Jane Smith",
    description:
      "Utilize machine learning algorithms to predict equipment failures in manufacturing plants, minimizing downtime and reducing maintenance costs.",
  },
  {
    id: 9,
    name: "AI-Powered Health Diagnosis System",
    date: "10/09/2024",
    createdBy: "David Clark",
    description:
      "Develop an AI system that analyzes medical data to provide early disease detection and diagnostic insights, assisting doctors in decision-making.",
  },
  {
    id: 10,
    name: "Decentralized Cloud Storage",
    date: "25/10/2024",
    createdBy: "Emma Watson",
    description:
      "Design a decentralized cloud storage solution using blockchain technology to enhance data security, privacy, and reduce dependency on centralized servers.",
  },
];


export const TopicEnterprise = () => {
    const itemsPerPage = 5;
    const totalPages = Math.ceil(mockData.length / itemsPerPage);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleItems, setVisibleItems] = useState<typeof mockData>([]);
  
    useEffect(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setVisibleItems(mockData.slice(startIndex, endIndex));
    }, [currentPage, mockData]);
  return (
    <div>

    <div className="bg-background text-foreground min-h-screen">
      <div className="flex flex-1 flex-col gap-4">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6"
          >
            {/* Avatar */}
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={`https://robohash.org/${encodeURIComponent(
                  item.name
                )}.png?size=100x100`}
                alt={item.name}
              />
              <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 py-3">
              <h4 className="font-semibold text-lg text-primary">
                <span className="text-blue-500 font-medium">Topic:</span>{" "}
                {item.name}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {truncateText(item.description, 320)}
              </p>

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
    </div>

    <div className="flex justify-end ">
      <PaginationDashboardPage
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  </div>
);
};
