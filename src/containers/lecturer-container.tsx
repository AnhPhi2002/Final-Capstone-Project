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
import { MeetingPage } from "@/pages/mentor/meeting/meeting";
import MeetingListPage from "@/pages/mentor/meeting/meeting-page";
import { CouncilReviewMentorPage } from "@/pages/mentor/council-mentor/council-review-mentor-page";
import { CouncilReviewMentorDetail } from "@/pages/mentor/council-mentor/columns/council-review-mentor-detail";
import { CouncilReviewMembersPage } from "@/pages/mentor/council-mentor/columns-member/CouncilMembersPage";
import ProfileUpdateForm from "@/pages/admin/profile-user/components/profile-update";
import { MentorCheckReviewPage } from "@/pages/mentor/review-room/mentor-check-review-page";
import { MentorCheckReview } from "@/pages/mentor/review-room/columns/mentor-check-review-detail";
import { CouncilReviewGroupsPage } from "@/pages/mentor/council-mentor/columns-detail/CouncilGroupsPage";
import { DecisionDefensePage } from "@/pages/mentor/decision-defense/decision-defense-page";
import { DecisionDefense } from "@/pages/mentor/decision-defense/columns/mentor-decision-detail";
import { CouncilCheckTopicPage } from "@/pages/mentor/council-check-topic/council-check-topic-page";
import { CouncilCheckTopicDetail } from "@/pages/mentor/council-check-topic/columns/council-check-topic-detail";
import { CouncilCheckMembersPage } from "@/pages/mentor/council-check-topic/columns-member/CouncilMembersPage";
import { MentorCheckDefensePage } from "@/pages/mentor/defense-room/mentor-check-defense-page";
import { MentorCheckDefense } from "@/pages/mentor/defense-room/columns/mentor-check-defense-detail";
import { CouncilDefenseMentorPage } from "@/pages/mentor/council-defense/council-defense-mentor-page";
import { CouncilDefenseMentorDetail } from "@/pages/mentor/council-defense/columns/council-defense-mentor-detail";
import { CouncilDefenseMembersPage } from "@/pages/mentor/council-defense/columns-member/CouncilMembersPage";
import { CouncilDefenseGroupsPage } from "@/pages/mentor/council-defense/columns-detail/CouncilGroupsPage";
import { ReviewTopicPage } from "@/pages/mentor/topic-review/review-topic-page";
import { ReviewTopicListPage } from "@/pages/mentor/topic-review/review-topic-list-page";
import { ReviewTopicDetailPage } from "@/pages/mentor/topic-review/topic-detail/topic-detail-page";
import UpdateReviewTopicDetail from "@/pages/mentor/topic-review/topic-detail/update-topic-detail";
import { TopicListApprovedPage } from "@/pages/mentor/topic-council-approved/topic-list/topic-mentor/topic-list-page";
import { TopicDetailApprovedPage } from "@/pages/mentor/topic-council-approved/topic-list/topic-mentor/topic-detail/topic-detail-page";
import { TopicApprovedPage } from "@/pages/mentor/topic-council-approved/topic-list/topic-mentor/topic-page";

