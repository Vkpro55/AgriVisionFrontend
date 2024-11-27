import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");  // State to store email
  const [password, setPassword] = useState("");  // State to store password
  const [error, setError] = useState("");  // State to store error message
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a POST request to the backend login API
      const response = await axios.post("https://agrivisionbackend-1.onrender.com/api/auth/login", {
        email,
        password,
      });

      // If login is successful (check if token exists in the response)
      if (response.data.token) {
        // Store the token (you might store it in localStorage or context)
        localStorage.setItem("authToken", response.data.token);
        console.log(localStorage);
        
        // Navigate to the dashboard after successful login
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Check if error is an AxiosError
        const errorMessages = err.response?.data.errors;
        
        if (errorMessages && Array.isArray(errorMessages)) {
          // If there are validation errors, display the first one
          setError(errorMessages.join(" | "));
        } else {
          // If no specific validation errors, show a generic error
          setError("Login failed. Please check your credentials.");
        }
      } else {
        // Handle non-Axios errors (e.g., network or unexpected errors)
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}  {/* Show error message */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 mb-4 border rounded-md focus:outline-primary focus:ring-2 focus:ring-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-6 border rounded-md focus:outline-primary focus:ring-2 focus:ring-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-primary text-white py-3 rounded-md hover:bg-secondary transition-all duration-300"
          onClick={handleLogin}
        >
          Login
        </motion.button>
        <p className="mt-6 text-sm text-center">
          Don't have an account?{" "}
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
