import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import EmployeeDashboard from "./pages/EmployeePage/EmployeeDashboard";
import AdministrationPage from "./pages/AdminPage/AdministrationPage";
import SuperAdminDashboard from "./pages/SuperAdminPage/SuperAdminDashboard";
// Role Route
const RoleRoute = ({ type, children }) => {
  const account = useSelector((state) => state?.userDetails?.userData);
  // No login details
  if (!account) {
    return <Navigate to="/login" replace />;
  }
  // Super Admin
  if (type === "superadmin" && Number(account.isSuperAdmin) === 1) {
    return children;
  }
  // Admin
  if (type === "admin" && Number(account.isAdmin) === 1) {
    return children;
  }
  // Employee
  if (type === "employee" && Number(account.isemployee) === 1) {
    return children;
  }
  // Unauthorized
  return <Navigate to="/" replace />;
};
const AppRoutes = () => {
  const account = useSelector((state) => state?.userDetails?.userData);
  console.log("Route Account:", account);
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<LoginPage />} />
      {/* Super Admin */}
      <Route
        path="/super-admin"
        element={
          <RoleRoute type="superadmin">
            <SuperAdminDashboard />
          </RoleRoute>
        }
      />
      {/* Admin */}
      <Route
        path="/admin"
        element={
          <RoleRoute type="admin">
            <AdministrationPage />
          </RoleRoute>
        }
      />
      {/* Employee */}
      <Route
        path="/employee"
        element={
          <RoleRoute type="employee">
            <EmployeeDashboard />
          </RoleRoute>
        }
      />
      {/* Default Route */}
      <Route
        path="/"
        element={
          !account ? (
            <Navigate to="/login" replace />
          ) : Number(account.isSuperAdmin) === 1 ? (
            <Navigate to="/super-admin" replace />
          ) : Number(account.isAdmin) === 1 ? (
            <Navigate to="/admin" replace />
          ) : Number(account.isemployee) === 1 ? (
            <Navigate to="/employee" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />{" "}
      {/* Invalid Route */}
      <Route path="*" element={<Navigate to="/login" replace />} />{" "}
    </Routes>
  );
};
export default AppRoutes;
