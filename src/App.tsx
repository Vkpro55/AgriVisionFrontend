import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import TestSeries from "./components/TestSeries";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login and Register routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Dashboard route with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested route for Test Series */}
          <Route path="test-series" element={<TestSeries />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
