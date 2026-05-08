import React, { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(form);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-cyan-400">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 rounded bg-gray-700 outline-none"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700 outline-none"
          onChange={handleChange}
        />
        <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
