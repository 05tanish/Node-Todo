import { useEffect, useState } from "react";

const TodoApp = ({ onProfile, onLogout }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTodos(data.data || []);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return alert("Title cannot be empty");
    try {
      await fetch("http://localhost:5002/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      setTitle("");
      setDescription("");
      getTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const deleteTodo = async (title) => {
    try {
      setTodos((prev) => prev.filter((t) => t.title !== title));
      await fetch("http://localhost:5002/api/todos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-8 rounded-2xl w-[500px] shadow-2xl">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-teal-400">🚀 Todo Dashboard</h1>
        <div className="flex gap-2">
          <button onClick={onProfile} className="bg-blue-500 px-3 py-1 rounded-md">
            👤
          </button>
          <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded-md">
            🚪
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Todo Title"
        className="w-full p-3 mb-3 bg-gray-800 rounded-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="w-full p-3 mb-3 bg-gray-800 rounded-lg"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={addTodo}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-lg mb-6"
      >
        ➕ Add Todo
      </button>

      <ul className="space-y-3">
        {todos.length ? (
          todos.map((todo, i) => (
            <li key={i} className="flex justify-between bg-gray-800 p-3 rounded-lg">
              <div>
                <p className="font-semibold">{todo.title}</p>
                <p className="text-sm text-gray-400">{todo.description}</p>
              </div>
              <button
                onClick={() => deleteTodo(todo.title)}
                className="bg-red-500 px-3 py-1 rounded-md"
              >
                🗑️
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No todos yet</p>
        )}
      </ul>
    </div>
  );
};

export default TodoApp;
