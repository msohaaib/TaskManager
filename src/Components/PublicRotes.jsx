import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../auth";

export default function PublicRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const u = await getCurrentUser();
      setUser(u);
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return null; // or a loader
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}
