import { useAuth } from "../../features/auth/hooks/useAuth";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-green-700 text-2xl focus:outline-none"
        >
          ☰
        </button>

        <div className="text-emerald-900 font-semibold text-lg">
          Welcome, {user?.email}, {user?.role}
        </div>
      </div>

      {/* Right Section */}
      <button
        onClick={logout}
        className="bg-emerald-900 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition duration-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;