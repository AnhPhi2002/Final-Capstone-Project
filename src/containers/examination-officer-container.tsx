import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { DeadineTopicDetailPage } from "@/pages/admin/deadline-topic/columns/deadine-topic-detail-page";
import { DeadineTopicPage } from "@/pages/admin/deadline-topic/deadine-topic-page";
import { ProfilePage } from "@/pages/admin/profile-user/page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";

export const ExaminationOfficerContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.roles.find((role) => role.name === "examination_officer")) {
      navigate("/access-denied");
    }
  }, []);
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="deadline-topic" element={<DeadineTopicPage />} />
        <Route path="deadline-topic/:semesterId" element={<DeadineTopicDetailPage />} />
        <Route path="deadline-topic/:semesterId/submission/:submissionId" element={<DeadineTopicDetailPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
