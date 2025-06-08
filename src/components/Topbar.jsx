import React from "react";
import { Link } from "react-router-dom"; // Removed 'useNavigate'
import "../styles.css"; // Ensure the correct path to your styles.css

const Topbar = ({ onLogout }) => {
  const handleLogout = () => {
    
    localStorage.removeItem("token");
  
    if (onLogout) {
      onLogout();
    }
  
    console.log("User logged out"); 
  
    
    window.location.href = "/signin"; 
  };


  return (
    <div className="topbar">
      {/* Search Bar */}
      <div className="search-bar">
  <h2 className="app-name"><span></span></h2>
</div>

      {/* Topbar Icons */}
      <div className="topbar-icons">
        <button>🔔 Notifications</button>
        <button>⚙️ Settings</button>
        <Link to="/signin" onClick={handleLogout}>
          <button>👤 Logout</button>
        </Link>
        <Link to="/home" onClick={handleLogout}>
          <button>🏠 Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
