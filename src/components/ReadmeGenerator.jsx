import { useState } from "react";
import { useGeminiAPI } from "../hooks/useGeminiAPI"; // Import the hook

export default function ReadmeGenerator({ setMarkdown }) {
  const [repoUrl, setRepoUrl] = useState("");
  const { loading, error: apiError, generateReadme } = useGeminiAPI();
  const [error, setError] = useState("");

  const customPrompt = `I need you to generate a README.md file for my GitHub repository: ${repoUrl}

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

    setError("");
    try {
      const result = await generateReadme(customPrompt);
      if (result) {
        setMarkdown(result);
      } else {
        setError("Failed to generate README. Check API key & quota.");
      }
    } catch (err) {
      setError("Failed to generate README. Check API key & quota.");
      console.error(err);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
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
        disabled={loading}
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
