import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import UserAccount from "./new pages/UserAccount";
import "./styles.css";
import AchivementHistory from "./pages/AchivementHistory";
import AchivementManager from "./pages/AchivementManager";
import Home from "./pages/home";
import Privacy from "./pages/privacy";
import ContactForm from "./new pages/ContactForm";
import UserDashboard from "./new pages/UserDashboard";
import AdminDashboard from "./new pages/AdminDashboard";
import Dashboard from "./new pages/capgeminiFeatures"; 


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to Home page */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactForm />} />

        {/* Main application layout */}
        <Route
          path="*"
          element={
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Topbar />
                <div className="content">
                  <Routes>
                    <Route path="/UserDashboard" element={<UserDashboard />} />
                    <Route path="/contacts" element={<div>Contacts Info Page</div>} />
                    <Route path="/AchivementHistory" element={<AchivementHistory />} />
                    <Route path="/useraccount" element={<UserAccount />} /> 
                    <Route path="/usermanager" element={<div>User Manager Page</div>} />
                    <Route path="/capgeminiFeatures" element={<Dashboard />} /> 
                    <Route path="/AchivementManager" element={<AchivementManager />} />
                    <Route path="/AdminDashboard" element={<AdminDashboard />} />

                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
