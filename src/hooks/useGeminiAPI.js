import { useState } from "react";

export function useGeminiAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");

  async function generateReadme(prompt) {
    setLoading(true);
    setError(null);

    // Check all environment variables to help debug
    console.log(
      "Environment variables available:",
      Object.keys(import.meta.env)
        .filter((key) => key.startsWith("VITE_"))
        .map(
          (key) =>
            `${key}: ${
              key.includes("KEY") ? "[REDACTED]" : import.meta.env[key]
            }`
        )
    );

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    // More detailed debugging
    console.log(
      "API Key status:",
      API_KEY ? "Found (length: " + API_KEY.length + ")" : "Not found"
    );

    // Debug log for production troubleshooting (will be removed in production build if not in development)
    if (!API_KEY) {
      console.error("API_KEY is missing. Check environment variables.");
      setError("API key is missing. Please check your environment variables.");
      setLoading(false);
      return null;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    try {
      console.log("Making API request to Gemini...");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      console.log("API response status:", response.status);

      if (!response.ok) {
        const errorText = await response
          .text()
          .catch(() => "Failed to get error details");
        console.error("API Error Details:", errorText);
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();

      if (data.error) {
        console.error("API returned error object:", data.error);
        throw new Error(data.error.message || "API returned an error");
      }

      const generatedText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      setResponse(generatedText);
      return generatedText;
    } catch (error) {
      console.error("Error generating README:", error);
      setError(error.message || "Failed to generate README.");
      setResponse("Failed to generate README.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { response, loading, error, generateReadme };
}
