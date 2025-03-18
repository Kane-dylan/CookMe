import { useState } from "react";

export function useGeminiAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");

  async function generateReadme(prompt) {
    setLoading(true);
    setError(null);

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
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
