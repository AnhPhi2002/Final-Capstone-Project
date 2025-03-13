import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";

import { ProfilePage } from "@/pages/admin/profile-user/page";
import { TopicDetailPage } from "@/pages/admin/topic-list/topic-mentor/topic-detail/topic-detail-page";
import UpdateTopicDetail from "@/pages/admin/topic-list/topic-mentor/topic-detail/update-topic-detail";
import { TopicListPage } from "@/pages/admin/topic-list/topic-mentor/topic-list-page";
import { TopicPage } from "@/pages/admin/topic-list/topic-mentor/topic-page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";

export const LecturerContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.roles.find((role) => role.name === "lecturer")) {
      navigate("/access-denied");
    }
  }, []);
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/topic" element={<TopicPage />} />
        <Route path="/topic/:semesterId" element={<TopicPage />} />
        <Route path="/topic-list" element={<TopicListPage />} />
        <Route
          path="/topic-list/:semesterId/submission/:submissionPeriodId"
          element={<TopicListPage />}
        />
        <Route path="/topic-detail/:topicId" element={<TopicDetailPage />} />
        <Route
          path="/topic-detail/:topicId/update"
          element={<UpdateTopicDetail />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
