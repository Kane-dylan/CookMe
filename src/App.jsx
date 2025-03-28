import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import Landing from "./Pages/Landing";
import { ThemeProvider } from "./components/ThemeProvider"; // Update to named import
import "./styles/markdown.css"; // Import markdown styles

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Ensures correct routing context
    children: [
      { path: "/", element: <Landing /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
