export function Input({ className, ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-gray-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-teal-500 ${className || ""}`}
    />
  );
}
