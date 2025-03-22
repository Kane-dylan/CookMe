import { useState, useEffect } from "react";
import { generateReadme } from "../utils/generateReadme"; // Import API function

export default function ReadmeGenerator({ markdown, setMarkdown }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validRepo, setValidRepo] = useState(null);

  // Function to format and validate repository URL
  const formatRepositoryUrl = (input) => {
    try {
      console.log("Original input URL:", input);

      // Remove whitespace
      let formattedInput = input.trim();
      console.log("Trimmed input:", formattedInput);

      // Remove trailing slash if present
      if (formattedInput.endsWith("/")) {
        formattedInput = formattedInput.slice(0, -1);
        console.log("Removed trailing slash:", formattedInput);
      }

      // Check if it's already in username/repo format
      if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(formattedInput)) {
        console.log("URL is already in username/repo format:", formattedInput);

        // Check for .git suffix even in simple format
        if (formattedInput.endsWith(".git")) {
          const withoutGit = formattedInput.slice(0, -4);
          console.log("Removed .git from simple format:", withoutGit);
          return withoutGit;
        }

        return formattedInput;
      }

      // Handle full GitHub URLs
      if (formattedInput.includes("github.com")) {
        console.log("URL contains github.com, parsing as URL");

        // Fix URL if it doesn't have protocol
        if (!formattedInput.startsWith("http")) {
          formattedInput = "https://" + formattedInput;
          console.log("Added https:// protocol:", formattedInput);
        }

        const url = new URL(formattedInput);
        const pathSegments = url.pathname.split("/").filter(Boolean);
        console.log("Path segments:", pathSegments);

        if (pathSegments.length >= 2) {
          // Get username and repo name from the URL path
          const username = pathSegments[0];
          let repoName = pathSegments[1];
          console.log("Extracted username:", username, "and repo:", repoName);

          // Remove .git extension if present
          if (repoName.endsWith(".git")) {
            repoName = repoName.slice(0, -4);
            console.log("Removed .git extension, new repo name:", repoName);
          }

          const result = `${username}/${repoName}`;
          console.log("Final formatted repository:", result);
          return result;
        }
      }

      console.log("URL format not recognized");
      throw new Error("Invalid repository format");
    } catch (error) {
      console.error("Error formatting repository URL:", error);
      return null;
    }
  };

  // Function to check if repository exists
  const checkRepository = async (formattedRepo) => {
    if (!formattedRepo) return false;

    try {
      const apiUrl = `https://api.github.com/repos/${formattedRepo}`;
      console.log("Checking repository existence at:", apiUrl);

      const response = await fetch(apiUrl);
      console.log("Repository check response status:", response.status);

      return response.ok;
    } catch (error) {
      console.error("Error checking repository:", error);
      return false;
    }
  };

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

    setLoading(true);
    setError("");
    console.log("Starting README generation process for:", repoUrl);

    try {
      // Format the repository URL
      const formattedRepo = formatRepositoryUrl(repoUrl);
      console.log("Formatted repository:", formattedRepo);

      if (!formattedRepo) {
        console.error("Repository formatting failed");
        throw new Error(
          "Invalid repository format. Please use username/repo or complete GitHub URL."
        );
      }

      // Check if repository exists
      console.log("Checking if repository exists...");
      const repoExists = await checkRepository(formattedRepo);
      console.log("Repository exists:", repoExists);

      if (!repoExists) {
        console.error("Repository not found:", formattedRepo);
        throw new Error(
          `Repository ${formattedRepo} not found. Please check the repository name and try again.`
        );
      }

      // Use the formatted repository URL in the prompt
      console.log("Original prompt contains repository:", repoUrl);
      const updatedPrompt = customPrompt.replace(repoUrl, formattedRepo);
      console.log("Updated prompt with formatted repository:", formattedRepo);

      // Generate README
      console.log("Calling generateReadme with updated prompt");
      const response = await generateReadme(updatedPrompt);
      console.log("README generation response received");

      setMarkdown(
        response?.candidates[0]?.content.parts[0]?.text || "No response"
      );
    } catch (err) {
      console.error("Error in handleGenerateReadme:", err);
      setError(
        err.message ||
          "Failed to generate README. Please check the repository URL or try again."
      );
      console.error(err);
    }

    setLoading(false);
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
        <p className="text-xs text-gray-500 mt-1">
          Accepted formats: username/repo, https://github.com/username/repo, or
          https://github.com/username/repo.git
        </p>
      </div>

      <button
        onClick={handleGenerateReadme}
        className={`sm:w-auto w-full mt-2 px-4 py-2 rounded-lg text-white ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading
          ? "Creating Modern README..."
          : "Generate Modern README 🚀"}
      </button>

      {error && (
        <div className="mt-3 p-3 border border-red-300 bg-red-50 rounded-md">
          <p className="text-red-600 font-medium mb-1">Error</p>
          <p className="text-red-500">{error}</p>

          {error.includes("404") || error.includes("not found") ? (
            <div className="mt-2">
              <p className="text-sm text-gray-700">Troubleshooting tips:</p>
              <ul className="text-sm text-gray-700 list-disc pl-5 mt-1">
                <li>Make sure the repository exists on GitHub</li>
                <li>Check for typos in the username or repository name</li>
                <li>Verify that the repository is public</li>
                <li>
                  Try using the format{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    username/repo
                  </code>{" "}
                  without .git
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
