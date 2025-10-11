import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styles from "./Signup.module.css";

// --- The API call function now uses the native fetch API ---
const registerUser = async (userData) => {
    const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Manually stringify the request body
    });

    // We need to parse the JSON response body to access the data
    const data = await response.json();

    // fetch doesn't throw an error on bad HTTP status, so we check response.ok
    if (!response.ok) {
        // We throw an error with the message from the backend
        throw new Error(data.message || "An unexpected error occurred.");
    }

    return data; // On success, return the parsed data
};

export default function SignUp() {
    // 1. State for form data remains the same.
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // 2. --- TanStack Query replaces isLoading, error, and success states ---
    const mutation = useMutation({
        mutationFn: registerUser, // The function to call when submitting
        onSuccess: (data) => {
            // This runs on a successful API call (HTTP 2xx)
            console.log("User registered successfully!", data);
            // You can add logic here to redirect the user, e.g., navigate('/login');
        },
        onError: (error) => {
            // This runs when the API call fails
            console.error("Registration failed:", error.message);
        },
    });

    // 3. Handle input changes (this logic doesn't change)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 4. Handle form submission (now much simpler)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Call mutation.mutate to trigger the API call with the form data
        const userData = {
            username: formData.name, // Use 'username' as per backend
            email: formData.email,
            password: formData.password
        };
        mutation.mutate(userData);
    };

    return (
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
                            {mutation.isLoading ? "Creating..." : "Create account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

