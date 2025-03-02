import { useState } from "react";
import axios from "axios";

export default function ReadmeGenerator({ setMarkdown }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // 🔴 Replace with your actual API key

  const generateReadme = async () => {
    setLoading(true);
    setError("");

    try {
      // Fetch GitHub repo details
      const repoName = repoUrl.split("/").slice(-1)[0]; // Extract repo name from URL
      const response = await axios.get(
        `https://api.github.com/repos/${repoUrl.split("/").slice(-2).join("/")}`
      );

      const repoDetails = response.data;
      const prompt = `Generate a professional README.md file for a GitHub project with the following details:
        - Project Name: ${repoDetails.name}
        - Description: ${repoDetails.description}
        - Main Features: ${
          repoDetails.topics?.join(", ") || "No topics available"
        }
        - Installation Guide: Provide clear steps.
        - Usage Examples: Include basic examples.
        - Contribution Guide: Simple guidelines for contributors.
        - License: ${repoDetails.license?.name || "No license specified"}
      `;

      // Call OpenAI API for README generation
      const aiResponse = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMarkdown(aiResponse.data.choices[0].text.trim());
    } catch (err) {
      setError(
        "Failed to generate README. Please check the repo URL or try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
      <input
        type="text"
        placeholder="Enter GitHub Repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="w-full p-2 border rounded-md dark:bg-gray-700"
      />
      <button
        onClick={generateReadme}
        className={`mt-2 px-4 py-2 rounded-lg text-white ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate README"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
