import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const SignUp = () => {
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080";

  const [formData, setFormData] = useState({
    role: "EMPLOYEE",
    fullName: "",
    email: "",
    employeeId: "",
    department: "",
    designation: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword") data.append(key, value);
    });
    if (profilePic) data.append("profilePic", profilePic);
    if (idProof) data.append("idProof", idProof);

    try {
      await axios.post(`${API_BASE_URL}/users/signup`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Account created successfully!");
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data || "Error creating account.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create Account</h2>
        <p>Sign up with your Capgemini email</p>
        <form onSubmit={handleSignUp}>
          {error && <p className="error-message">{error}</p>}

          <input type="text" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Capgemini Email" required value={formData.email} onChange={handleChange} />
          <input type="text" name="employeeId" placeholder="Employee ID" required value={formData.employeeId} onChange={handleChange} />
          <input type="text" name="department" placeholder="Department" required value={formData.department} onChange={handleChange} />
          <input type="text" name="designation" placeholder="Designation" required value={formData.designation} onChange={handleChange} />
          <input type="tel" name="phoneNumber" placeholder="Phone Number (optional)" value={formData.phoneNumber} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} />
          <input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} />
          <input type="file" accept="application/pdf" onChange={(e) => setIdProof(e.target.files[0])} />

          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button
            type="submit"
            className="auth-btn"
            disabled={
              !formData.fullName ||
              !formData.email.endsWith("@capgemini.com") ||
              !formData.password ||
              formData.password !== formData.confirmPassword
            }
          >
            Register
          </button>
        </form>

        <p>Already have an account? <a href="/signin">Sign In</a></p>
      </div>
    </div>
  );
};

export default SignUp;
