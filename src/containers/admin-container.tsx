import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { ProfilePage } from "@/pages/admin/profile-user/page";
import { SemestersDetailPage } from "@/pages/admin/semesters/columns/semesters-detail-page";
import { SemestersPage } from "@/pages/admin/semesters/semesters-page";
import { YearSemesterPage } from "@/pages/admin/year-semeter/year-semester-page";
import LoginPage from "@/pages/auth/log-in-page";
import { Route, Routes } from "react-router";


export const AdminContainer = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* <Route path="/council-member" element={<CouncilMemberPage />} />
        <Route path="/council-member/:councilId" element={<CouncilMemberDetail />} />
        <Route path="/template-detail" element={<TemplateDetail />} />

        <Route path="/student" element={<StudentListPage />} />
        <Route path="/student/:semesterId" element={<StudentsDetailPage />} />
        <Route path="/import-student" element={<ImportStudentPage />} />
        <Route path="/import-student/:semesterId" element={<ImportStudentPage />} />

        <Route path="/review-group-student" element={<ReviewPage />} />

        <Route path="/group-student" element={<GroupStudentPage />} />
        <Route path="/group-student/:semesterId" element={<GroupStudentCardPage />} />
        <Route path="/group-student-detail" element={<GroupStudentDetail />} />
        <Route path="/group-student-detail/:groupId" element={<GroupStudentDetail />} />

        <Route path="/random-group-student-page" element={<RandomGroupStudentPage />} />
        <Route path="/random-group-student-page/:semesterId" element={<RandomGroupStudentPage />} />

        <Route path="/not-group-student" element={<NotGroupStudentPage />} />
        <Route path="/not-group-student/:semesterId" element={<NotGroupStudentDetailPage />} />

        <Route path="/mentor-page" element={<MentorPage />} />
        <Route path="/mentor-page/:semesterId" element={<MentorDetail />} />

        <Route path="/import-mentor/:semesterId" element={<ImportMentorTab />} />

        <Route path="topic" element={<TopicPage />} />
        <Route path="topic/:semesterId" element={<TopicPage />} />

        <Route path="/topic/:semesterId" element={<TopicPage />} />
        <Route path="topic-list" element={<TopicListPage />} />
        <Route path="topic-list/:semesterId" element={<TopicListPage />} />
        <Route path="/topic-detail/:topicId" element={<TopicDetail />} />

        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/timeline-detail/:semesterId" element={<TimelineDetail />} />


        <Route path="import-topic-mentor" element={<ImportTopicMentorPage />} />
        <Route path="import-topic-mentor/:semesterId" element={<ImportTopicMentorPage />} />

        <Route path="topic-enterprise" element={<TopicEnterprisePage />} />
        <Route path="topic-enterprise-detail" element={<TopicEnterpriseDetail />} />
        <Route path="topic-enterprise-detail/:semesterId" element={<TopicEnterpriseDetail />} />
 */}

        <Route path="/semester" element={<SemestersPage />} />
        <Route path="/semester/:semesterId" element={<SemestersDetailPage />} />

        <Route path="/year-semester" element={<YearSemesterPage />} />

        <Route path="/profile-page" element={<ProfilePage />} />
        {/* <Route path="/profile-page/:profileId" element={<ProfilePage />} />
        <Route path="/profile-page/update" element={<ProfileUpdateForm />} />

        <Route path="/user" element={<UsersPage />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/edit-user/:userId" element={<UpdateUserPage />} />
        <Route path="/columns" element={<Test />} />

        <Route path="/admin-config" element={<AdminConfigPage />} />
        <Route path="/admin-config/update" element={<AdminConfigUpdate />} />  */}

        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </MainLayout>
  );
};

