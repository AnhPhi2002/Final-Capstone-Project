import NotFound from "@/components/page-not-found";
import MainLayout from "@/layouts/main-layout";
import { RootState } from "@/lib/api/redux/store";
import { AdminConfigPage } from "@/pages/admin/admin-confix/admin-config-page";
import { AdminConfigUpdate } from "@/pages/admin/admin-confix/admin-config-update";
import { ProfilePage } from "@/pages/admin/profile-user/page";
import UserDetail from "@/pages/admin/user/user-detail-page";
import UsersListingPage from "@/pages/admin/user/user-listing/users-page";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";

export const AdminContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.roles.find((role) => role.name === "admin")) {
      navigate("/access-denied");
    }
  }, []);
  console.log("AdminContainer");
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<UsersListingPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/admin-config" element={<AdminConfigPage />} />
        <Route path="/admin-config/update" element={<AdminConfigUpdate />} /> 
        <Route path="/user" element={<UsersListingPage />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
