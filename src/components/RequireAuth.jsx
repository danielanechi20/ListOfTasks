import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/config";

function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);
  let location = useLocation();

  if (loading) {
    return <div>Loading</div>;
  }
  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
