import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";

import { ProfilePage } from "@/pages/admin/profile-user/page";
import { TopicStudentList } from "@/pages/student/topic-student/topic-student-list";
import TopicStudentListDetail from "@/pages/student/topic-student/topic-student-list-detail";
import { TopicStudentPage } from "@/pages/student/topic-student/topic-student-page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";

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
        <Route path="/" element={<DashboardPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/topic-student" element={<TopicStudentPage />} />
        <Route
          path="/topic-student/:semesterId"
          element={<TopicStudentPage />}
        />
        <Route
          path="/topic-student-detail"
          element={<TopicStudentListDetail />}
        />
        <Route
          path="/topic-student-detail/:semesterId/:topicId"
          element={<TopicStudentListDetail />}
        />
        <Route
          path="/topic-student-list/:semesterId"
          element={<TopicStudentList />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
