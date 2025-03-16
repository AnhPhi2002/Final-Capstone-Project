import { RootState } from "@/lib/api/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

const AutoNavigate = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    navigate("/log-in", { replace: true });
  }, [navigate]);
  useEffect(() => {
    const roles = user?.roles;
    if (!roles) return;
    if (roles.find((role: any) => role.name === "admin"))
      navigate("/admin");
    else if (roles.find((role: any) => role.name === "lecturer"))
      navigate("/lecturer");
    else if (roles.find((role: any) => role.name === "student"))
      navigate("/student");
    else if (roles.find((role: any) => role.name === "examination_officer"))
      navigate("/examination");
    if (roles.find((role: any) => role.name === "academic_officer"))
      navigate("/academic");
    if (roles.find((role: any) => role.name === "graduation_thesis_manager"))
      navigate("/graduation-thesis");
  }, []);

  return <Navigate to="/access-denied" />;
};

export default AutoNavigate;
