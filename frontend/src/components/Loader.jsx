export default function Loader({ text = "Loading..." }) {
  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="text-gray-400">{text}</div>
    </div>
  );
}
