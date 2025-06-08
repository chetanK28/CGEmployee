import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminAccounts.css";

const AdminAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("firstName");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found! User not authenticated.");
      return;
    }

    axios
      .get("http://localhost:8080/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAccounts(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching accounts:", error));
  }, [token]);

  return (
    <div className="admin-accounts-container">
      <h1 className="open">Add Your Achivements.</h1>


      {/* Accounts Table */}
      {accounts.length === 0 ? (
        <p className="no-accounts-message">
          Oops, you don't have any achievements.
        </p>
      ) : (
        <div className="accounts-table">
          
        </div>
      )}

      {/* New Submission Sections */}
      <SubmissionSection title="Submit Achievement" endpoint="/submit-achievement" attachFile />
      <SubmissionSection title="Submit Code Bugs" endpoint="/submit-code-bug" attachFile />
      <SubmissionSection title="Submit Certification" endpoint="/submit-certification" attachFile />
    </div>
  );
};

const SubmissionSection = ({ title, endpoint, attachFile }) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    if (attachFile && file) formData.append("certificate", file);

    try {
      await axios.post(`http://localhost:8080${endpoint}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`${title} submitted successfully.`);
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error(`${title} submission failed:`, error);
      alert(`Failed to submit ${title.toLowerCase()}.`);
    }
  };

  return (
    <div className="submission-section">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={`Enter details for ${title.toLowerCase()}...`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        {attachFile && (
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminAccounts;
