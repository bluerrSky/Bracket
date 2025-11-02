import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Signup.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Ensure it exists (good practice)
if (!API_BASE_URL) {
    console.error("VITE_API_BASE_URL is not defined! API calls will fail.");
}

// --- API call for registering a new user ---
const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "An unexpected error occurred.");
    }
    return data;
};

// --- NEW: API call for logging in ---
const loginUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "An unexpected error occurred.");
    }
    return data;
};


export default function SignUp() {
    // --- NEW: State to toggle between Login and Signup ---
    // We default to true (Login mode) since the route is /login
    const [isLoginMode, setIsLoginMode] = useState(true);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    // --- Renamed to registerMutation ---
    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log("User registered successfully!", data);
            login(data.user); // Update global state
            navigate('/'); // Redirect to homepage
        },
        onError: (error) => {
            console.error("Registration failed:", error.message);
        },
    });

    // --- NEW: Mutation for logging in ---
    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log("User logged in successfully!", data);
            login(data.user); // Update global state
            navigate('/'); // Redirect to homepage
        },
        onError: (error) => {
            console.error("Login failed:", error.message);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // --- NEW: Check which mode we are in ---
        if (isLoginMode) {
            // Only send username (from 'name' field) and password
            loginMutation.mutate({
                username: formData.name,
                password: formData.password
            });
        } else {
            // Send all fields for registration
            registerMutation.mutate({
                username: formData.name,
                email: formData.email,
                password: formData.password
            });
        }
    };

    // --- NEW: Helper variables for dynamic loading/error states ---
    const isLoading = loginMutation.isPending || registerMutation.isPending;
    const isError = loginMutation.isError || registerMutation.isError;
    const error = loginMutation.error || registerMutation.error;

    return (
        <div className={styles.mainContainer}>
            <div className={styles.signContainer}>
                <div className={styles.left}></div>
                <div className={styles.right}>
                    {/* --- NEW: Dynamic Header --- */}
                    <div className={styles.formHeader}>
                        {isLoginMode ? "Welcome Back!" : "Create an account"}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Name (Username)" // Clarified placeholder
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isLoading} 
                        />
                        
                        {/* --- NEW: Conditionally show Email input --- */}
                        {!isLoginMode && (
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email" 
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        )}

                        <input 
                            type="password" 
                            name="password"
                            placeholder="Enter your password" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />

                        {/* --- NEW: Unified Error/Loading messages --- */}
                        {isLoading && <p className={styles.loading}>Working on it...</p>}
                        {isError && <p className={styles.error}>{error.message}</p>}
                        
                        <button type="submit" disabled={isLoading}>
                            {isLoginMode ? "Log In" : "Create account"}
                        </button>
                    </form>

                    {/* --- NEW: Toggle Button --- */}
                    <p className={styles.toggleMode} onClick={() => setIsLoginMode(!isLoginMode)}>
                        {isLoginMode 
                            ? "Don't have an account? Sign up" 
                            : "Already have an account? Log in"}
                    </p>
                </div>
            </div>
        </div>
    );
}