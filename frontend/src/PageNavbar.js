import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

function PageNavbar({ onSearch }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      className="flex items-center justify-between px-6 py-3 border-b border-gray-700 text-white relative"
      style={{ backgroundColor: "#1f2123" }}
    >
      {/* Left: Brand + Toggle button */}
      <div className="flex items-center space-x-4">
        {/* Toggle Menu button (mobile only) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <h1 className="text-xl font-bold">All Notes</h1>
      </div>

      {/* Middle: Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search notes and tags"
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Search icon on mobile */}
      <div className="md:hidden flex items-center space-x-4">
        <button
          className="text-2xl"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <FiSearch />
        </button>
      </div>

      {/* Right: User Info + Logout */}
      <div className="hidden md:flex items-center space-x-4">
        <span className="text-gray-300">
          {user?.firstName} {user?.lastName}
        </span>
        <button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>

      {/* Mobile Full Search Box */}
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#1f2123] flex items-center px-4 z-50">
          <input
            type="text"
            autoFocus
            placeholder="Search notes and tags"
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="ml-2 text-2xl"
            onClick={() => setIsSearchOpen(false)}
          >
            <FiX />
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-[#1f2123] border-t border-gray-700 p-4 flex flex-col space-y-3 md:hidden z-40">
          <span className="text-gray-300">
            {user?.firstName} {user?.lastName}
          </span>
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default PageNavbar;
