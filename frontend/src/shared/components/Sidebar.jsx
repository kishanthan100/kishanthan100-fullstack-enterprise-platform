import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ isOpen }) => {
  const [itemOpen, setItemOpen] = useState(false);

  const baseStyle =
    "block px-4 py-2 rounded-lg transition duration-200";

  return (
    <aside
      className={`
        bg-emerald-900 text-white
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-40" : "w-0"}
        overflow-hidden
      `}
    >
      <div className="p-5 whitespace-nowrap">
        <h2 className="text-2xl font-bold mb-8">My App</h2>

        <nav className="space-y-2">
          
          {/* Dashboard */}
          <NavLink to="/home" className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-white text-emerald-900 font-semibold"
                : "hover:bg-emerald-600"
            }`
          }>
            Dashboard
          </NavLink>

          <NavLink to="/my-logs" className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-white text-emerald-900 font-semibold"
                : "hover:bg-emerald-600"
            }`
          }>
            My Logs
          </NavLink>

          <NavLink to="/user-logs" className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-white text-emerald-900 font-semibold"
                : "hover:bg-emerald-600"
            }`
          }>
            All User Logs
          </NavLink>

          {/* Items Parent */}
          <button
            onClick={() => setItemOpen(!itemOpen)}
            className={`${baseStyle} hover:bg-emerald-600 w-full text-left`}
          >
            Items
          </button>

          {/* Sub Menu */}
          {itemOpen && (
            <div className="ml-4 space-y-1">
              <NavLink
                to="/list-items"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${
                    isActive
                      ? "bg-white text-emerald-900 font-semibold"
                      : "hover:bg-emerald-600"
                  }`
                }
              >
                Item List
              </NavLink>

              <NavLink
                to="/create-items"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${
                    isActive
                      ? "bg-white text-emerald-900 font-semibold"
                      : "hover:bg-emerald-600"
                  }`
                }
              >
                Add Item
              </NavLink>
            </div>
          )}

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;