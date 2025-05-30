import { Route, Routes } from "react-router";
import LoginPage from "./pages/auth/log-in-page";
import { AdminContainer } from "./containers/admin-container";
import NotFound from "./components/page-not-found";
import { AcademicOfficerContainer } from "./containers/academic-officer-container";
import { ExaminationOfficerContainer } from "./containers/examination-officer-container";
import { GraduationThesisManagerContainer } from "./containers/graduation-thesis-manager-container";
import { LecturerContainer } from "./containers/lecturer-container";
import { StudentContainer } from "./containers/student-container";
import AccessDenied from "./pages/error/access-denied";
import AutoNavigate from "./pages/auto-navigate";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";

export default function Home() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<AutoNavigate />} />
        <Route path="/forgot-password" element={<ForgotPassword  />} />
        <Route path="/reset-password" element={<ResetPassword  />} />
        <Route path="/log-in" element={<LoginPage />} />       
        <Route path="/admin/*" element={<AdminContainer />} />
        <Route path="/academic/*" element={<AcademicOfficerContainer />} />
        <Route path="/examination/*" element={<ExaminationOfficerContainer />} />
        <Route path="/graduation-thesis/*" element={<GraduationThesisManagerContainer />}/>
        <Route path="/lecturer/*" element={<LecturerContainer />} />
        <Route path="/student/*" element={<StudentContainer />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
