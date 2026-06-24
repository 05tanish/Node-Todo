import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold text-teal-300">📝 MyTodo</Link>
          <span className="text-sm text-gray-400 hidden sm:inline">Organize, focus, finish.</span>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-300 hover:text-teal-300">Login</Link>
              <Link to="/register" className="text-teal-300 font-semibold">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-teal-300">Dashboard</Link>
              <Link to="/profile" className="text-gray-300 hover:text-teal-300">Profile</Link>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-white">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
