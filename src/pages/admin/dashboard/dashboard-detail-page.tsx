// src/pages/academic/DashboardDetailPage.tsx
import Header from "@/components/header";
import StatisticsOverview from "./StatisticsOverview";

export const DashboardDetailPage = () => {
  return (
    <div>
      <Header title="Tổng quan" href="/" currentPage="Dashboard" />
      <div className="p-5">
        <StatisticsOverview />
      </div>
    </div>
  );
};

export default DashboardDetailPage;