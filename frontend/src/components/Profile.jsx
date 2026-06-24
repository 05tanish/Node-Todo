const Profile = ({ user, onBack, onLogout }) => {
  if (!user) return null;

  return (
    <div className="bg-gray-900 text-white p-8 rounded-2xl w-[400px] shadow-xl text-center">
      <h1 className="text-2xl font-bold text-teal-400 mb-4">👤 Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="flex justify-center gap-3 mt-6">
        <button onClick={onBack} className="bg-gray-700 px-4 py-2 rounded-md">
          ⬅️ Back
        </button>
        <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded-md">
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
