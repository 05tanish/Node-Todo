import { useState } from "react";

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "http://localhost:5002/api/auth/login"
        : "http://localhost:5002/api/auth/register";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      if (isLogin) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        onAuthSuccess(data.data.user);
      } else {
        alert("Registration successful! Please login now.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-[400px]">
      <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">
        {isLogin ? "🔐 Login" : "📝 Register"}
      </h2>

      {!isLogin && (
        <>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full mb-3 p-3 bg-gray-800 rounded-lg"
            onChange={handleChange}
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="w-1/2 mb-3 p-3 bg-gray-800 rounded-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="w-1/2 mb-3 p-3 bg-gray-800 rounded-lg"
              onChange={handleChange}
            />
          </div>
          <input
            type="number"
            name="phonenumber"
            placeholder="Phone Number"
            className="w-full mb-3 p-3 bg-gray-800 rounded-lg"
            onChange={handleChange}
          />
        </>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full mb-3 p-3 bg-gray-800 rounded-lg"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full mb-3 p-3 bg-gray-800 rounded-lg"
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-lg mb-4"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <p className="text-center text-sm text-gray-400">
        {isLogin ? "New here?" : "Already have an account?"}{" "}
        <span
          className="text-teal-400 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an account" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default Auth;
