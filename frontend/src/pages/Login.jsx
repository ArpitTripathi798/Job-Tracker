import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  /* ================= CLEAR OLD TOKEN ================= */
  useEffect(() => {
    // 🔥 very important: prevent fake/old login
    localStorage.removeItem("token");
  }, []);
  /* =================================================== */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/auth/login", form);

      console.log("LOGIN RESPONSE:", res.data);

      if (!res.data.token) {
        throw new Error("Token not received");
      }

      // ✅ Save fresh token
      localStorage.setItem("token", res.data.token);

      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      // ✅ Redirect only after successful login
      navigate("/dashboard");
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      // 🔥 Show real backend error message
      setError(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Job Tracker Login
        </h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
