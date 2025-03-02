export default function MarkdownEditor({ value, onChange }) {
  return (
    <textarea
      className="w-full h-80 p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white overflow-auto"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
