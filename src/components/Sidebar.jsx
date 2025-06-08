import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState("user@example.com"); // ✅ Default email
  const [userRole, setUserRole] = useState("USER");
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Retrieve user details from localStorage
    const storedRole = localStorage.getItem("role") || "USER";
    const storedEmail = localStorage.getItem("email") || "user@capgemini.com"; // ✅ Fetch email

    setUserRole(storedRole);
    setUserEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // ✅ Clear token & user data
    navigate("/signin"); // ✅ Redirect to sign-in page
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h1 className="logo">{!collapsed && "Employee Portal"}</h1>
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>☰</button>
      </div>

      {/* ✅ Profile Section with User Email & Role */}
      <div className="profile">
        <img src="/assets/user.jpg" alt="User" className="profile-pic" />
        {!collapsed && (
          <div>
            <h3 className="small-text">{userEmail}</h3> {/* ✅ Smaller User Email */}
            <p className="role-badge small-text">{userRole.toUpperCase()}</p> {/* ✅ Smaller Role */}
          </div>
        )}
      </div>

      {/* Sidebar Menu */}
      <ul className="menu">

        {/* ✅ Admin Menu */}
        {userRole === "EMPLOYEE" && (
          <>
            <li><Link to="/EmployeeAccount">👥 Account Manager</Link></li>
            <li><Link to="/AchivementManager">📥 Achivement manager</Link></li>
            <li><Link to="/AdminDashboard">🏦 Admin Dashboard</Link></li>
            <li><Link to="/capgeminiFeatures">🏦 Capgemini Specific Features</Link></li>
          </>
        )}

        {/* ✅ employee Menu */}
        {userRole === "USER" && (
          <>
            <li><Link to="/UserDashboard">🏦 Dashboard</Link></li>
            <li><Link to="/UserAccount">👥 Achivements</Link></li>
            <li><Link to="/AchivementHistory">📥 Achivement History</Link></li>
          </>
        )}

        
      </ul>
    </div>
  );
};

export default Sidebar;