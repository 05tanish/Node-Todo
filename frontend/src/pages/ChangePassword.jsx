import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ChangePassword = () => {
  const { token } = useAuth();
  const [data, setData] = useState({ oldPassword: "", newPassword: "" });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.put("http://localhost:5002/api/user/change-password", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Password changed successfully!");
      setData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Error changing password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[450px]">
        <h2 className="text-2xl font-semibold text-center text-teal-400 mb-6">
          🔐 Change Password
        </h2>

        <div className="space-y-4">
          <input
            name="oldPassword"
            type="password"
            placeholder="Old Password"
            value={data.oldPassword}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={data.newPassword}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-lg mt-4 transition-all"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
