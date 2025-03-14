import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import { CouncilMemberDetail } from "@/pages/admin/council-member/council-member-listing/council-member-detail";
import CouncilMemberPage from "@/pages/admin/council-member/council-member-page";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { DeadineTopicDetailPage } from "@/pages/admin/deadline-topic/columns/deadine-topic-detail-page";
import { DeadineTopicPage } from "@/pages/admin/deadline-topic/deadine-topic-page";
import { ProfilePage } from "@/pages/admin/profile-user/page";
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
        <Route path="deadline-topic" element={<DeadineTopicPage />} />
        <Route
          path="deadline-topic/:semesterId"
          element={<DeadineTopicDetailPage />}
        />
        <Route
          path="deadline-topic/:semesterId/submission/:submissionId"
          element={<DeadineTopicDetailPage />}
        />

        <Route
          path="review-topic-council"
          element={<ReviewTopicCouncilPage />}
        />
        <Route
          path="/review-topic-council-detail/:councilId"
          element={<ReviewTopicCouncilDetail />}
        />
             <Route path="/council-member" element={<CouncilMemberPage />} />
             <Route path="/council-member/:councilId" element={<CouncilMemberDetail />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
