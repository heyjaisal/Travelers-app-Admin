import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaDollarSign,
  FaBell,
  FaEnvelope,
  FaPlus,
  FaCheckCircle,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
const AdminNavbar = () => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white text-slate-800 h-full">
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
            }
          >
            <FaHome />
            Home
          </NavLink>
          <NavLink
            to="/admin/all-users"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
            }
          >
            <FaUsers />
            All Users
          </NavLink>
          <NavLink
            to="/admin/payments"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
            }
          >
            <FaDollarSign />
            Payments
          </NavLink>
          <NavLink
            to="/admin/requests"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
            }
          >
            <FaClipboardList />
            Requests
          </NavLink>
          <NavLink
            to="/admin/notifications"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
            }
          >
            <FaBell />
            Notifications
          </NavLink>
          <NavLink
            to="/admin/messages"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
            }
          >
            <FaEnvelope />
            Messages
          </NavLink>
          <NavLink
            to="/admin/create"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
            }
          >
            <FaPlus />
            Create
          </NavLink>
          <NavLink
            to="/admin/approval"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
            }
          >
            <FaCheckCircle />
            Approval
          </NavLink>
          <NavLink
            to="/admin/profile-settings"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
            }
          >
            <FaUser />
            Profile & Settings
          </NavLink>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white shadow-lg border-t">
        <nav className="flex justify-around p-2 text-slate-800">
          <button onClick={toggleSidebar} className="flex flex-col items-center gap-1">
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            <span className="text-xs">Menu</span>
          </button>
          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-blue-500" : ""}`
            }
          >
            <FaHome size={20} />
            <span className="text-xs">Home</span>
          </NavLink>
          <NavLink
            to="/admin/payments"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-blue-500" : ""}`
            }
          >
            <FaDollarSign size={20} />
            <span className="text-xs">Payments</span>
          </NavLink>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          ></div>
          <div className="fixed inset-y-0 left-0 bg-white w-64 z-50 shadow-lg flex flex-col">
            <div className="flex items-center justify-center h-20 border-b">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <nav className="flex-1 p-4 space-y-4">
              {/* Repeat similar to desktop links */}
              <NavLink
                to="/admin/home"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaHome />
                Home
              </NavLink>
              <NavLink
                to="/admin/all-users"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaUsers />
                All Users
              </NavLink>
              <NavLink
                to="/admin/payments"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaDollarSign />
                Payments
              </NavLink>
              <NavLink
                to="/admin/requests"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaClipboardList />
                Requests
              </NavLink>
              <NavLink
                to="/admin/notifications"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaBell />
                Notifications
              </NavLink>
              <NavLink
                to="/admin/messages"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaEnvelope />
                Messages
              </NavLink>
              <NavLink
                to="/admin/create"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaPlus />
                Create
              </NavLink>
              <NavLink
                to="/admin/approval"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaCheckCircle />
                Approval
              </NavLink>
              <NavLink
                to="/admin/profile-settings"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaUser />
                Profile & Settings
              </NavLink>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default AdminNavbar;
