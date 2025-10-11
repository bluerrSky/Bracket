import { useState } from "react";
import axios from 'axios';
import styles from "./Signup.module.css";

export default function SignUp() {
    // 1. Use a single state object to manage all form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // 2. State for handling loading and errors
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // 3. Handle input changes and update the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 4. Handle form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior (page reload)
        e.preventDefault();

        // Reset previous states
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            // Make the POST request to your backend's signup route
            // The URL should match the one defined in your indRouter.js
            const response = await axios.post("http://localhost:8080/signup", {
                username: formData.name, // Use 'username' as per backend
                email: formData.email,
                password: formData.password
            });

            // Handle a successful response
            setSuccess(response.data.message);
            // You can redirect the user here if needed, e.g., navigate('/dashboard');

        } catch (err) {
            // Handle errors from the server
            // The backend returns a status and a message
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.signContainer}>
                <div className={styles.left}></div>
                <div className={styles.right}>
                    <div className={styles.formHeader}>Create an account</div>

                    <form onSubmit={handleSubmit}>
                        {/* Add name and value attributes to inputs */}
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Enter your password" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {/* Display loading, success, and error messages */}
                        {isLoading && <p>Loading...</p>}
                        {error && <p className={styles.error}>{error}</p>}
                        {success && <p className={styles.success}>{success}</p>}
                        
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}