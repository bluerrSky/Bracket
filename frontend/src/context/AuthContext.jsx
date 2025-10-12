import { createContext, useState, useContext } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Initially, no user is logged in

    // This function will be called on successful signup to update the user state
    const login = (userData) => {
        setUser(userData);
    };

    // You can add a logout function for later
    const logout = () => {
        setUser(null);
    };

    // The value object holds the state and functions that will be available to other components
    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Create a custom hook for easy access to the context
export function useAuth() {
    return useContext(AuthContext);
}