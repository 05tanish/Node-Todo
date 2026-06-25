import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ onTodoCreated }) => {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:8000/api/todo", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ title: "", description: "" });
    onTodoCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 bg-white/10 p-4 rounded-xl mb-6"
    >
      <input
        type="text"
        name="title"
        placeholder="Todo title..."
        value={form.title}
        onChange={handleChange}
        required
        className="flex-1 p-2 rounded bg-white/20 focus:bg-white/30 outline-none"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="flex-1 p-2 rounded bg-white/20 focus:bg-white/30 outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
