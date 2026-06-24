export function Button({ children, onClick, className, variant }) {
  const base = "px-4 py-2 rounded-lg font-semibold transition";
  const styles =
    variant === "secondary"
      ? "bg-gray-700 hover:bg-gray-600"
      : "bg-teal-500 hover:bg-teal-400";
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className || ""}`}>
      {children}
    </button>
  );
}
