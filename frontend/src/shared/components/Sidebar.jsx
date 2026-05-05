import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ isOpen }) => {
  const [itemOpen, setItemOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);

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

          

          {/* Items Parent */}
          <button
            onClick={() => setUserOpen(!userOpen)}
            className={`${baseStyle} hover:bg-emerald-600 w-full text-left`}
          >
            User Logs
          </button>

          {/* Sub Menu */}
          {userOpen && (
            <div className="ml-4 space-y-1">
              <NavLink
                to="/user/user-list"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${
                    isActive
                      ? "bg-white text-emerald-900 font-semibold"
                      : "hover:bg-emerald-600"
                  }`
                }
              >
                User List
              </NavLink>

              <NavLink
                to="/user/my-logs"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${
                    isActive
                      ? "bg-white text-emerald-900 font-semibold"
                      : "hover:bg-emerald-600"
                  }`
                }
              >
                My Logs
              </NavLink>

              <NavLink
                to="/user/user-logs"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${
                    isActive
                      ? "bg-white text-emerald-900 font-semibold"
                      : "hover:bg-emerald-600"
                  }`
                }
              >
                All Users Logs
              </NavLink>

              <NavLink
                to="/user/register"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${
                    isActive
                      ? "bg-white text-emerald-900 font-semibold"
                      : "hover:bg-emerald-600"
                  }`
                }
              >
                Add User
              </NavLink>
              

              
            </div>
          )}

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
                to="/item/list-items"
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
                to="/item/create-items"
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

          {/* Stock Parent */}
          <button
            onClick={() => setStockOpen(!stockOpen)}
            className={`${baseStyle} hover:bg-emerald-600 w-full text-left`}
          >
            Stock
          </button>

          {/* Sub Menu */}
          {stockOpen && (
            <div className="ml-4 space-y-1">
              <NavLink
                to="/stock/stock-list"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${
                    isActive
                      ? "bg-white text-emerald-900 font-semibold"
                      : "hover:bg-emerald-600"
                  }`
                }
              >
                Stock List
              </NavLink>

              <NavLink
                to="/stock/update-stock"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${
                    isActive
                      ? "bg-white text-emerald-900 font-semibold"
                      : "hover:bg-emerald-600"
                  }`
                }
              >
                Update Stock
              </NavLink>
            </div>
          )}


          {/* Customer Parent */}
          <button
            onClick={() => setCustomerOpen(!customerOpen)}
            className={`${baseStyle} hover:bg-emerald-600 w-full text-left`}
          >
            Customers
          </button>

          {/* Sub Menu */}
          {customerOpen && (
            <div className="ml-4 space-y-1">
              <NavLink
                to="/customer/list-customers"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${
                    isActive
                      ? "bg-white text-emerald-900 font-semibold"
                      : "hover:bg-emerald-600"
                  }`
                }
              >
                Customer List
              </NavLink> 
            </div>
          )}
          {/* Sub Menu */}
          {customerOpen && (
            <div className="ml-4 space-y-1">
              <NavLink
                to="/customer/create-customers"
                className={({ isActive }) =>
                  `${baseStyle} text-sm ${
                    isActive
                      ? "bg-white text-emerald-900 font-semibold"
                      : "hover:bg-emerald-600"
                  }`
                }
              >
                Create Customer
              </NavLink> 
            </div>
          )}

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;