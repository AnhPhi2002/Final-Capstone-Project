import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { AdminConfigPage } from "@/pages/admin/admin-confix/admin-config-page";
import { AdminConfigUpdate } from "@/pages/admin/admin-confix/admin-config-update";
import { CouncilMemberDetail } from "@/pages/admin/council-member/council-member-listing/council-member-detail";
import CouncilMemberPage from "@/pages/admin/council-member/council-member-page";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { GroupStudentCardPage } from "@/pages/admin/group-student/group-student-card-page";
import { GroupStudentDetail } from "@/pages/admin/group-student/group-student-detail/group-student-detail";
import { GroupStudentPage } from "@/pages/admin/group-student/group-student-page";
import { RandomGroupStudentPage } from "@/pages/admin/group-student/random-group-student/random-group-student-page";
// import ImportMentorTab from "@/pages/admin/import-mentor/import-mentor-tab";
import ImportStudentPage from "@/pages/admin/import-student/import-student-page";
import { MentorDetail } from "@/pages/admin/mentor/columns/mentor-detail";
import { MentorPage } from "@/pages/admin/mentor/mentor-page";
import { NotGroupStudentDetailPage } from "@/pages/admin/not-group-student/columns/not-group-student-detail-page";
import { NotGroupStudentPage } from "@/pages/admin/not-group-student/not-group-student-page";
import ProfileUpdateForm from "@/pages/admin/profile-user/components/profile-update";
import { ProfilePage } from "@/pages/admin/profile-user/page";

import { ReviewPage } from "@/pages/admin/review/review-page";
import { SemestersDetailPage } from "@/pages/admin/semesters/columns/semesters-detail-page";
import { SemestersPage } from "@/pages/admin/semesters/semesters-page";
import { StudentsDetailPage } from "@/pages/admin/student-list/columns/students-detail-page";
import StudentListPage from "@/pages/admin/student-list/student-list-page";
import TemplateDetail from "@/pages/admin/templates-mail/TemplateDetail";
import Test from "@/pages/admin/test/test-page";
import TimelineDetail from "@/pages/admin/timeline-register/timeline-detail";
import TimelinePage from "@/pages/admin/timeline-register/timeline-page";
import TopicEnterpriseDetail from "@/pages/admin/topic-list/topic-enterprise/topic-enterprise-detail";
import { TopicEnterprisePage } from "@/pages/admin/topic-list/topic-enterprise/topic-enterprise-page";
import { ImportTopicMentorPage } from "@/pages/admin/topic-list/topic-mentor/import-topic-mentor/import-topic-mentor-page";
import { TopicListPage } from "@/pages/admin/topic-list/topic-mentor/topic-list-page";
import { TopicPage } from "@/pages/admin/topic-list/topic-mentor/topic-page";
import CreateUserPage from "@/pages/admin/user/create-user-page";
import UpdateUserPage from "@/pages/admin/user/update-user-page";
import UserDetail from "@/pages/admin/user/user-detail-page";
import UsersPage from "@/pages/admin/user/user-listing/users-page";
import { YearSemesterPage } from "@/pages/admin/year-semeter/year-semester-page";
import LoginPage from "@/pages/auth/log-in-page";
import { Route, Routes } from "react-router";
import { TopicReviewPage } from "@/pages/examination-officer/topic-review/topic-review-page";
import { TopicReviewListPage } from "@/pages/examination-officer/topic-review/topic-review-list-page";
import TopicReviewDetail from "@/pages/examination-officer/topic-review/topic-review-detail";
import { DeadineTopicPage } from "@/pages/admin/deadline-topic/deadine-topic-page";
import { DeadineTopicDetailPage } from "@/pages/admin/deadline-topic/columns/deadine-topic-detail-page";
import { ReviewSemesterPage } from "@/pages/admin/review-semester/review-semester-page";
import { TopicDetailPage } from "@/pages/admin/topic-list/topic-mentor/topic-detail/topic-detail-page";
import UpdateTopicDetail from "@/pages/admin/topic-list/topic-mentor/topic-detail/update-topic-detail";
import ImportMentorPage from "@/pages/admin/import-mentor/import-mentor-page";
import { ReviewTopicCouncilPage } from "@/pages/examination-officer/review-topic-council/review-topic-council-page";
import { ReviewTopicCouncilDetail } from "@/pages/examination-officer/review-topic-council/columns/review-topic-council-detail";
import { TopicStudentPage } from "@/pages/student/topic-student/topic-student-page";
import TopicStudentListDetail from "@/pages/student/topic-student/topic-student-list-detail";

