import { useState, useEffect } from "react";
import Switch from "react-switch";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  // Track mobile state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update mobile state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center">
      <Switch
        onChange={() => setDarkMode(!darkMode)}
        checked={darkMode}
        onColor="#334155"
        offColor="#94a3b8"
        onHandleColor="#f1f5f9"
        offHandleColor="#f1f5f9"
        handleDiameter={isMobile ? 22 : 24}
        uncheckedIcon={
          <div
            className="flex justify-center items-center h-full"
            style={{ paddingRight: "2px" }}
          >
            <FaSun color="gold" size={isMobile ? 14 : 16} />
          </div>
        }
        checkedIcon={
          <div
            className="flex justify-center items-center h-full"
            style={{ paddingLeft: "2px" }}
          >
            <FaMoon color="#e2e8f0" size={isMobile ? 12 : 14} />
          </div>
        }
        height={isMobile ? 26 : 28}
        width={isMobile ? 50 : 56}
        className="react-switch"
      />
    </div>
  );
}
