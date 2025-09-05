import React from "react";
import { useNavigate } from "react-router-dom";

function PageNavbar({ onSearch }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className="flex items-center justify-between px-6 py-3 border-b border-gray-700 text-white"
      style={{ backgroundColor: "#1f2123" }}
    >
      {/* Left: Brand */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">All Notes</h1>
      </div>

      {/* Middle: Search */}
      <div className="flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search notes and tags"
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: User Info + Logout */}
      <div className="flex items-center space-x-4">
        <span className="hidden md:inline text-gray-300">
          {user?.firstName} {user?.lastName}
        </span>
        <button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default PageNavbar;
