import React from "react";
import axios from "axios";

const TodoList = ({ todos, onUpdate }) => {
  const token = localStorage.getItem("token");

  const handleDelete = async (title) => {
    await axios.delete("http://localhost:8000/api/todo", {
      headers: { Authorization: `Bearer ${token}` },
      data: { title },
    });
    onUpdate();
  };

  return (
    <div className="space-y-3">
      {todos.length === 0 ? (
        <p className="text-gray-400 text-center">No todos yet 😴</p>
      ) : (
        todos.map((todo, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-white/10 p-4 rounded-lg hover:bg-white/20 transition"
          >
            <div>
              <h2 className="font-semibold">{todo.title}</h2>
              <p className="text-sm text-gray-300">{todo.description}</p>
            </div>
            <button
              onClick={() => handleDelete(todo.title)}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
