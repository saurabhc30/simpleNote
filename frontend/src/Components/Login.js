import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://simplenote-6msa.onrender.com/api/users/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/notes");
    } catch (error) {
      setError("Invalid username or password");
      console.error("Failed to login:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#1f2123" }}
    >
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-white text-center mb-6">Log In</h3>

        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-300 mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          >
            Log In
          </button>
        </form>

        {/* Signup / Forgot password */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          Not registered yet?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </div>
        <p className="text-center mt-3 text-gray-400 text-sm">
          Forgot{" "}
          <a href="#" className="text-blue-400 hover:underline">
            password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
