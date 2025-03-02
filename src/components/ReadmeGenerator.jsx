import { useState } from "react";
import { generateReadme } from "../utils/generateReadme"; // Import API function

export default function ReadmeGenerator({ setMarkdown }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const customPrompt = `I need a comprehensive README.md file for the GitHub repository: ${repoUrl}

Please analyze the repository contents and generate a complete README.md file with the following sections:

1. Project Title and Description (derived from repo name and purpose)
2. Features (list the main capabilities of the project)
3. Technologies Used (identify frameworks, languages, and tools)
4. Installation Instructions (step-by-step setup process)
5. Usage Examples (with code snippets if applicable)
6. API Documentation (if applicable)
7. Configuration Options (environment variables, settings)
8. Contributing Guidelines (how others can contribute)
9. Testing Instructions (how to run tests)
10. License Information
11. Acknowledgments (credits, inspirations, etc.)

Please format the README.md file using proper Markdown syntax with:
- Clear headings and subheadings
- Code blocks with appropriate syntax highlighting
- Tables where necessary
- Bullet points and numbered lists for better readability
- Links to relevant documentation or resources
- At least one relevant badge (build status, version, etc.)

Include a section for "Quick Start" to help new users get up and running quickly. If the repository has a specific focus (e.g., machine learning, web app, API), please tailor the README accordingly.

Make sure the README is professional, concise, and helpful for both technical and non-technical users. Avoid generic placeholders - all content should be specific to this project.`;

  const handleGenerateReadme = async () => {
    if (!repoUrl.trim()) {
      setError("Please enter a repository name or URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await generateReadme(customPrompt);
      setMarkdown(
        response?.candidates[0]?.content.parts[0]?.text || "No response"
      );
    } catch (err) {
      setError("Failed to generate README. Check API key & quota.");
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
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          This will generate a comprehensive README with:
        </p>
        <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5 space-y-1">
          <li>Project title and description</li>
          <li>Features and capabilities</li>
          <li>Technologies and frameworks</li>
          <li>Installation and quick start guide</li>
          <li>Usage examples with code snippets</li>
          <li>API documentation (if applicable)</li>
          <li>Configuration options</li>
          <li>Contributing guidelines</li>
          <li>Testing instructions</li>
          <li>License information</li>
          <li>Acknowledgments</li>
        </ul>
      </div>

      <button
        onClick={handleGenerateReadme}
        className={`w-full mt-2 px-4 py-2 rounded-lg text-white ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Generating README..." : "Generate Professional README"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
