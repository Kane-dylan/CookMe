import { useState } from "react";
import Switch from "react-switch";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="flex items-center">
      <span className="mr-2">{darkMode ? "🌙 Dark" : "☀️ Light"}</span>
      <Switch onChange={() => setDarkMode(!darkMode)} checked={darkMode} />
    </div>
  );
}
