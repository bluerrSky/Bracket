import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Ensure it exists (good practice)
if (!API_BASE_URL) {
    console.error("VITE_API_BASE_URL is not defined! API calls will fail.");
}
// 1. Create the context
// This is the object that components will subscribe to for auth changes.
const AuthContext = createContext();

// 2. Create the provider component
// This component will wrap your application and manage all authentication state.
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start in a loading state

    // This effect runs only once when the AuthProvider is first mounted.
    // Its job is to check if a user session already exists on the server.
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                // Make an API call to the backend endpoint that checks for an active session.
                const { data } = await axios.get(`${API_BASE_URL}/check-auth`, {
                    withCredentials: true, // Important: This sends the session cookie
                });

                if (data.success) {
                    setUser(data.user); // If a session exists, set the user in our state.
                }
            } catch (err) {
                // If the request fails (e.g., 401 Unauthorized), it means no one is logged in.
                console.log("No active session found.");
                setUser(null); // Ensure user is null if no session is found
            } finally {
                // No matter the outcome, the initial check is complete.
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []); // The empty dependency array [] ensures this effect runs only once.

    // Function to update state upon successful login or signup
    const login = (userData) => {
        setUser(userData);
    };

    // Function to clear user state upon logout
    const logout = () => {
        // In a real app, you would also call a backend endpoint to destroy the session.
        // For example: await axios.post('http://localhost:8080/logout');
        setUser(null);
    };

    // The value object holds the state and functions that will be available to all children.
    const value = {
        user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Create a custom hook for easy access to the context
// This simplifies consuming the context in other components.
export function useAuth() {
    return useContext(AuthContext);
}