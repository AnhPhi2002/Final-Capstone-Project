import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { AdminConfigPage } from "@/pages/admin/admin-config/admin-config-page";
import { AdminConfigUpdate } from "@/pages/admin/admin-config/admin-config-update";
import { CouncilMemberDetail } from "@/pages/admin/council-member/council-member-listing/council-member-detail";
import CouncilMemberPage from "@/pages/admin/council-member/council-member-page";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { GroupStudentCardPage } from "@/pages/admin/group-student/group-student-card-page";
import { GroupStudentDetail } from "@/pages/admin/group-student/group-student-detail/group-student-detail";
import { GroupStudentPage } from "@/pages/admin/group-student/group-student-page";
import { RandomGroupStudentPage } from "@/pages/admin/group-student/random-group-student/random-group-student-page";
import ImportStudentPage from "@/pages/admin/import-student/import-student-page";
import { MentorDetail } from "@/pages/admin/mentor/columns/mentor-detail";
import { MentorPage } from "@/pages/admin/mentor/mentor-page";
import { NotGroupStudentDetailPage } from "@/pages/admin/not-group-student/columns/not-group-student-detail-page";
import { NotGroupStudentPage } from "@/pages/admin/not-group-student/not-group-student-page";
import ProfileUpdateForm from "@/pages/admin/profile-user/components/profile-update";
import ProfilePage from "@/pages/admin/profile-user/page";
import { ReviewPage } from "@/pages/admin/review/review-page";
import { SemestersDetailPage } from "@/pages/admin/semesters/columns/semesters-detail-page";
import { SemestersPage } from "@/pages/admin/semesters/semesters-page";
import { StudentsDetailPage } from "@/pages/admin/student-list/columns/students-detail-page";
import StudentListPage from "@/pages/admin/student-list/student-list-page";
import TemplateDetail from "@/pages/admin/templates-mail/TemplateDetail";
import Test from "@/pages/admin/test/test-page";
import TopicEnterpriseDetail from "@/pages/admin/topic-list/topic-enterprise/topic-enterprise-detail";
import { TopicEnterprisePage } from "@/pages/admin/topic-list/topic-enterprise/topic-enterprise-page";
import { ImportTopicMentorPage } from "@/pages/admin/topic-list/topic-mentor/import-topic-mentor/import-topic-mentor-page";
import TopicDetail from "@/pages/admin/topic-list/topic-mentor/topic-detail";
import { TopicPage } from "@/pages/admin/topic-list/topic-mentor/topic-page";
import CreateUserPage from "@/pages/admin/user/create-user-page";
import UpdateUserPage from "@/pages/admin/user/update-user-page";
import UserDetail from "@/pages/admin/user/user-detail-page";
import UsersPage from "@/pages/admin/user/user-listing/users-page";
import { YearSemesterPage } from "@/pages/admin/year-semeter/year-semester-page";
import LoginPage from "@/pages/auth/log-in-page";
import { Route, Routes } from "react-router";

const MainContainter = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/council-member" element={<CouncilMemberPage />} />
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
        
        <Route path="topic" element={<TopicPage />}/>
        <Route path="topic/:semesterId" element={<TopicPage />}/>
        
        <Route path="topic-detail" element={<TopicDetail />}/>
        <Route path="topic-detail/:semesterId" element={<TopicDetail />}/>

        <Route path="import-topic-mentor" element={<ImportTopicMentorPage />}/>
        <Route path="import-topic-mentor/:semesterId" element={<ImportTopicMentorPage />}/>

        <Route path="topic-enterprise" element={<TopicEnterprisePage />}/>
        <Route path="topic-enterprise-detail" element={<TopicEnterpriseDetail />}/>
        <Route path="topic-enterprise-detail/:semesterId" element={<TopicEnterpriseDetail />}/>


        <Route path="/semester" element={<SemestersPage />} />
        <Route path="/semester/:semesterId" element=  {<SemestersDetailPage />} />
   
        <Route path="/year-semester" element={<YearSemesterPage />} />

        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/profile-page/:userId" element={<ProfilePage />} />
        <Route path="/profile-page/update" element={<ProfileUpdateForm />} />

        <Route path="/user" element={<UsersPage />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/edit-user/:userId" element={<UpdateUserPage />} />
        <Route path="/columns" element={<Test />} />

        <Route path="/admin-config" element={<AdminConfigPage />} />
        <Route path="/admin-config/update" element={<AdminConfigUpdate />} /> 

        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </MainLayout>
  );
};

export default MainContainter;
