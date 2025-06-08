import React, { useState } from "react";
import axios from "axios";

const AchievementsHistory = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState("");

  // Fetch achievements by Employee ID
  const fetchAchievements = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/achievements/employee/${employeeId}`
      );
      setAchievements(response.data);
      setError("");
    } catch (err) {
      setError("No achievements found for this employee.");
      setAchievements([]);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Achievements History</h2>

      {/* Employee ID Input */}
      <div className="mb-3">
        <label className="form-label">Search by Employee ID:</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchAchievements}>
            Search
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Achievements Table */}
      {achievements.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Achievement ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Certificate</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((ach) => (
                <tr key={ach.achievementId}>
                  <td>{ach.achievementId}</td>
                  <td>{ach.title}</td>
                  <td>{ach.description}</td>
                  <td>{new Date(ach.date).toLocaleDateString()}</td>
                  <td>
                    {ach.certificateUrl ? (
                      <a href={ach.certificateUrl} target="_blank" rel="noopener noreferrer">
                        View Certificate
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AchievementsHistory;
