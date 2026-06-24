export function Card({ children, className }) {
  return (
    <div className={`p-6 bg-gray-800 rounded-2xl shadow-lg ${className || ""}`}>
      {children}
    </div>
  );
}
