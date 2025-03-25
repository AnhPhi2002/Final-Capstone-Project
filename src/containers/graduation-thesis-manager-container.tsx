import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";

import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import ProfileUpdateForm from "@/pages/admin/profile-user/components/profile-update";

import { ProfilePage } from "@/pages/admin/profile-user/page";
import { DeadineTopicDetailPage } from "@/pages/examination-officer/deadline-topic/columns/deadine-topic-detail-page";
import { ReviewTopicCouncilDetail } from "@/pages/examination-officer/review-topic-council/columns/review-topic-council-detail";
import { ReviewTopicCouncilPage } from "@/pages/examination-officer/review-topic-council/review-topic-council-page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";

export const GraduationThesisManagerContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.roles.find((role) => role.name === "graduation_thesis_manager")) {
      navigate("/access-denied");
    }
  }, []);
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
                <Route path="/profile-page" element={<ProfilePage />} />
                <Route path="/profile-page/update" element={<ProfileUpdateForm />} />
        <Route path="deadline-topic/:semesterId" element={<DeadineTopicDetailPage />}/>
        <Route path="deadline-topic/:semesterId/submission/:submissionId"element={<DeadineTopicDetailPage />}/>
        <Route path="review-topic-council" element={<ReviewTopicCouncilPage />}/>
        <Route path="/review-topic-council-detail/:councilId" element={<ReviewTopicCouncilDetail />}/>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
