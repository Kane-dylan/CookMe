// DEPRECATED: This file is kept for backward compatibility
// Please use the useGeminiAPI hook from '../hooks/useGeminiAPI' in React components

export const generateReadme = async (prompt) => {
  console.warn(
    "generateReadme utility is deprecated. Please use useGeminiAPI hook in React components."
  );

  try {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

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

    return data; // Return the raw data for backward compatibility
  } catch (error) {
    console.error("Error generating README:", error);
    throw error;
  }
};
