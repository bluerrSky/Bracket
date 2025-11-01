import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate
import { useAuth } from "../../context/AuthContext"; // 👈 Import useAuth
import styles from "./Signup.module.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Ensure it exists (good practice)
if (!API_BASE_URL) {
    console.error("VITE_API_BASE_URL is not defined! API calls will fail.");
}
const registerUser = async (userData) => {
    // ... your fetch logic remains the same
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate(); // 👈 Initialize useNavigate
    const { login } = useAuth(); // 👈 Get the login function from our context

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            // This runs on a successful API call
            console.log("User registered successfully!", data);

            // 👇 --- THIS IS THE NEW LOGIC --- 👇
            // 1. Update the global state with the user's data
            login(data.user); 

            // 2. Redirect to the homepage
            navigate('/');
        },
        onError: (error) => {
            console.error("Registration failed:", error.message);
        },
    });

    const handleChange = (e) => {
        // ... this function remains the same
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        // ... this function remains the same
        e.preventDefault();
        const userData = {
            username: formData.name,
            email: formData.email,
            password: formData.password
        };
        mutation.mutate(userData);
    };

    return (
        // ... your JSX remains the same
                <div className={styles.mainContainer}>
            <div className={styles.signContainer}>
                <div className={styles.left}></div>
                <div className={styles.right}>
                    <div className={styles.formHeader}>Create an account</div>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={mutation.isLoading} // Disable inputs during submission
                        />
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={mutation.isLoading}
                        />
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Enter your password" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={mutation.isLoading}
                        />

                        {/* --- Display messages using mutation state --- */}
                        {mutation.isLoading && <p className={styles.loading}>Creating account...</p>}
                        {/* Error message is now simpler as we throw a standard Error object */}
                        {mutation.isError && <p className={styles.error}>{mutation.error.message}</p>}
                        {mutation.isSuccess && <p className={styles.success}>{mutation.data.message}</p>}
                        
                        <button type="submit" disabled={mutation.isLoading}>
                            {mutation.isPending ? "Creating..." : "Create account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}