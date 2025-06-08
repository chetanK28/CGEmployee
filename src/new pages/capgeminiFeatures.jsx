import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Container,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CapgeminiAdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/getAllEmployees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  const loadEmployeeDashboard = async (employeeId) => {
    try {
      const res = await axios.get("http://localhost:8080/admin/employee/dashboard", {
        params: { employeeId },
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;

      const weekly = Object.entries(data.weeklyActivity || {}).map(([day, value]) => ({
        day,
        value: parseFloat(value),
      }));

      const monthly = Object.entries(data.monthlyContributions || {}).map(([month, contribution]) => ({
        month,
        contribution: parseFloat(contribution),
      }));

      setDashboardData({
        achievements: data.achievements || [],
        bugs: data.bugs || [],
        certifications: data.certifications || [],
        weeklyActivity: weekly,
        monthlyContributions: monthly,
      });
      setSelectedEmployeeId(employeeId);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to load dashboard", err);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Capgemini Admin Dashboard</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Dashboard</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={emp.id}>
              <td>{idx + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.designation || "Not Assigned"}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => loadEmployeeDashboard(emp.id)}
                >
                  View Dashboard
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Employee Dashboard */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Employee Dashboard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-4">
              <h5>🏆 Achievements</h5>
              <ListGroup>
                {dashboardData.achievements?.map((ach, i) => (
                  <ListGroup.Item key={i}>{ach.title}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <div className="col-md-4">
              <h5>🐞 Bugs Fixed</h5>
              <ListGroup>
                {dashboardData.bugs?.map((bug, i) => (
                  <ListGroup.Item key={i}>{bug.description}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <div className="col-md-4">
              <h5>📜 Certifications</h5>
              <ListGroup>
                {dashboardData.certifications?.map((cert, i) => (
                  <ListGroup.Item key={i}>{cert.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>

          <hr />

          <div className="row mt-3">
            <div className="col-md-6">
              <h6>Weekly Activity</h6>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.weeklyActivity}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="col-md-6">
              <h6>Monthly Contributions</h6>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData.monthlyContributions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="contribution" stroke="#28a745" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CapgeminiAdminDashboard;
