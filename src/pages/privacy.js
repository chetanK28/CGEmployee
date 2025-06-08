import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./privacy.css";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Capgemini Employee Portal</div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a onClick={() => navigate("/signin")} style={{ cursor: "pointer" }}>Login</a>
          <a onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>Signup</a>
          <a onClick={() => navigate("/privacy")} style={{ cursor: "pointer" }}>Privacy</a>
          <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Logout</a>
        </div>
      </nav>

      {/* Privacy Policy Content */}
      <Container className="privacy-container">
        <h1>Privacy Policy</h1>
        <p>
          At Capgemini Employee Portal, we are committed to protecting the privacy and security of our employees’ data. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you access this internal platform.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect personal identification information (such as name, email address with @capgemini.com domain, employee ID, phone number, and designation) and non-personal identification information based on your interaction with the portal.
        </p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>Manage your access to internal services and tools</li>
          <li>Provide relevant HR and IT services</li>
          <li>Maintain employee records and communications</li>
          <li>Ensure compliance with corporate and legal obligations</li>
          <li>Improve the functionality and experience of the portal</li>
        </ul>

        <h2>Security of Your Information</h2>
        <p>
          We implement robust administrative, technical, and physical safeguards to protect your personal data from unauthorized access, disclosure, or misuse.
        </p>

        <h2>Contact Us</h2>
        <p>
          For any privacy-related inquiries or concerns regarding the Capgemini Employee Portal, please contact our IT Support team at <a href="mailto:support@capgemini.com">support@capgemini.com</a>.
        </p>
      </Container>
    </>
  );
};

export default Privacy;
