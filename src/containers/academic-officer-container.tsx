import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { RandomGroupStudentPage } from "@/pages/academic/random-group-student/random-group-student-page";
import { ProfilePage } from "@/pages/admin/profile-user/page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { TopicAssignmentDecisionPage } from "@/pages/academic/topic-assignment-decision/TopicAssignmentDecisionPage";
import { TopicAssignmentDecisionDetail } from "@/pages/academic/topic-assignment-decision/topic-assignment-decision-detail/TopicAssignmentDecisionDetail";
import { RRadomGroupStudentDetail } from "@/pages/academic/random-group-student/radom-group-student-detail";
import { YearSemesterPage } from "@/pages/academic/year-semeter/year-semester-page";
import { SemestersPage } from "@/pages/academic/semesters/semesters-page";
import { SemestersDetailPage } from "@/pages/academic/semesters/columns/semesters-detail-page";
import StudentListPage from "@/pages/academic/student-list/student-list-page";
import { GroupStudentPage } from "@/pages/academic/group-student/group-student-page";
import { NotGroupStudentPage } from "@/pages/academic/not-group-student/not-group-student-page";

import { TopicDetailPage } from "@/pages/academic/topic-list/topic-mentor/topic-detail/topic-detail-page";
import { TopicPage } from "@/pages/academic/topic-list/topic-mentor/topic-page";
import { TopicListPage } from "@/pages/academic/topic-list/topic-mentor/topic-list-page";
import { StudentsDetailPage } from "@/pages/academic/student-list/columns/students-detail-page";
import ImportStudentPage from "@/pages/academic/import-student/import-student-page";
import { GroupStudentCardPage } from "@/pages/academic/group-student/group-student-card-page";
import { GroupStudentDetail } from "@/pages/academic/group-student/group-student-detail/group-student-detail";
import { NotGroupStudentDetailPage } from "@/pages/academic/not-group-student/columns/not-group-student-detail-page";
import UpdateTopicDetail from "@/pages/academic/topic-list/topic-mentor/topic-detail/update-topic-detail";
import { MentorDetail } from "@/pages/academic/mentor/columns/mentor-detail";
import ImportMentorPage from "@/pages/academic/import-mentor/import-mentor-page";
import TemplateDetail from "@/pages/academic/templates-mail/TemplateDetail";
import { DecisionPage } from "@/pages/academic/decision/decision-page";
import { MentorPage } from "@/pages/academic/mentor/mentor-page";
import { DecisionDetail } from "@/pages/academic/decision/decision-detail";
import { UpdateDecision } from "@/pages/academic/decision/update-decision";
import ProfileUpdateForm from "@/pages/admin/profile-user/components/profile-update";
import { CreateDecision } from "@/pages/academic/decision/create-decision";
import DecisionView from "@/pages/academic/decision/decision-view";
import { ImportBussinessTopicPage } from "@/pages/academic/topic-list/topic-mentor/import-bussiness-topic/import-topic-mentor-page";




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
                <Route path="/profile-page/update" element={<ProfileUpdateForm />} />
        <Route path="/semester" element={<SemestersPage />} />
        <Route path="/semester/:semesterId" element={<SemestersDetailPage />} />
        <Route path="/year-semester" element={<YearSemesterPage />} />

        <Route path="/template-detail" element={<TemplateDetail />} />

        <Route path="/student" element={<StudentListPage />} />
        <Route path="/student/:semesterId" element={<StudentsDetailPage />} />
        <Route path="/import-student" element={<ImportStudentPage />} />
        <Route path="/import-student/:semesterId" element={<ImportStudentPage />} />

        <Route path="/group-student" element={<GroupStudentPage />} />
        <Route path="/group-student/:semesterId" element={<GroupStudentCardPage />} />
        <Route path="/group-student-detail" element={<GroupStudentDetail />} />
        <Route path="/group-student-detail/:groupId/:semesterId" element={<GroupStudentDetail />} />

        <Route path="/random-group-student-page" element={<RandomGroupStudentPage />} />
        <Route path="/random-group-student-page/:semesterId" element={<RRadomGroupStudentDetail />} />

        <Route path="/not-group-student" element={<NotGroupStudentPage />} />
        <Route path="/not-group-student/:semesterId" element={<NotGroupStudentDetailPage />} />

   
        <Route path="/topic" element={<TopicPage />} />
        <Route path="/topic/:semesterId" element={<TopicPage />} />

        <Route path="/topic-list/semester/:semesterId/submission/:submissionPeriodId" element={<TopicListPage />} />
        <Route path="/topic-detail/:topicId/:semesterId" element={<TopicDetailPage />} />
        <Route path="/topic-detail/:topicId/:semesterId/update" element={<UpdateTopicDetail />} />

        <Route path="/mentor-page" element={<MentorPage />} />
        <Route path="/mentor-page/:semesterId" element={<MentorDetail />} />
        <Route path="/import-mentor/:semesterId" element={<ImportMentorPage />} />
        <Route path="/import-business-topic/:semesterId/submission-period/:submissionPeriodId" element={<ImportBussinessTopicPage />} />
        

        <Route path="/topic-assignment-decision" element={<TopicAssignmentDecisionPage />} />
        <Route path="/topic-assignment-decision-detail" element={<TopicAssignmentDecisionDetail />} />

        <Route path="/decision" element={< DecisionPage />} />
        <Route path="/decision/:semesterId" element={< DecisionDetail />} />
        
        <Route path="/decision/:semesterId/view" element={< DecisionView />} />
        <Route path="/decision/:semesterId/update" element={<UpdateDecision />} />
        <Route path="/decision/:semesterId/create" element={<CreateDecision />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
