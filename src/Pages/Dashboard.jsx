import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MarkdownEditor from "../components/Editor"; // Import Editor
import ReadmeGenerator from "../components/ReadmeGenerator"; // Import AI README Generator
import Preview from "../components/Preview"; // Import Preview component
import { Button } from "@/components/ui/moving-border";
// import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [user] = useState({ name: "John Doe" }); // Mock user data
  const [markdown, setMarkdown] = useState(() => {
    // Initialize state from localStorage or use default value
    const savedMarkdown = localStorage.getItem("markdown");
    return savedMarkdown || "# Welcome to the Editor";
  });

  const recentProjects = [
    { id: 1, title: "Markdown Editor", link: "/project/1" },
    { id: 2, title: "AI README Generator", link: "/project/2" },
  ];

  // Save to localStorage whenever markdown changes
  useEffect(() => {
    localStorage.setItem("markdown", markdown);
  }, [markdown]);

  // Function to export markdown as a file
  const handleExport = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "README.md";
    link.click();
  };

  // Function to clear the editor and localStorage
  const handleClear = () => {
    if (
      confirm(
        "Are you sure you want to clear the editor? This cannot be undone."
      )
    ) {
      setMarkdown("# Welcome to the Editor");
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Welcome, {user.name} 👋
      </h1>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/"
          className="p-4 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600"
        >
          Dashboard
        </Link>
      </div>

      {/* Markdown Editor & Preview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Editor
          </h2>
          <MarkdownEditor value={markdown} onChange={setMarkdown} />
        </div>

        {/* Preview */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Preview
          </h2>
          <Preview markdown={markdown} />
        </div>
      </div>

      {/* AI README Generator */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          AI README Generator
        </h2>
        <ReadmeGenerator setMarkdown={setMarkdown} />
      </div>

      {/* Export and Clear Buttons */}
      <div className="mt-6 flex space-x-4">
        <Button
          variant="destructive"
          onClick={handleExport}
          className="bg-yellow-500 hover:bg-green-600"
        >
          Export README.md
        </Button>
        <Button
          variant="destructive"
          onClick={handleClear}
          className="hover:bg-red-600"
        >
          Clear Editor
        </Button>
      </div>
    </div>
  );
}
