import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdministrationPage from "./pages/AdministrationPage";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import PreOnboardingPage from "./pages/PerOnboarding/PreOnboardingPage";

// =====================================================
// ROLE PROTECTION
// =====================================================

function RoleRoute({ account, roles, children }) {
  // User is not logged in
  if (!account) {
    return <Navigate to="/login" replace />;
  }

  // User does not have permission
  if (roles && !roles.includes(account.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// =====================================================
// APP ROUTES
// =====================================================

export default function AppRoutes({ account, setAccount }) {
  console.log("account", account);

  const navigate = useNavigate();
  const location = useLocation();

  // ===================================================
  // LOGOUT
  // ===================================================

  const logout = () => {
    setAccount(null);
    navigate("/login", { replace: true });
  };

  return (
    <Routes>
      {/* =================================================
          LOGIN
      ================================================= */}

      <Route
        path="/login"
        element={
          account ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage
              onLogin={(user) => {
                setAccount(user);
                navigate("/", { replace: true });
              }}
            />
          )
        }
      />

      {/* =================================================
          ROOT

          Super Admin → /super-admin
          Admin       → /administration
          Employee    → /employee
          Manager     → /employee
      ================================================= */}

      <Route
        path="/"
        element={
          account ? (
            account.role === "Super Admin" ? (
              <Navigate to="/super-admin" replace />
            ) : account.role === "Admin" ? (
              <Navigate to="/administration" replace />
            ) : account.role === "Employee" ||
              account.role === "Manager" ? (
              <Navigate to="/employee" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* =================================================
          EMPLOYEE + MANAGER

          Both use the same Employee Dashboard
      ================================================= */}

      <Route
        path="/employee"
        element={
          <RoleRoute
            account={account}
            roles={["Employee", "Manager"]}
          >
            <EmployeeDashboard
              user={account}
              onLogout={logout}
            />
          </RoleRoute>
        }
      />

      {/* =================================================
          ADMINISTRATION

          Only Admin can access this page
      ================================================= */}

      <Route
        path="/administration"
        element={
          <RoleRoute
            account={account}
            roles={["Admin"]}
          >
            <AdministrationPage
              user={account}
              onLogout={logout}
            />
          </RoleRoute>
        }
      />



      <Route
        path="/super-admin/*"
        element={
          <RoleRoute
            account={account}
            roles={["Super Admin"]}
          >
            <SuperAdminDashboard
              role={account?.role}
              onLogout={logout}
            />
          </RoleRoute>
        }
      />

      {/* =================================================
          PRE-ONBOARDING

          All logged-in users can access this page

          Super Admin
          Admin
          Employee
          Manager
      ================================================= */}

      <Route
        path="/pre-onboarding"
        element={
          <RoleRoute account={account}>
            <PreOnboardingPage
              user={account}
              onLogout={logout}
            />
          </RoleRoute>
        }
      />

      <Route
        path="/PreOnboardingPage"
        element={<PreOnboardingPage />}
      />

      {/* =================================================
          NOT FOUND
      ================================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to={account ? "/" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}
