import ReactMarkdown from "react-markdown";

export default function Preview({ markdown }) {
  return (
    <div className="w-full h-80 p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white overflow-auto">
      <ReactMarkdown>
        {markdown || "*Live preview will appear here...*"}
      </ReactMarkdown>
    </div>
  );
}
