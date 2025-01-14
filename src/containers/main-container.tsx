import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";

import CouncilMemberPage from "@/pages/admin/council-member/council-member-listing/council-member-page";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { GroupStudentDetail } from "@/pages/admin/group-student/group-student-detail/group-student-detail";
import { GroupStudentPage } from "@/pages/admin/group-student/group-student-page";
import ImportStudentPage from "@/pages/admin/import-student/import-student-page";
import StudentListPage from "@/pages/admin/student-list/student-list-page";

import CreateUserPage from "@/pages/admin/user/create-user-page";
import UpdateUserPage from "@/pages/admin/user/update-user-page";
import UserDetail from "@/pages/admin/user/user-detail-page";
import UsersPage from "@/pages/admin/user/user-listing/users-page";
import { Route, Routes } from "react-router";

const MainContainter = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/council-member" element={<CouncilMemberPage />} />
        <Route path="/student" element={<StudentListPage />} />
        <Route path="/group-student" element={<GroupStudentPage />} />
        <Route path="/group-student/:groupId" element={<GroupStudentDetail />} />
        <Route path="/import-student" element={<ImportStudentPage />} />
        <Route path="/user" element={<UsersPage />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/edit-user/:userId" element={<UpdateUserPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default MainContainter;
