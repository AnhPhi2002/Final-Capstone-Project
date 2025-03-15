import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { DeadineTopicDetailPage } from "@/pages/admin/deadline-topic/columns/deadine-topic-detail-page";
import { DeadineTopicPage } from "@/pages/admin/deadline-topic/deadine-topic-page";
import { GroupStudentCardPage } from "@/pages/admin/group-student/group-student-card-page";
import { GroupStudentDetail } from "@/pages/admin/group-student/group-student-detail/group-student-detail";
import { GroupStudentPage } from "@/pages/admin/group-student/group-student-page";
import { RandomGroupStudentPage } from "@/pages/admin/group-student/random-group-student/random-group-student-page";
import ImportMentorPage from "@/pages/admin/import-mentor/import-mentor-page";
import ImportStudentPage from "@/pages/admin/import-student/import-student-page";
import { MentorDetail } from "@/pages/admin/mentor/columns/mentor-detail";
import MentorPage from "@/pages/admin/mentor/mentor-page";
import { NotGroupStudentDetailPage } from "@/pages/admin/not-group-student/columns/not-group-student-detail-page";
import { NotGroupStudentPage } from "@/pages/admin/not-group-student/not-group-student-page";
import { ProfilePage } from "@/pages/admin/profile-user/page";
import { SemestersDetailPage } from "@/pages/admin/semesters/columns/semesters-detail-page";
import { SemestersPage } from "@/pages/admin/semesters/semesters-page";
import { StudentsDetailPage } from "@/pages/admin/student-list/columns/students-detail-page";
import StudentListPage from "@/pages/admin/student-list/student-list-page";
import TemplateDetail from "@/pages/admin/templates-mail/TemplateDetail";
import { TopicDetailPage } from "@/pages/admin/topic-list/topic-mentor/topic-detail/topic-detail-page";
import { TopicListPage } from "@/pages/admin/topic-list/topic-mentor/topic-list-page";
import { TopicPage } from "@/pages/admin/topic-list/topic-mentor/topic-page";
import { YearSemesterPage } from "@/pages/admin/year-semeter/year-semester-page";
import UpdateTopicDetail from "@/pages/admin/topic-list/topic-mentor/topic-detail/update-topic-detail";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { TopicAssignmentDecisionPage } from "@/pages/academic/topic-assignment-decision/TopicAssignmentDecisionPage";
import { TopicAssignmentDecisionDetail } from "@/pages/academic/topic-assignment-decision/topic-assignment-decision-detail/TopicAssignmentDecisionDetail";

export const AcademicOfficerContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.roles.find((role) => role.name === "academic_officer")) {
      navigate("/access-denied");
    }
  }, []);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/semester" element={<SemestersPage />} />
        <Route path="/semester/:semesterId" element={<SemestersDetailPage />} />
        <Route path="/year-semester" element={<YearSemesterPage />} />

        <Route path="/template-detail" element={<TemplateDetail />} />

        <Route path="/student" element={<StudentListPage />} />
        <Route path="/student/:semesterId" element={<StudentsDetailPage />} />
        <Route path="/import-student" element={<ImportStudentPage />} />
        <Route path="/import-student/:semesterId" element={<ImportStudentPage />} />

        <Route path="/group-student" element={<GroupStudentPage />} />
        <Route path="/group-student" element={<GroupStudentPage />} />
        <Route path="/group-student/:semesterId" element={<GroupStudentCardPage />} />
        <Route path="/group-student-detail" element={<GroupStudentDetail />} />
        <Route path="/group-student-detail/:groupId/:semesterId" element={<GroupStudentDetail />} />

        <Route path="/random-group-student-page" element={<RandomGroupStudentPage />} />
        <Route path="/random-group-student-page/:semesterId" element={<RandomGroupStudentPage />} />

        <Route path="/not-group-student" element={<NotGroupStudentPage />} />
        <Route path="/not-group-student/:semesterId" element={<NotGroupStudentDetailPage />} />

        <Route path="deadline-topic" element={<DeadineTopicPage />} />
        <Route path="deadline-topic/:semesterId" element={<DeadineTopicDetailPage />} />
        <Route path="deadline-topic/:semesterId/submission/:submissionId" element={<DeadineTopicDetailPage />} />

        <Route path="/topic" element={<TopicPage />} />
        <Route path="/topic/:semesterId" element={<TopicPage />} />
        <Route path="/topic-list" element={<TopicListPage />} />
        <Route path="/topic-list/:semesterId/submission/:submissionPeriodId" element={<TopicListPage />} />
        <Route path="/topic-detail/:topicId/:semesterId" element={<TopicDetailPage />} />
        <Route path="/topic-detail/:topicId/:semesterId/update" element={<UpdateTopicDetail />} />

        <Route path="/mentor-page" element={<MentorPage />} />
        <Route path="/mentor-page/:semesterId" element={<MentorDetail />} />
        <Route path="/import-mentor/:semesterId" element={<ImportMentorPage />} />
        

        <Route path="/topic-assignment-decision" element={<TopicAssignmentDecisionPage />} />
        <Route path="/topic-assignment-decision-detail" element={<TopicAssignmentDecisionDetail />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
