import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="text-white" style={{ backgroundColor: "#1f2123" }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
          {/* Logo */}
          <h1 className="text-xl font-bold">📝SimpleNote</h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/contact" className="hover:underline">Contact Us</Link>
            <Link to="/help" className="hover:underline">Help</Link>
            <Link to="/blog" className="hover:underline">Blog</Link>
            <Link to="/Login" className="hover:underline">Log In</Link>
            <Link to="/signup">
              <button className="bg-blue-600 px-4 py-2 rounded-lg">Sign Up</button>
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col space-y-1 focus:outline-none"
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div
            className="md:hidden flex flex-col space-y-4 px-6 pb-6"
            style={{ backgroundColor: "#1f2123" }}
          >
            <Link to="/contact" className="hover:underline">Contact Us</Link>
            <Link to="/help" className="hover:underline">Help</Link>
            <Link to="/blog" className="hover:underline">Blog</Link>
            <Link to="https://simplenote-6msa.onrender.com/Login" className="hover:underline">Log In</Link>
            <Link to="https://simplenote-6msa.onrender.com/signup">
              <button className="bg-blue-600 px-4 py-2 rounded-lg">Sign Up</button>
            </Link>
          </div>
        )}
      </header>
  );
}
