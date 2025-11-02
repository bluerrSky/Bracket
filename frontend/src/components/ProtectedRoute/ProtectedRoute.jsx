// components/ProtectedRoute/ProtectedRoute.jsx (New File)

import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { user, loading } = useAuth();

    // 1. If the authentication check is still running, show a loading message.
    if (loading) {
        return <div>Loading...</div>; 
    }

    // 2. If the user is NOT logged in, redirect them to the login/signup page.
    if (!user) {
        // Redirects the user to the /login page
        return <Navigate to="/login" replace />; 
    }

    // 3. If the user IS logged in, render the child routes (the protected content).
    return <Outlet />;
}