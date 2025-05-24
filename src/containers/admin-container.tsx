import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import { AdminConfigPage } from "@/pages/admin/admin-confix/admin-config-page";
import { AdminConfigUpdate } from "@/pages/admin/admin-confix/admin-config-update";
// import DashboardDetailPage from "@/pages/admin/dashboard/dashboard-detail-page";
import DashboardPage from "@/pages/admin/dashboard/dashboard-page";
import ProfileUpdateForm from "@/pages/admin/profile-user/components/profile-update";
import { ProfilePage } from "@/pages/admin/profile-user/page";
import CreateUserPage from "@/pages/admin/user/create-user-page";
import UpdateUserPage from "@/pages/admin/user/update-user-page";
import UserDetail from "@/pages/admin/user/user-detail-page";
import UsersListingPage from "@/pages/admin/user/user-listing/users-page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";

export const AdminContainer = () => {
  // const user = useSelector((state: RootState) => state.auth.user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user?.roles.find((role) => role.name === "admin")) {
  //     navigate("/access-denied");
  //   }
  // }, []);
  // console.log("AdminContainer");
  const user = useSelector((state: RootState) => state.auth.user);
  const currentRole = useSelector((state: RootState) => state.auth.currentRole);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && currentRole !== "admin") {
      navigate("/access-denied");
    }
  }, [user, currentRole, navigate]);

  if (!user) return <p>Đang tải...</p>;
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<UsersListingPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/profile-page/update" element={<ProfileUpdateForm />} />
        <Route path="/admin-config" element={<AdminConfigPage />} />
        <Route path="/admin-config/update" element={<AdminConfigUpdate />} />
        <Route path="/user" element={<UsersListingPage />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/user/create-user" element={<CreateUserPage />} />
        <Route path="/user/update-user/:id/edit" element={<UpdateUserPage />} />

        <Route path="/dashboard-page" element={<DashboardPage />} />
        {/* <Route path="/dashboard-detail/:semesterId" element={<DashboardDetailPage />} /> */}

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
