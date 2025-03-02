import { useState } from "react";
import { generateReadme } from "../utils/generateReadme"; // Import API function

export default function ReadmeGenerator({ setMarkdown }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateReadme = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await generateReadme(`Generate a README for ${repoUrl}`);
      setMarkdown(
        response?.candidates[0]?.content.parts[0]?.text || "No response"
      );
    } catch (err) {
      setError("Failed to generate README. Check API key & quota.");
    }

    setLoading(false);
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
      <input
        type="text"
        placeholder="Enter GitHub Repo Name"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="w-full p-2 border rounded-md dark:bg-gray-700"
      />
      <button
        onClick={handleGenerateReadme}
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
