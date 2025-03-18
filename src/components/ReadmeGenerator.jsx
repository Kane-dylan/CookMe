import { useState, useEffect } from "react";
import { useGeminiAPI } from "../hooks/useGeminiAPI"; // Import the hook

export default function ReadmeGenerator({ setMarkdown }) {
  const [repoUrl, setRepoUrl] = useState("");
  const { loading, error: apiError, generateReadme } = useGeminiAPI();
  const [error, setError] = useState("");
  const [apiKeyStatus, setApiKeyStatus] = useState("unknown");

  // Check if API key is available
  useEffect(() => {
    const checkApiKey = () => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setApiKeyStatus("missing");
        console.warn("Gemini API Key is missing in environment variables");
      } else {
        setApiKeyStatus("available");
        console.log("Gemini API Key is available");
      }
    };

    checkApiKey();
  }, []);

  // Format repository URL to extract just the username/repo part
  const formatRepositoryName = (input) => {
    try {
      // Remove any whitespace
      input = input.trim();

      // Check if it's already in the correct username/repo format
      if (/^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(input)) {
        return input;
      }

      // Handle full GitHub URLs
      if (input.includes("github.com")) {
        // Parse the URL to extract the pathname
        let url;
        try {
          url = new URL(input);
        } catch {
          // If it's not a valid URL, try adding https:// prefix
          url = new URL(`https://${input}`);
        }

        // Extract the pathname and remove leading/trailing slashes
        let path = url.pathname.replace(/^\/|\/$/g, "");

        // Remove .git extension if present
        path = path.replace(/\.git$/, "");

        return path;
      }

      // Remove .git extension if the user just entered something like username/repo.git
      return input.replace(/\.git$/, "");
    } catch (err) {
      console.error("Error formatting repository name:", err);
      return input; // Return original input if there's an error
    }
  };

  const customPrompt = `I need you to generate a README.md file for my GitHub repository: ${formatRepositoryName(
    repoUrl
  )}

Please create a README with a modern, visually appealing style using emojis and clean formatting. Follow this exact structure:

1. Start with a large emoji related to the project theme followed by the project name as an H1 heading
2. Write a concise 1-2 sentence description of what the project does

3. Create an "## 🚀 Features" section with:
   - Each feature on its own line starting with "✅ "
   - Bold feature names followed by a brief description
   - Features separated by double spaces for proper line breaks

4. Create a "## 🛠️ Technologies Used" section with:
   - Each technology on its own line starting with "🔹 "
   - Bold technology names followed by a brief description of how it's used
   - Technologies separated by double spaces

5. Create a "## 🎯 Getting Started" section with:
   - Numbered steps using emoji numbers (1️⃣, 2️⃣, 3️⃣, etc.)
   - Include code blocks for all commands using \`\`\`sh format
   - Clear, concise instructions

6. If applicable, add a "## 🌎 Deployment" section with simple deployment instructions

7. End with a "## 🤝 Contributions & Feedback" section that:
   - Uses friendly, encouraging language
   - Has checkmarks (✅) for different ways to contribute
   - Includes emojis throughout
   - Links to the GitHub repo

Use double spaces at the end of lines where you want line breaks to appear properly in markdown.

Keep the entire README positive, modern, and energetic. Use emojis liberally but purposefully to enhance readability, not distract from it.`;

  const handleGenerateReadme = async () => {
    if (!repoUrl.trim()) {
      setError("Please enter a repository name or URL");
      return;
    }

    if (apiKeyStatus === "missing") {
      setError(
        "API key is missing. The README generator cannot function without it."
      );
      return;
    }

    const formattedRepo = formatRepositoryName(repoUrl);
    console.log(`Generating README for repository: ${formattedRepo}`);

    setError("");
    try {
      // We create a custom prompt with the properly formatted repository name
      const customPromptWithFormattedRepo = customPrompt.replace(
        formatRepositoryName(repoUrl),
        formattedRepo
      );

      const result = await generateReadme(customPromptWithFormattedRepo);
      if (result) {
        setMarkdown(result);
      } else {
        setError("Failed to generate README. Check API key & quota.");
      }
    } catch (err) {
      setError(`Failed to generate README: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
      {apiKeyStatus === "missing" && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
          <strong>⚠️ API Key Missing:</strong> The Gemini API key is not set in
          environment variables. README generation will not work until this is
          fixed.
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="repoUrl"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Repository Name or URL
        </label>
        <input
          id="repoUrl"
          type="text"
          placeholder="e.g., username/repository or https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter either a full GitHub URL or just the username/repository format.
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          This will generate a modern README with:
        </p>
        <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5 space-y-1">
          <li>Eye-catching emoji header</li>
          <li>Concise project description</li>
          <li>Features section with checkmarks</li>
          <li>Technologies used with bullet points</li>
          <li>Getting started guide with numbered steps</li>
          <li>Deployment instructions (if applicable)</li>
          <li>Contribution guidelines with friendly language</li>
        </ul>
      </div>

      <button
        onClick={handleGenerateReadme}
        className={`w-full mt-2 px-4 py-2 rounded-lg text-white ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading || apiKeyStatus === "missing"}
      >
        {loading
          ? "Creating Modern README..."
          : "Generate Modern README with Emojis"}
      </button>

      {(error || apiError) && (
        <p className="text-red-500 mt-2">{error || apiError}</p>
      )}
    </div>
  );
}