export const LecturerContainer = () => {
  // const user = useSelector((state: RootState) => state.auth.user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user?.roles.find((role) => role.name === "lecturer")) {
  //     navigate("/access-denied");
  //   }
  // }, []);
  const user = useSelector((state: RootState) => state.auth.user);
  const currentRole = useSelector((state: RootState) => state.auth.currentRole);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && currentRole !== "lecturer") {
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
        <Route path="/topic" element={<TopicPage />} />
        <Route path="/topic/:semesterId" element={<TopicPage />} />
        <Route path="/topic-list" element={<TopicListPage />} />
        <Route path="/topic-list/semester/:semesterId/submission/:submissionPeriodId/round/:roundNumber/type/:type" element={<TopicListPage />} />
        <Route path="/topic-detail/:topicId/:semesterId" element={<TopicDetailPage />} />
        <Route path="/topic-detail/:topicId/:semesterId/update" element={<UpdateTopicDetail />}
        />
        <Route path="/not-group-student" element={<NotGroupStudentPage />} />
        <Route path="/not-group-student/:semesterId" element={<NotGroupStudentDetailPage />} />

        <Route path="/group-student" element={<GroupStudentWithStudentPage />} />
        <Route path="/group-student" element={<GroupStudentWithStudentPage />} />
        <Route path="/group-student/:semesterId" element={<GroupStudentCardPage />} />
        <Route path="/group-student-detail" element={<GroupStudentDetail />} />
        <Route path="/group-student-detail/:groupId/:semesterId" element={<GroupStudentDetail />} />

        <Route path="/approve-topic" element={<ApproveTopicPage />} />
        <Route path="/approve-topic-list/:semesterId/submission/:submissionPeriodId/round/:roundNumber" element={<ApproveTopicList />} />
        <Route path="/approve-topic-detail/:topicId/:semesterId" element={<ApproveTopicDetail />} />

        <Route path="/meeting" element={<MeetingListPage />} />
        <Route path="/meeting/:semesterId" element={<MeetingPage />} />

        <Route path="/council-check" element={<CouncilCheckTopicPage />} />
        <Route path="/council-check/:councilId/:semesterId" element={<CouncilCheckTopicDetail />} />
        <Route path="/council-check-member/:councilId/:semesterId" element={<CouncilCheckMembersPage />} />
        {/* <Route path="/council-review-group/:councilId/:semesterId" element={<CouncilReviewGroupsPage />} /> */}

        <Route path="/council-review" element={<CouncilReviewMentorPage />} />
        <Route path="/council-review/:councilId/:semesterId" element={<CouncilReviewMentorDetail />} />
        <Route path="/council-review-member/:councilId/:semesterId" element={<CouncilReviewMembersPage />} />
        <Route path="/council-review-group/:councilId/:semesterId" element={<CouncilReviewGroupsPage />} />

        <Route path="/council-defense" element={<CouncilDefenseMentorPage />} />
        <Route path="/council-defense/:councilId/:semesterId" element={<CouncilDefenseMentorDetail />} />
        <Route path="/council-defense-member/:councilId/:semesterId" element={<CouncilDefenseMembersPage />} />
        <Route path="/council-defense-group/:councilId/:semesterId" element={<CouncilDefenseGroupsPage />} />

        <Route path="/check-review/" element={<MentorCheckReviewPage />} />
        <Route path="/check-review/:semesterId" element={<MentorCheckReview />} />

        <Route path="/check-defense/" element={<MentorCheckDefensePage />} />
        <Route path="/check-defense/:semesterId" element={<MentorCheckDefense />} />

        <Route path="/decision-defense/" element={<DecisionDefensePage />} />
        <Route path="/decision-defense/:semesterId" element={<DecisionDefense />} />

        <Route path="/review-topic-page" element={<ReviewTopicPage />} />
        <Route path="/review-topic-page/:semesterId" element={<ReviewTopicPage />} />
        <Route path="/review-topic-list" element={<ReviewTopicListPage />} />
        <Route path="/review-topic-list/:semesterId/submission/:submissionPeriodId/round/:roundNumber" element={<ReviewTopicListPage />} />
        <Route path="/review-topic-detail/:topicId/:semesterId" element={<ReviewTopicDetailPage />} />
        <Route path="/review-topic-detail/:topicId/:semesterId/update" element={<UpdateReviewTopicDetail />} />

        <Route path="/topic-approved" element={<TopicApprovedPage />} />
        <Route path="/topic-approved/:semesterId" element={<TopicApprovedPage />} />
        <Route path="/topic-list-approved/semester/:semesterId/submission/:submissionPeriodId/round/:roundNumber" element={<TopicListApprovedPage />} />
        <Route path="/topic-detail-approved/:topicId/:semesterId" element={<TopicDetailApprovedPage />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
