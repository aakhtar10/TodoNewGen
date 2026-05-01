"use client";

import { useState } from "react";
import { loginUser, registerUser } from "@/lib/api";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      let res;

      if (isLogin) {
        res = await loginUser({
          email: form.email,
          password: form.password,
        });
      } else {
        res = await registerUser(form);
      }

      setMessage(res.message || "Success");
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#020617] border border-white/10 p-8 rounded-2xl shadow-2xl">
      
      {/* Title */}
      <h2 className="text-2xl font-semibold text-white text-center mb-6">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>

      {/* Name */}
      {!isLogin && (
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 bg-[#0f172a] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
        />
      )}

      {/* Email */}
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full mb-4 px-4 py-3 bg-[#0f172a] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
      />

      {/* Password */}
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full mb-4 px-4 py-3 bg-[#0f172a] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
      />

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium"
      >
        {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
      </button>

      {/* Message */}
      {message && (
        <p className="text-center mt-4 text-sm text-gray-400">{message}</p>
      )}

      {/* Toggle */}
      <p className="text-center mt-6 text-sm text-gray-400">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="ml-2 text-blue-400 hover:underline"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}