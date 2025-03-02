export async function generateReadme(prompt) {
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

  const data = await response.json();

  // Extract the generated content
  let generatedText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  // Modify the response (Example: Adding a header and footer)
  let modifiedText = `# Generated README\n\n${generatedText}\n\n**Edited by AI**`;

  return modifiedText;
}
