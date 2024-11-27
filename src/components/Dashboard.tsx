import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 mt-16"> {/* Adjusted for Sidebar and Navbar */}
        <Navbar />
        <div className="p-6 bg-background flex-1 overflow-auto">
          {/* Render the nested content (like TestSeries) here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

