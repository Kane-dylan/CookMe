import { Link } from "react-router-dom";
import { FaBolt, FaCode, FaMarkdown } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create Perfect READMEs with AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
              Generate comprehensive, professional README files for your
              projects in seconds using our AI-powered tool. Save time and make
              your repositories shine.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FaBolt className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  AI-Powered Generation
                </h3>
                <p className="text-gray-600">
                  Our advanced AI analyzes your project and creates tailored
                  README content.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FaCode className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Customizable Templates
                </h3>
                <p className="text-gray-600">
                  Choose from various templates or customize to match your
                  project's needs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FaMarkdown className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Markdown Support</h3>
                <p className="text-gray-600">
                  Full markdown support with live preview and easy editing
                  capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
