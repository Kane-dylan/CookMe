import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // 🔴 Replace with your valid API key
// const apiKey = import.meta.env.GEMINI_API_KEY;

export const generateReadme = async (text) => {
  console.log("🚀 Generating README with Gemini API...", API_KEY);
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: text }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Extract and return response
  } catch (error) {
    console.error("❌ Error generating README:", error.response?.data || error);
    throw new Error("Failed to fetch response from Gemini API");
  }
};
