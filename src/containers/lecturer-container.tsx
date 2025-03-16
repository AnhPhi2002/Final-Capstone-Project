import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { GroupStudentWithStudentPage } from "@/pages/mentor/group-student/group-student-page";

import { ProfilePage } from "@/pages/admin/profile-user/page";
import { GroupStudentCardPage } from "@/pages/mentor/group-student/group-student-card-page";
import { GroupStudentDetail } from "@/pages/mentor/group-student/group-student-detail/group-student-detail";
import { NotGroupStudentDetailPage } from "@/pages/mentor/not-group-student/columns/not-group-student-detail-page";
import { NotGroupStudentPage } from "@/pages/mentor/not-group-student/not-group-student-page";
import { TopicDetailPage } from "@/pages/mentor/topic-list/topic-mentor/topic-detail/topic-detail-page";
import UpdateTopicDetail from "@/pages/mentor/topic-list/topic-mentor/topic-detail/update-topic-detail";
import { TopicListPage } from "@/pages/mentor/topic-list/topic-mentor/topic-list-page";
import { TopicPage } from "@/pages/mentor/topic-list/topic-mentor/topic-page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { ApproveTopicPage } from "@/pages/mentor/approve-topic/approve-topic-page";
import { ApproveTopicDetail } from "@/pages/mentor/approve-topic/columns/approve-topic-detail";
import { ApproveTopicList } from "@/pages/mentor/approve-topic/columns/approve-topic-list";

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
        <Route path="/topic-list/:semesterId/submission/:submissionPeriodId" element={<TopicListPage />}/>
        <Route path="/topic-detail/:topicId/:semesterId" element={<TopicDetailPage />} />
        <Route path="/topic-detail/:topicId/:semesterId/update" element={<UpdateTopicDetail />}
        />
        <Route path="/not-group-student" element={<NotGroupStudentPage />} />
        <Route path="/not-group-student/:semesterId" element={<NotGroupStudentDetailPage />} />

        <Route path="/group-student" element={<GroupStudentWithStudentPage />} />
        <Route path="/group-student" element={<GroupStudentWithStudentPage />} />
        <Route path="/group-student/:semesterId" element={<GroupStudentCardPage />} />
        <Route path="/group-student-detail" element={<GroupStudentDetail />} />
        <Route path="/group-student-detail/:groupId" element={<GroupStudentDetail />} />

        <Route path="/approve-topic-list/:semesterId" element={<ApproveTopicList />} />

        <Route path="/approve-topic" element={<ApproveTopicPage />} />
        <Route path="/approve-topic-detail/:topicId/:semesterId" element={<ApproveTopicDetail />} />
        
        
        
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
