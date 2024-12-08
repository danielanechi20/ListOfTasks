import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "@/firebase/config";

function RequireAuth({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);
  let location = useLocation();

  if (loading) {
    return <div>Loading</div>;
  }
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
