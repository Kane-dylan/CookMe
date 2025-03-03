import { CodeBlock } from "./ui/code-block";

export default function MarkdownEditor({ value, onChange }) {
  return (
    <div className="w-full h-80">
      <CodeBlock
        language="markdown"
        code={value}
        onChange={onChange}
        className="h-full"
      />
    </div>
  );
}
