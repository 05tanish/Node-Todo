import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { Camera, Mail, Phone, User, Edit, Edit2, X  } from "lucide-react";



export default function Profile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-300">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="text-red-400 text-center mt-20 font-semibold">
        {error}
      </div>
    );

  if (!profile)
    return (
      <div className="text-gray-400 text-center mt-20">No profile data</div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center pt-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 px-4">
      <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-xl w-full max-w-2xl transition-all hover:shadow-2xl hover:border-teal-600">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={
                profile.avatar
                  ? profile.avatar
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-teal-500 object-cover"
            />
            <button className="absolute bottom-0 right-1 bg-teal-500 hover:bg-teal-600 p-2 rounded-full">
              <Camera size={18} />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-teal-400 mt-4">
            {profile.firstname} {profile.lastname}
          </h1>
          <p className="text-gray-400 text-sm">@{profile.username}</p>
        </div>

        {/* Info Section */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 bg-gray-800/60 px-4 py-3 rounded-lg">
            <Mail className="text-teal-400" size={20} />
            <span>{profile.email}</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-800/60 px-4 py-3 rounded-lg">
            <Phone className="text-teal-400" size={20} />
            <span>{profile.phonenumber}</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-800/60 px-4 py-3 rounded-lg">
            <User className="text-teal-400" size={20} />
            <span>User ID: {profile._id}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-between">
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 px-5 py-2.5 rounded-lg text-white transition">
            <Edit size={18} />
            Edit Profile
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-lg text-white transition">
            Logout
          </button>
        </div>
      </div>
      
    </div>
  );
}
