import { RootState } from "@/lib/api/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

const rolePathMap: Record<string, string> = {
  admin: "admin",
  lecturer: "lecturer",
  student: "student",
  academic_officer: "academic",
  examination_officer: "examination",
  graduation_thesis_manager: "graduation-thesis",
};

const AutoNavigate = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/log-in", { replace: true });
      return;
    }

    const role = user.roles?.[0]?.name;
    const path = rolePathMap[role];

    if (path) {
      navigate(`/${path}`, { replace: true });
    }
  }, [user, navigate]);

  return <Navigate to="/access-denied" />;
};

export default AutoNavigate;
