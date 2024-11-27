import { useState, useEffect } from "react";
import axios from "axios";

interface UserProfile {
  name: string;
  email: string;
  profilePicture: string | null;
}

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log("Dropdown toggled, isOpen:", !isDropdownOpen);
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Token:", token);
      if (!token) {
        console.error("No token found");
        return;
      }

      // const response = await axios.get("http://localhost:3000/api/user/profile", {

      const response = await axios.get("https://agrivisionbackend.onrender.com/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched user profile:", response.data);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (isDropdownOpen && !userProfile) {
      fetchUserProfile();
    }
  }, [isDropdownOpen, userProfile]);

  return (
    <div className="bg-white shadow-md w-full h-16 flex items-center justify-between px-6 fixed top-0 left-0 z-50">
      <div className="text-2xl font-bold text-secondary">GATE XE</div>
      <div className="flex items-center space-x-4">
        <button className="text-secondary">CFTRI</button>
        <div className="relative">
          <button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
            onClick={toggleDropdown}
          >
            Profile
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-40">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setIsProfileModalOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                View Profile
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Modal for User Profile */}
      {isProfileModalOpen && userProfile && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">User Profile</h2>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-red-500"
              >
                Close
              </button>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                {userProfile ? (
                  <>
                    <img
                      src="https://img.freepik.com/premium-photo/user-profile-icon_861346-90592.jpg?w=740"
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-medium">{userProfile.name}</p>
                      <p className="text-gray-500">{userProfile.email}</p>
                    </div>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
