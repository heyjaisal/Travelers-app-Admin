import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login';
import AdminDashboardLayout from './Components/Navbar/Admin-layout';
import AdminHome from './Pages/Admin/Home';
import AllUsers from './Pages/Admin/Allusers';
import AdminPayments from './Pages/Admin/Payment';
import AdminRequests from './Pages/Admin/Payment';
import AdminNotifications from './Pages/Admin/Notification';
import AdminMessages from './Pages/Admin/Messages';
import AdminCreate from './Pages/Admin/Create';
import AdminApproval from './Pages/Admin/Approval';
import AdminProfileSettings from './Pages/Admin/ProfileSettings';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/admin' element={<Login/>}/>
          <Route element={<AdminDashboardLayout />}>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/all-users" element={<AllUsers />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/create" element={<AdminCreate />} />
          <Route path="/admin/approval" element={<AdminApproval />} />
          <Route path="/admin/profile-settings" element={<AdminProfileSettings />}
          />
        </Route>
        <Route path="*" element={<Login />} />
        </Routes>
      </Router>

      
    </div>
  )
}

export default App

