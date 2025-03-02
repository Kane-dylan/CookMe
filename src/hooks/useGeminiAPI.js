import { useState } from "react";

export function useGeminiAPI() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function generateReadme(prompt) {
    setLoading(true);
    const API_KEY = "YOUR_GEMINI_API_KEY";
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

      const data = await response.json();
      let generatedText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      let modifiedText = `# Generated README\n\n${generatedText}\n\n**Edited by AI**`;

      setResponse(modifiedText);
    } catch (error) {
      console.error("Error generating README:", error);
      setResponse("Failed to generate README.");
    }
    setLoading(false);
  }

  return { response, loading, generateReadme };
}
