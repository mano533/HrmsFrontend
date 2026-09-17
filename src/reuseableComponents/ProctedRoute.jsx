import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import useBrowserStorage from "../Hooks/UserBrowserStorage";

function ProtectedRoute({ children }) {
  const { sessionStorageHandeler } = useBrowserStorage(); // fixed naming
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorageHandeler("get", "logedInUser");

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, sessionStorageHandeler]); // include navigate for linting consistency

  return children;
}

export default ProtectedRoute;
