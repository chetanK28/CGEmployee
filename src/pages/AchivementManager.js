import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAchievementHistory = () => {
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState("");

  // Fetch achievements on component mount
  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/employee/achievements"
      );
      setAchievements(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load achievements history.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee Achievements History</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {achievements.length === 0 ? (
        <p>No achievements found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Achievement ID</th>
                <th>Employee Name</th>
                <th>Achievement Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((ach) => (
                <tr key={ach.id}>
                  <td>{ach.id}</td>
                  <td>{ach.employeeName}</td>
                  <td>{ach.description}</td>
                  <td>{new Date(ach.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAchievementHistory;
