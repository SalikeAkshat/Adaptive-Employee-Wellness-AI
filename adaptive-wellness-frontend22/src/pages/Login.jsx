import React, { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      navigate("/dashboard");
    } catch {
      setError("Invalid login credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-cyan-400">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
