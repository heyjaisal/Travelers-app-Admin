import { Outlet } from "react-router-dom";
import AdminNavbar from "./Admin-navbar";

const AdminDashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <AdminNavbar />
      {/* Main content area */}
      <div className="flex-1 p-1 overflow-auto bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
