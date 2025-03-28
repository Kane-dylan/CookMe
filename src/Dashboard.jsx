export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-20 p-2 rounded-full bg-primary text-white shadow-lg"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-10 w-64 bg-white dark:bg-gray-800
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:block
          border-r border-gray-200 dark:border-gray-700 flex flex-col
        `}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-md font-bold text-gray-600 dark:text-gray-400">
            Welcome, {user.name}
          </h1>
        </div>
      </div>
    </div>
  );
}
