// src/components/TodoCard.jsx
export default function TodoCard({ todo, onEdit, onDelete, onToggle }) {
  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        todo.completed
          ? "border-green-500/40 bg-green-800/20"
          : "border-gray-700 bg-gray-800/40"
      }`}
    >
      <div className="flex justify-between items-start flex-wrap gap-3">
        {/* 📝 Todo Info */}
        <div className="flex-1 min-w-[60%] break-words">
          <h3
            className={`text-lg font-semibold ${
              todo.completed ? "line-through text-gray-500" : "text-white"
            }`}
          >
            {todo.title}
          </h3>
          <p className="text-gray-400 break-words whitespace-pre-wrap mt-1">
            {todo.description}
          </p>
        </div>

        {/* 🎛️ Actions */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onToggle(todo)}
            className={`px-3 py-1 rounded-md text-sm ${
              todo.completed
                ? "bg-green-700 text-white"
                : "bg-teal-500 hover:bg-teal-400 text-white"
            }`}
          >
            {todo.completed ? "Completed" : "Mark Done"}
          </button>

          <button
            onClick={() => onEdit(todo)}
            className="px-3 py-1 rounded-md bg-yellow-500 hover:bg-yellow-400 text-sm text-white"
          >
            Edit
          </button>

          <button
           onClick={() => onDelete(todo._id)}
            className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-400 text-sm text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
