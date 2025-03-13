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

export default function Home() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<AutoNavigate />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/admin/*" element={<AdminContainer />} />
        <Route path="/academic/*" element={<AcademicOfficerContainer />} />
        <Route path="/examination/*" element={<ExaminationOfficerContainer />} />
        <Route path="/graduation-thesis/*" element={<GraduationThesisManagerContainer />}/>
        <Route path="/lecturer/*" element={<LecturerContainer />} />
        <Route path="/student/*" element={<StudentContainer />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
