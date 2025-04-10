import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";

import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import ProfileUpdateForm from "@/pages/admin/profile-user/components/profile-update";

import { ProfilePage } from "@/pages/admin/profile-user/page";
import { CouncilDefenseGroupsPage } from "@/pages/thesisManager/council-defense/columns-detail/CouncilGroupsPage";
import { CouncilDefenseMembersPage } from "@/pages/thesisManager/council-defense/columns-member/CouncilMembersPage";
import { CouncilDefenseDetail } from "@/pages/thesisManager/council-defense/columns/council-defense-detail";
import { CouncilDefensePage } from "@/pages/thesisManager/council-defense/council-defense-page";
import { CouncilReviewGroupsPage } from "@/pages/thesisManager/council-review-123/columns-detail/CouncilGroupsPage";
import { CouncilReviewMembersPage } from "@/pages/thesisManager/council-review-123/columns-member/CouncilMembersPage";
import { CouncilReviewDetail } from "@/pages/thesisManager/council-review-123/columns/council-review123-detail";
import { CouncilReviewPage } from "@/pages/thesisManager/council-review-123/council-review123-page";
import { DeadineTopicDetailPage } from "@/pages/thesisManager/deadline-topic/columns/deadine-topic-detail-page";
import { DeadineTopicPage } from "@/pages/thesisManager/deadline-topic/deadine-topic-page";
import TemplateDetail from "@/pages/thesisManager/templates-mail/TemplateDetail";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";

export const GraduationThesisManagerContainer = () => {
  // const user = useSelector((state: RootState) => state.auth.user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user?.roles.find((role) => role.name === "graduation_thesis_manager")) {
  //     navigate("/access-denied");
  //   }
  // }, []);
  const user = useSelector((state: RootState) => state.auth.user);
  const currentRole = useSelector((state: RootState) => state.auth.currentRole);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && currentRole !== "graduation_thesis_manager") {
      navigate("/access-denied");
    }
  }, [user, currentRole, navigate]);

  if (!user) return <p>Đang tải...</p>;
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/profile-page/update" element={<ProfileUpdateForm />} />
        {/* <Route path="deadline-topic/:semesterId" element={<DeadineTopicDetailPage />}/>
        <Route path="deadline-topic/:semesterId/submission/:submissionId"element={<DeadineTopicDetailPage />}/>
        <Route path="review-topic-council" element={<ReviewTopicCouncilPage />}/>
        <Route path="/review-topic-council-detail/:councilId" element={<ReviewTopicCouncilDetail />}/> */}

        <Route path="/template-detail" element={<TemplateDetail />} />


        <Route path="/deadline-topic" element={<DeadineTopicPage />} />
        <Route path="/deadline-topic/:semesterId" element={<DeadineTopicDetailPage />} />
        <Route path="/deadline-topic/:semesterId/submission/:submissionId" element={<DeadineTopicDetailPage />} />

        <Route path="/council-review" element={<CouncilReviewPage />} />
        <Route path="/council-review/:councilId/:semesterId" element={<CouncilReviewDetail />} />
        <Route path="/council-review-member/:councilId/:semesterId" element={<CouncilReviewMembersPage />} />
        <Route path="/council-review-group/:councilId/:semesterId" element={<CouncilReviewGroupsPage />} />

        <Route path="/council-defense" element={<CouncilDefensePage />} />
        <Route path="/council-defense/:councilId/:semesterId" element={<CouncilDefenseDetail />} />
        <Route path="/council-defense-member/:councilId/:semesterId" element={<CouncilDefenseMembersPage />} />
        <Route path="/council-defense-group/:councilId/:semesterId" element={<CouncilDefenseGroupsPage />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
