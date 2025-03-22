import ReactMarkdown from "react-markdown";
import "github-markdown-css";

export default function Preview({ markdown }) {
  return (
    <div className="w-full h-full rounded-lg p-4 bg-[#0d1117] dark:bg-gray-900 overflow-auto">
      <div className="markdown-body dark:text-white">
        <ReactMarkdown>
          {markdown || "*Live preview will appear here...*"}
        </ReactMarkdown>
      </div>
    </div>
  );
}