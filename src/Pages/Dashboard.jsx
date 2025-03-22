"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaHome,
  FaFileExport,
  FaTrash,
  FaMagic,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import MarkdownEditor from "../components/Editor";
import Preview from "../components/Preview";
import ReadmeGenerator from "../components/ReadmeGenerator";

export default function Dashboard() {
  const [user] = useState({ name: "Stranger" });
  const [markdown, setMarkdown] = useState(() => {
    const savedMarkdown = localStorage.getItem("markdown");
    return (
      savedMarkdown ||
      "# Welcome to ReadMeAI\n\nStart typing to create your README, or use the AI generator to get started."
    );
  });
  const [editorMode, setEditorMode] = useState("split");
  const [repoUrl, setRepoUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to false for consistency
  const [isMobile, setIsMobile] = useState(false);
  const hasManuallyToggled = useRef(false);

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Only auto-close sidebar on mobile if not manually toggled
      if (mobile && !hasManuallyToggled.current && sidebarOpen) {
        setSidebarOpen(false);
      } else if (!mobile && !sidebarOpen && !hasManuallyToggled.current) {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [sidebarOpen]);

  // Save markdown to localStorage
  useEffect(() => {
    localStorage.setItem("markdown", markdown);
  }, [markdown]);

  const handleExport = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "README.md";
    link.click();
  };

  const handleClear = () => {
    if (
      confirm(
        "Are you sure you want to clear the editor? This cannot be undone."
      )
    ) {
      setMarkdown(
        "# Welcome to ReadMeAI\n\nStart typing to create your README, or use the AI generator to get started."
      );
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    hasManuallyToggled.current = true; // Mark as manually toggled
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-20 p-2 rounded-full bg-primary text-white shadow-lg"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-10 w-64 bg-white dark:bg-gray-800
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:block
          border-r border-gray-200 dark:border-gray-700 flex flex-col
        `}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-md font-bold text-gray-600 dark:text-gray-400">
            Welcome, {user.name}
          </h1>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700 overflow-auto">
          <ReadmeGenerator markdown={markdown} setMarkdown={setMarkdown} />
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-sm font-semibold mb-2">View Options</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setEditorMode("editor")}
                  className={`w-full flex items-center p-2 rounded-md ${
                    editorMode === "editor"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Editor Only
                </button>
              </li>
              <li>
                <button
                  onClick={() => setEditorMode("split")}
                  className={`w-full flex items-center p-2 rounded-md ${
                    editorMode === "split"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Split View
                </button>
              </li>
              <li>
                <button
                  onClick={() => setEditorMode("preview")}
                  className={`w-full flex items-center p-2 rounded-md ${
                    editorMode === "preview"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Preview Only
                </button>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-sm font-semibold mb-2">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaHome className="mr-2" />
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <FaFileExport className="mr-2" />
            Export README
          </button>
          <button
            onClick={handleClear}
            className="w-full flex items-center justify-center p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <FaTrash className="mr-2" />
            Clear Editor
          </button>

          <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            © {new Date().getFullYear()} ReadMeAI
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Toggle Button */}
        {/* <div className="hidden md:block p-2">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div> */}

        {/* Editor and Preview */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {(editorMode === "editor" || editorMode === "split") && (
            <div
              className={`${
                editorMode === "split" ? "md:w-1/2 h-1/2 md:h-full" : "flex-1"
              } overflow-auto`}
            >
              <div className="h-full">
                <MarkdownEditor value={markdown} onChange={setMarkdown} />
              </div>
            </div>
          )}

          {(editorMode === "preview" || editorMode === "split") && (
            <div
              className={`${
                editorMode === "split" ? "md:w-1/2 h-1/2 md:h-full" : "flex-1"
              } overflow-auto bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700`}
            >
              <div className="p-2 h-full bg-[#0d1117] rounded-lg">
                <Preview markdown={markdown} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
