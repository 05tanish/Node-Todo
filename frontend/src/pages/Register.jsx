import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErr("");
    setSuccess("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    // quick validation before calling backend
    if (!form.username || !form.firstname || !form.lastname || !form.email || !form.password) {
      setErr("⚠️ All required fields must be filled");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", form);

      if (res.data?.status === "success") {
        setSuccess("✅ Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setErr(res.data?.message || "Registration failed. Try again.");
      }
    } catch (error) {
      // handle backend / network / validation errors
      if (error.response) {
        const msg =
          error.response.data?.message ||
          (error.response.status === 400
            ? "Invalid input. Please check your details."
            : error.response.status === 409
            ? "User already exists. Try logging in instead."
            : "Something went wrong. Please try again.");
        setErr("❌ " + msg);
      } else {
        setErr("⚠️ Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-gray-900/80 border border-gray-800 p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-teal-300 mb-2 text-center">
          Create Account
        </h2>
        <p className="text-sm text-gray-400 mb-6 text-center">
          Sign up and start organizing
        </p>

        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstname"
              value={form.firstname}
              onChange={handle}
              placeholder="First name *"
              className="p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none"
              required
            />
            <input
              name="lastname"
              value={form.lastname}
              onChange={handle}
              placeholder="Last name *"
              className="p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none"
              required
            />
          </div>

          <input
            name="username"
            value={form.username}
            onChange={handle}
            placeholder="Username *"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handle}
            placeholder="Email *"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none"
            required
          />
          <input
            name="phonenumber"
            value={form.phonenumber}
            onChange={handle}
            placeholder="Phone number"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none"
          />
           {/* 👁️ Password Input with Show/Hide */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handle}
              placeholder="Password"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

    

          {err && <div className="text-red-400 text-sm">{err}</div>}
          {success && <div className="text-green-400 text-sm">{success}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-teal-700 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600"
            } py-3 rounded-xl text-white font-semibold transition-all duration-200`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-300 hover:text-teal-400">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
