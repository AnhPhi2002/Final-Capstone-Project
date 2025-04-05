import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";

import { GroupStudentCardPage } from "@/pages/student/group-student/group-student-card-page";
import { GroupStudentDetail } from "@/pages/student/group-student/group-student-detail/group-student-detail";


import { ProfilePage } from "@/pages/admin/profile-user/page";
import { GroupStudentWithStudentPage } from "@/pages/student/group-student/group-student-page";
import { TopicStudentList } from "@/pages/student/topic-student/topic-student-list";
import TopicStudentListDetail from "@/pages/student/topic-student/topic-student-list-detail";
import { TopicStudentPage } from "@/pages/student/topic-student/topic-student-page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { NotGroupStudentPage } from "@/pages/student/not-group-student/not-group-student-page";
import { NotGroupStudentDetailPage } from "@/pages/student/not-group-student/columns/not-group-student-detail-page";
import { AllTopicStudent } from "@/pages/student/student-get-all-topic/all-topic-student";
import AllTopicDetail from "@/pages/student/student-get-all-topic/all-topic-detail";
import { TopicGroupRegisterPage } from "@/pages/student/topic-group-register/topic-group-register-page";
import TopicGroupRegisterDetail from "@/pages/student/topic-group-register/topic-group-register-detail";
import { MeetingStudentDetail } from "@/pages/student/meeting/meeting-student";
import { MeetingStudentPage } from "@/pages/student/meeting/meeting-student-page";
import ProfileUpdateForm from "@/pages/admin/profile-user/components/profile-update";
import { RoomReviewStudent } from "@/pages/student/review-room/room-review-student";
import { GroupStudentDefenseWithStudentPage } from "@/pages/student/group-defense/group-student-page";
import { GroupStudentDefenseCardPage } from "@/pages/student/group-defense/group-student-card-page";


export const StudentContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.roles.find((role) => role.name === "student")) {
      navigate("/access-denied");
    }
  }, []);
  return (
    <MainLayout>
      <Routes>

               <Route path="/profile-page" element={<ProfilePage />} />
               <Route path="/profile-page/update" element={<ProfileUpdateForm />} />
        <Route path="/topic-student" element={<TopicStudentPage />} />
        <Route path="/topic-student/:semesterId" element={<TopicStudentPage />}/>
        <Route path="/topic-student-detail" element={<TopicStudentListDetail />}/>
        
        <Route path="/topic-student-detail/:semesterId/:topicId" element={<TopicStudentListDetail />}/>
        <Route path="/topic-student-list/:semesterId" element={<TopicStudentList />}/>

        <Route path="/group-student" element={<GroupStudentWithStudentPage />} />
        <Route path="/group-student/:semesterId" element={<GroupStudentCardPage />} />
        <Route path="/group-student-detail" element={<GroupStudentDetail />} />
        <Route path="/group-student-detail/:groupId/:semesterId" element={<GroupStudentDetail />} />

        <Route path="/group-student-defense" element={<GroupStudentDefenseWithStudentPage />} />
        <Route path="/group-student-defense/:semesterId" element={<GroupStudentDefenseCardPage />} />

        <Route path="/not-group-student" element={<NotGroupStudentPage />} />
        <Route path="/not-group-student/:semesterId" element={<NotGroupStudentDetailPage />} />

        <Route path="/all-topics-student" element={<AllTopicStudent />} />
        <Route path="/all-topics-student/:topicId/:semesterId" element={<AllTopicDetail />} />

        <Route path="/topic-group-register-detail" element={<TopicGroupRegisterPage />} />
        <Route path="/topic-group-register-detail/:topicId/:semesterId" element={<TopicGroupRegisterDetail />} />

        <Route path="/meeting-student" element={<MeetingStudentPage/>} />
        <Route path="/meeting-student/:id" element={<MeetingStudentDetail />} />

        <Route path="/review-student" element={<RoomReviewStudent />} />


        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