import { ApproveTopicPage } from "@/pages/mentor/approve-topic/approve-topic-page";
import { ApproveTopicDetail } from "@/pages/mentor/approve-topic/columns/approve-topic-detail";
import { CouncilMembersPage } from "@/pages/examination-officer/review-topic-council/columns-member/CouncilMembersPage";

const MainContainter = () => {
  
  return (
    
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

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

        <Route path="/import-mentor/:semesterId" element={<ImportMentorPage />} />

        <Route path="/topic" element={<TopicPage />} />
        <Route path="/topic/:semesterId" element={<TopicPage />} />
        <Route path="/topic-list" element={<TopicListPage />} /> 
        <Route path="/topic-list/:semesterId/submission/:submissionPeriodId" element={<TopicListPage />} />


        {/* <Route path="/topic-list/:semesterId/submission/:submissionId" element={<TopicDetail />} /> */}
        {/* <Route path="/topic-detail/:topicId" element={<TopicDetail />} />  */}
        <Route path="/topic-detail/:topicId" element={<TopicDetailPage />} /> 
        <Route path="/topic-detail/:topicId/update" element={<UpdateTopicDetail />} /> 

        <Route path="/topic-review-page" element={<TopicReviewPage />} />
        <Route path="/topic-review-page/:semesterId" element={<TopicReviewPage />} />
        <Route path="/topic-review-list" element={<TopicReviewListPage />} />
        <Route path="/topic-review-list/:semesterId" element={<TopicReviewListPage />} />
        <Route path="/topic-review-detail/:topicId" element={<TopicReviewDetail />} />


        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/timeline-detail/:semesterId" element={<TimelineDetail />} />


        <Route path="/import-topic-mentor" element={<ImportTopicMentorPage />} />
        <Route path="/import-topic-mentor/:semesterId" element={<ImportTopicMentorPage />} />

        <Route path="topic-enterprise" element={<TopicEnterprisePage />} />
        <Route path="topic-enterprise-detail" element={<TopicEnterpriseDetail />} />
        <Route path="topic-enterprise-detail/:semesterId" element={<TopicEnterpriseDetail />} />
  
        <Route path="review-semester" element={<ReviewSemesterPage />} />

        <Route path="deadline-topic" element={<DeadineTopicPage />} />
        <Route path="deadline-topic/:semesterId" element={<DeadineTopicDetailPage />} />
        <Route path="deadline-topic/:semesterId/submission/:submissionId" element={<DeadineTopicDetailPage />} />
        

        <Route path="review-topic-council" element={<ReviewTopicCouncilPage />} />
        <Route path="/review-topic-council-detail/:councilId" element={<ReviewTopicCouncilDetail />} />
        {/* <Route path="review-topic-council-detail" element={<ReviewTopicCouncilDetail />} /> */}
        <Route path="/review-topic-council-member/:councilId" element={<CouncilMembersPage />} />

        <Route path="/topic-student" element={<TopicStudentPage />} />
        <Route path="/topic-student/:semesterId" element={<TopicStudentPage />} />
        <Route path="/topic-student-detail" element={<TopicStudentListDetail />} /> 
        <Route path="/topic-student-detail/:topicId" element={<TopicStudentListDetail />} /> 

        <Route path="/approve-topic" element={<ApproveTopicPage />} />
        <Route path="/approve-topic-detail" element={<ApproveTopicDetail />} />


        <Route path="/semester" element={<SemestersPage />} />
        <Route path="/semester/:semesterId" element={<SemestersDetailPage />} />

        <Route path="/year-semester" element={<YearSemesterPage />} />

        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/profile-page/:profileId" element={<ProfilePage />} />
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
