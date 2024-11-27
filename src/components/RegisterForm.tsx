import React, { useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // const response = await axios.post('http://localhost:3000/api/auth/signup', {

      const response = await axios.post('https://agrivisionbackend.onrender.com/api/auth/signup', {
        name,
        email,
        password,
      });

      // If registration is successful, navigate to login page or home
      if (response.data) {
        console.log('Registration successful');
        navigate('/dashboard'); // Redirect to login page or another page after successful registration
      }
    }
    catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Display the error message if it's an Axios error
        const errorMessages = err.response?.data.errors;
        if (errorMessages && Array.isArray(errorMessages)) {
          setError(errorMessages.join(' | '));
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        // Handle unexpected errors
        setError('An error occurred. Please try again later.');
      }
      console.error(err);
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
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Show error message */}
        
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 mb-4 border rounded-md focus:outline-primary focus:ring-2 focus:ring-primary"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 mb-4 border rounded-md focus:outline-primary focus:ring-2 focus:ring-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-4 border rounded-md focus:outline-primary focus:ring-2 focus:ring-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 mb-6 border rounded-md focus:outline-primary focus:ring-2 focus:ring-primary"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-primary text-white py-3 rounded-md hover:bg-secondary transition-all duration-300"
          onClick={handleSubmit}
        >
          Register
        </motion.button>

        <p className="mt-6 text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
