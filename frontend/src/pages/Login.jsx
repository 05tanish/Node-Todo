import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", form);
      const { token, user } = res.data.data;
      login(token, user);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md bg-gray-900/80 border border-gray-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-teal-300 mb-2 text-center">Welcome Back</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">Login to your account</p>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="email"
            value={form.email}
            onChange={handle}
            placeholder="Email"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl outline-none"
            required
          />

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
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 py-3 rounded-xl text-white font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-teal-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
