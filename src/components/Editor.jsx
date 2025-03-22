import { CodeBlock } from "./ui/code-block";

export default function MarkdownEditor({ value, onChange }) {
  return (
    <CodeBlock
      language="markdown"
      code={value}
      onChange={onChange}
      className="w-full h-full p-4 font-mono text-sm border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Start typing your markdown here..."
      spellCheck="false"
    />
  );
}

// "use client";

// import { CodeBlock } from "./ui/code-block";

// // This is a placeholder component - you would implement your actual editor here
// export default function MarkdownEditor({ value, onChange }) {
//   return (
//     <CodeBlock
//       className="w-full h-full p-6 font-mono text-sm resize-none focus:outline-none dark:bg-gray-800 dark:text-gray-200"
//       value={value}
//       onChange={onChange}
//       placeholder="Start typing your markdown here..."
//     />
//   );
// }
