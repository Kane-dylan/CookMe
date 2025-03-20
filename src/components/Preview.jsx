import ReactMarkdown from "react-markdown";
import "github-markdown-css"; // We'll need to install this package

export default function Preview({ markdown }) {
  return (
    <div className="w-full h-full rounded-lg bg-white dark:bg-gray-900 overflow-auto">
      <div className="markdown-body dark:text-white">
        <ReactMarkdown>
          {markdown || "*Live preview will appear here...*"}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// import ReactMarkdown from "react-markdown";

// export default function Preview({ markdown }) {
//   return (
//     <div className="markdown-preview prose dark:prose-invert max-w-none">
//       <ReactMarkdown>{markdown}</ReactMarkdown>
//     </div>
//   );
// }
