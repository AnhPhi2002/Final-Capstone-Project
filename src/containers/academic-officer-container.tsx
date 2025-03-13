import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import { GroupStudentCardPage } from "@/pages/admin/group-student/group-student-card-page";
import { GroupStudentDetail } from "@/pages/admin/group-student/group-student-detail/group-student-detail";
import { GroupStudentPage } from "@/pages/admin/group-student/group-student-page";
import { RandomGroupStudentPage } from "@/pages/admin/group-student/random-group-student/random-group-student-page";
import ImportStudentPage from "@/pages/admin/import-student/import-student-page";
import { NotGroupStudentDetailPage } from "@/pages/admin/not-group-student/columns/not-group-student-detail-page";
import { NotGroupStudentPage } from "@/pages/admin/not-group-student/not-group-student-page";
import { ProfilePage } from "@/pages/admin/profile-user/page";
import { SemestersDetailPage } from "@/pages/admin/semesters/columns/semesters-detail-page";
import { SemestersPage } from "@/pages/admin/semesters/semesters-page";
import { StudentsDetailPage } from "@/pages/admin/student-list/columns/students-detail-page";
import StudentListPage from "@/pages/admin/student-list/student-list-page";
import TemplateDetail from "@/pages/admin/templates-mail/TemplateDetail";
import { YearSemesterPage } from "@/pages/admin/year-semeter/year-semester-page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";

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
        <Route path="/group-student-detail/:groupId" element={<GroupStudentDetail />} />

        <Route path="/random-group-student-page" element={<RandomGroupStudentPage />} />
        <Route path="/random-group-student-page/:semesterId" element={<RandomGroupStudentPage />} />
        
        <Route path="/not-group-student" element={<NotGroupStudentPage />} />
        <Route path="/not-group-student/:semesterId" element={<NotGroupStudentDetailPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
