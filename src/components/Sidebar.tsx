import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCalendarAlt, FaBook, FaClipboardList, FaStickyNote } from "react-icons/fa"; // Import icons

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { name: "My Progress", path: "/dashboard", icon: <FaUserCircle /> },
    { name: "Class Schedule", path: "/dashboard", icon: <FaCalendarAlt /> },
    { name: "My Course", path: "/dashboard", icon: <FaBook /> },
    { name: "Test Series", path: "/dashboard/test-series", icon: <FaClipboardList /> },
    { name: "Short Notes", path: "/dashboard", icon: <FaStickyNote /> },
  ];

  return (
    <div className="w-64 h-screen bg-secondary text-white flex flex-col fixed top-0 left-0 z-40">
      <div className="text-2xl font-bold py-4 px-6">Nest</div>
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center py-3 px-6 hover:bg-primary transition ${isActive ? "bg-primary" : ""}`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="px-6 py-4">
        <button
          onClick={handleLogout}
          className="bg-primary w-full py-2 rounded hover:bg-opacity-90 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
