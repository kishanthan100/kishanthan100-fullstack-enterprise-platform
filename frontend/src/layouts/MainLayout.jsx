import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../shared/components/Sidebar";
import Navbar from "../shared/components/Navbar";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Content Wrapper */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        
        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsOpen(prev => !prev)} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;