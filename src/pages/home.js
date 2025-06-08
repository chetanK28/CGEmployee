import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Background Video with Overlay */}
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src="/assets/Capgemini.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Employee portal</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" onClick={() => navigate("/signin")} style={{ cursor: "pointer" }}>Login</a></li>
              <li className="nav-item"><a className="nav-link" onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>Signup</a></li>
              <li className="nav-item"><a className="nav-link" onClick={() => navigate("/privacy")} style={{ cursor: "pointer" }}>Privacy</a></li>
              <li className="nav-item"><a className="nav-link logout-btn" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Container className="hero-section text-center">
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="hero-title">Welcome to <span>Employee Portal</span></h1>
            <p className="hero-subtext">
              Empower your workforce, streamline operations, and manage employee records effortlessly.
            </p>
            <p className="slogan">"Connecting Employees. Driving Success."</p>
            <Button className="get-started-btn" variant="light" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </Col>
          <Col md={6}>
            <img
              src="/assets/capgemini logo.png"
              alt="Banking Illustration"
              className="hero-image"
            />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <Row>
            <Col md={4}>
              <h4>About Employee Portal</h4>
              <p>
                Employee Portal is your all-in-one HR and operations tool—designed to simplify employee management.
              </p>
            </Col>
            <Col md={4}>
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a onClick={() => navigate("/signin")} style={{ cursor: "pointer" }}>Login</a></li>
                <li><a onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>Signup</a></li>
                <li><a onClick={() => navigate("/privacy")} style={{ cursor: "pointer" }}>Privacy</a></li>
              </ul>
            </Col>
            <Col md={4}>
              <h4>Contact Us</h4>
              <p>Email: support@finvault.com</p>
              <p>Phone: +91 98765 43210</p>
            </Col>
          </Row>
        </div>
        <p className="footer-bottom">
          &copy; 2025 Employee Portal | Connecting Employees. Driving Success.
        </p>
      </footer>
    </div>
  );
};

export default Home;
