import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import TodoCard from "../components/TodoCard";
import Loader from "../components/Loader";

export default function Dashboard() {
  const { token, user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // ✅ Fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        setTodos(res.data.data || []);
      } else {
        setTodos([]);
        console.warn("Fetch warning:", res.data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  // ✅ Add or Update Todo
  const addOrUpdateTodo = async (e) => {
  e.preventDefault();
  if (!form.title.trim()) return setMsg("Title is required");

  try {
    if (editing) {
      // ✅ Update by sending title & description in body
      await api.put(
        "/api/todos",
        { title: form.title, description: form.description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditing(null);
    } else {
      // ✅ Add new todo
      await api.post("/api/todos", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setForm({ title: "", description: "" });
    setMsg("");
    fetchTodos();
  } catch (err) {
    console.error(err);
    setMsg("Operation failed");
  }
};


  // ✅ Start Editing
  const startEdit = (todo) => {
    setEditing(todo);
    setForm({ title: todo.title, description: todo.description });
  };

  // ✅ Delete Todo


const deleteTodo = async (id) => {
  try {
    const res = await api.delete(`/api/todos/${id}`);
    if (res.status === 200) {
      setTodos((prev) => prev.filter((t) => t._id !== id));
    }
  } catch (error) {
    console.error("Delete failed:", error.response?.data || error.message);
  }
};



  // ✅ Toggle Completion
const toggleComplete = async (todo) => {
  try {
    // ✅ Update todo’s completion by title
    await api.put(
      "/api/todos",
      { title: todo.title, completed: !todo.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTodos();
  } catch (err) {
    console.error("Failed to toggle completion:", err);
  }
};


  if (loading) return <Loader />;

  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.length - completed;

  return (
    <div className="pt-20 max-w-6xl mx-auto px-6 pb-16 overflow-y-auto">
      <h1 className="text-3xl font-bold text-teal-300 mb-4">
        Welcome, {user?.username || "User"}
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatBox title="Total" value={todos.length} color="text-teal-300" />
        <StatBox title="Completed" value={completed} color="text-green-400" />
        <StatBox title="Pending" value={pending} color="text-yellow-400" />
      </div>

      {/* Add / Update Form */}
      <form
        onSubmit={addOrUpdateTodo}
        className="bg-gray-900 p-4 rounded-xl mb-6 border border-gray-800"
      >
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="flex-1 p-3 rounded-md bg-gray-800 outline-none text-white"
          />
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Description"
            className="flex-1 p-3 rounded-md bg-gray-800 outline-none text-white resize-none min-h-[60px]"
          />
          <button
            className={`px-4 py-2 rounded-md font-semibold text-white ${
              editing
                ? "bg-yellow-500 hover:bg-yellow-400"
                : "bg-teal-500 hover:bg-teal-400"
            }`}
          >
            {editing ? "Update" : "Add"}
          </button>
        </div>
        {msg && <div className="text-sm text-red-400 mt-2">{msg}</div>}
      </form>

      {/* Todo List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {todos.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            No todos yet — start adding one ✨
          </div>
        ) : (
          todos.map((t) => (
            <TodoCard
              key={t._id}
              todo={t}
              onEdit={startEdit}
              onDelete={deleteTodo}
              onToggle={toggleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ✅ Stats box
function StatBox({ title, value, color }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <p className="text-sm text-gray-400">{title}</p>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
