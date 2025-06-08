import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

const EmployeeLoginHistory = () => {
  const [loginHistory, setLoginHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/employee/loginHistory")
      .then((res) => {
        setLoginHistory(res.data);
        setError("");
      })
      .catch((err) => {
        setError("Failed to fetch login history.");
        console.error(err);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Employee Login History</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loginHistory.length === 0 ? (
        <p>No login history available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Total Logins</th>
              <th>Last Login</th>
              <th>Last Login IP</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.map((record, idx) => (
              <tr key={record.employeeId}>
                <td>{idx + 1}</td>
                <td>{record.employeeName}</td>
                <td>{record.email}</td>
                <td>{record.loginCount}</td>
                <td>
                  {record.lastLogin
                    ? new Date(record.lastLogin).toLocaleString()
                    : "N/A"}
                </td>
                <td>{record.lastLoginIp || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default EmployeeLoginHistory;
