import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import { CouncilMemberDetail } from "@/pages/admin/council-member/council-member-listing/council-member-detail";
import CouncilMemberPage from "@/pages/admin/council-member/council-member-page";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { ProfilePage } from "@/pages/admin/profile-user/page";
import { CouncilMembersPage } from "@/pages/examination-officer/review-topic-council/columns-member/CouncilMembersPage";
import { ReviewTopicCouncilDetail } from "@/pages/examination-officer/review-topic-council/columns/review-topic-council-detail";
import { ReviewTopicCouncilPage } from "@/pages/examination-officer/review-topic-council/review-topic-council-page";
import { ReviewTopicListPage } from "@/pages/examination-officer/topic-review/review-topic-list-page";
import { ReviewTopicPage } from "@/pages/examination-officer/topic-review/review-topic-page";
import { ReviewTopicDetailPage } from "@/pages/examination-officer/topic-review/topic-detail/topic-detail-page";
import UpdateReviewTopicDetail from "@/pages/examination-officer/topic-review/topic-detail/update-topic-detail";
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

        <Route path="/review-topic-detail/:topicId/:semesterId/update" element={<UpdateReviewTopicDetail />} /> 

        <Route path="/review-topic-page" element={<ReviewTopicPage />} />
        <Route path="/review-topic-page/:semesterId" element={<ReviewTopicPage />} />
        <Route path="/review-topic-list" element={<ReviewTopicListPage />} />
        <Route path="/review-topic-list/:semesterId/submission/:submissionPeriodId" element={<ReviewTopicListPage />} />
        <Route path="/review-topic-detail/:topicId/:semesterId" element={<ReviewTopicDetailPage />} />
        
        <Route path="/council-member" element={<CouncilMemberPage />} />
        <Route path="/council-member/:councilId" element={<CouncilMemberDetail />} />

        <Route path="review-topic-council" element={<ReviewTopicCouncilPage />} />
        <Route path="/review-topic-council-detail/:councilId" element={<ReviewTopicCouncilDetail />} />
        <Route path="/review-topic-council-member/:councilId" element={<CouncilMembersPage />} />         
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
