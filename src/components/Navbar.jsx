import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaGithub className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">ReadMeAI</span>
        </div>
        <nav>
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <a
                href="#features"
                className="text-sm font-medium hover:text-primary"
              >
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium hover:text-primary">
                Docs
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium hover:text-primary">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
