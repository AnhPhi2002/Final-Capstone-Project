import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { CouncilMemberDetail } from "@/pages/admin/council-member/council-member-listing/council-member-detail";

import CouncilMemberPage from "@/pages/admin/council-member/council-member-page";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { GroupStudentCardPage } from "@/pages/admin/group-student/group-student-card-page";
import { GroupStudentDetail } from "@/pages/admin/group-student/group-student-detail/group-student-detail";

import { GroupStudentPage } from "@/pages/admin/group-student/group-student-page";
import ImportStudentPage from "@/pages/admin/import-student/import-student-page";
import { StudentsnotGroupDetailPage } from "@/pages/admin/not-group-student/columns/students-not-group-detail-page";
import { NotGroupStudentPage } from "@/pages/admin/not-group-student/not-group-student-page";
import { ReviewPage } from "@/pages/admin/review/review-page";
import { SemestersDetailPage } from "@/pages/admin/semesters/columns/semesters-detail-page";

import { SemestersPage } from "@/pages/admin/semesters/semesters-page";
import { StudentsDetailPage } from "@/pages/admin/student-list/columns/students-detail-page";

import StudentListPage from "@/pages/admin/student-list/student-list-page";

import Test from "@/pages/admin/test/test-page";

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

        <Route path="/student" element={<StudentListPage />} />
        <Route path="/student/:studentId" element={<StudentsDetailPage />} />
        <Route path="/import-student" element={<ImportStudentPage />} />
        <Route path="/import-student/:studentId" element={<ImportStudentPage />} />

        <Route path="/review-group-student" element={<ReviewPage />} />
        
        <Route path="/group-student" element={<GroupStudentPage />} />
        <Route path="/group-student/:semesterId" element={<GroupStudentCardPage />} />
        <Route path="/group-student-detail" element={<GroupStudentDetail />} />
        <Route path="/group-student-detail/:Ib" element={<GroupStudentDetail />} />
          
        <Route path="/not-group-student" element={<NotGroupStudentPage />} />
        <Route path="/not-group-student/:semesterId" element={<StudentsnotGroupDetailPage />} />

        <Route path="/semester" element={<SemestersPage />} />
        <Route path="/semester/:semesterId" element={<SemestersDetailPage />} />
        {/* <Route path="/semester-detail" element={<SemestersDetailPage />} /> */}
        <Route path="/year-semester" element={<YearSemesterPage />} />

       
        <Route path="/user" element={<UsersPage />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/edit-user/:userId" element={<UpdateUserPage />} />
        <Route path="/columns" element={<Test />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </MainLayout>
  );
};

export default MainContainter;
