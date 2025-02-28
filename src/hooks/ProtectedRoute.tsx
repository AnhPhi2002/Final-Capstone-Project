// import { Navigate, Outlet } from "react-router";
// import { useAppSelector } from "@/hooks/reduxHooks";

// interface ProtectedRouteProps {
//   allowedRoles: { name: string }[];
//   redirectPath?: string;
// }

// const ProtectedRoute = ({ allowedRoles, redirectPath = "/log-in" }: ProtectedRouteProps) => {
//   const user = useAppSelector((state) => state.auth.user);

//   if (!user || !user.roles.some((role) => allowedRoles.some((allowedRole) => allowedRole.name === role.name))) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
