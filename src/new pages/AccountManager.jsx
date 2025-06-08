import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import "./EmployeeAccounts.css";

const UserAccounts = () => {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]); // New state for employee history
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("firstName");
  const [view, setView] = useState("requests"); // toggle view: 'requests' or 'employees'
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchEmployees();
  }, []);

  // Fetch pending account requests
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/account-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const validUsers = (response.data || []).filter(user => user && user.firstName);
      setUsers(validUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch registered employees history
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8080/accounts/create/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map(user => user.id === id ? { ...user, status: "Approved" } : user));
      fetchEmployees(); // refresh employee list on approval
    } catch (error) {
      console.error("Error approving account:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/account-requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map(user => user.id === id ? { ...user, status: "Rejected" } : user));
    } catch (error) {
      console.error("Error rejecting account:", error);
    }
  };

  const filteredUsers = users
    .filter(user => 
      user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOption === "firstName"
        ? a.firstName.localeCompare(b.firstName)
        : new Date(b.dateApplied) - new Date(a.dateApplied)
    );

  const filteredEmployees = employees
    .filter(emp =>
      emp.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOption === "firstName"
        ? a.fullName.localeCompare(b.fullName)
        : new Date(b.registeredOn) - new Date(a.registeredOn)
    );

  return (
    <div className="accounts-container modern-ui">
      <h1>Admin Panel</h1>

      <div className="view-toggle-buttons">
        <button onClick={() => setView("requests")} disabled={view === "requests"}>
          Account Requests
        </button>
        <button onClick={() => setView("employees")} disabled={view === "employees"}>
          Employee History
        </button>
      </div>

      <div className="controls">
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-bar"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="sort-dropdown" onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="firstName">Sort by Name</option>
          <option value="dateApplied">Sort by Date</option>
        </select>
      </div>

      {view === "requests" ? (
        <table className="accounts-table modern-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Applied On</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
              <th>Account Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className={`status-${user.status?.toLowerCase() || "unknown"}`}>
                <td>{user.firstName} {user.lastName || ""}</td>
                <td>{user.dateApplied ? new Date(user.dateApplied).toLocaleDateString() : "N/A"}</td>
                <td>{user.phone || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.location || "N/A"}</td>
                <td>{user.accountType || "N/A"}</td>
                <td className="status-cell">{user.status || "Pending"}</td>
                <td className="action-buttons">
                  <button className="approve-btn modern-btn" onClick={() => handleApprove(user.id)}>
                    <FaCheck /> Approve
                  </button>
                  <button className="reject-btn modern-btn" onClick={() => handleReject(user.id)}>
                    <FaTimes /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="employees-table modern-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Registered On</th>
              <th>Profile Pic</th>
              <th>ID Proof</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.employeeId}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>{emp.phoneNumber}</td>
                <td>{emp.role}</td>
                <td>{emp.registeredOn ? new Date(emp.registeredOn).toLocaleDateString() : "N/A"}</td>
                <td>
                  {emp.profilePic ? (
                    <img
                      src={emp.profilePic}
                      alt="Profile"
                      style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "50%" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  {emp.idProof ? (
                    <a href={emp.idProof} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAccounts;
