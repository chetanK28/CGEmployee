import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [achievements, setAchievements] = useState(5);
  const [bugsFixed, setBugsFixed] = useState(8);
  const [certifications, setCertifications] = useState(3);

  const handleSubmit = (type) => {
    alert(`Submitting ${type}...`);
    // Here, you can open a modal, trigger a form, or integrate file upload logic
  };

  return (
    <div className="dashboard-container">
      <h1>Capgemini Employee Portal Dashboard</h1>

      {/* Submission Section */}
      <div className="submission-section">
        <h2>Submit Your Contributions</h2>
        <div className="submission-buttons">
          <button onClick={() => handleSubmit("Achievement")}>Submit Achievement</button>
          <button onClick={() => handleSubmit("Bug Report")}>Submit Code Bug</button>
          <button onClick={() => handleSubmit("Certification")}>Submit Certification</button>
        </div>
        <p>You may attach certificates where applicable.</p>
      </div>

      {/* Dashboard Summary */}
      <div className="summary-section">
        <h2>Dashboard Summary</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Achievements</h3>
            <p>{achievements}</p>
          </div>
          <div className="summary-card">
            <h3>Bugs Found / Fixed</h3>
            <p>{bugsFixed}</p>
          </div>
          <div className="summary-card">
            <h3>Certifications Earned</h3>
            <p>{certifications}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
