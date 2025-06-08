import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./UserDashboard.css"; // You can rename this to EmployeeDashboard.css

const CapgeminiEmployeeDashboard = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [dashboardData, setDashboardData] = useState({
    achievements: [],
    bugs: [],
    certifications: [],
    weeklyActivity: [],
    monthlyContributions: [],
  });

  const fetchDashboardData = async () => {
    if (!employeeId) {
      alert("Please enter your Employee ID.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/employee/dashboard`, {
        params: { employeeId },
      });
      const data = response.data;

      const weeklyActivityArray = Object.entries(data.weeklyActivity || {}).map(([day, value]) => ({
        day,
        value: parseFloat(value),
      }));

      const monthlyContributionsArray = Object.entries(data.monthlyContributions || {}).map(
        ([month, contribution]) => ({
          month,
          contribution: parseFloat(contribution),
        })
      );

      setDashboardData({
        achievements: data.achievements || [],
        bugs: data.bugs || [],
        certifications: data.certifications || [],
        weeklyActivity: weeklyActivityArray,
        monthlyContributions: monthlyContributionsArray,
      });
    } catch (error) {
      console.error("Error fetching employee dashboard data:", error);
    }
  };

  return (
    <div className="container mt-4 colorful-dashboard">
      <h1 className="text-center text-white">Capgemini Employee Dashboard</h1>

      {/* Employee ID Input */}
      <div className="mb-3 input-container">
        <label className="form-label text-white">Enter Employee ID:</label>
        <input
          type="text"
          className="form-control input-field"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button className="btn btn-warning mt-2" onClick={fetchDashboardData}>
          Load Dashboard
        </button>
      </div>

      {/* Section Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <h2 className="text-white">Achievements</h2>
          <ul className="list-group">
            {dashboardData.achievements.map((ach, index) => (
              <li key={index} className="list-group-item text-dark">
                🏆 {ach.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-4">
          <h2 className="text-white">Bugs Fixed</h2>
          <ul className="list-group">
            {dashboardData.bugs.map((bug, index) => (
              <li key={index} className="list-group-item text-dark">
                🐞 {bug.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-4">
          <h2 className="text-white">Certifications</h2>
          <ul className="list-group">
            {dashboardData.certifications.map((cert, index) => (
              <li key={index} className="list-group-item text-dark">
                📜 {cert.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Weekly Activity Bar Chart */}
        <div className="col-md-6">
          <h2 className="text-white">Weekly Activity</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.weeklyActivity}>
                <XAxis dataKey="day" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="value" fill="#ffc107" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Contributions Line Chart */}
        <div className="col-md-6">
          <h2 className="text-white">Monthly Contributions</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.monthlyContributions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="contribution" stroke="#28a745" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapgeminiEmployeeDashboard;
