import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./Auth.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.mesg || "Sign-in failed.");
        return;
      }

      localStorage.setItem("role", data.role || role);
      localStorage.setItem("email", email);

      switch (data.role || role) {
        case "ADMIN":
          navigate("/dashboard");
          break;
        case "EMPLOYEE":
          navigate("/AccountManager");
          break;
        default:
          navigate("/UserDashboard");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("An error occurred while signing in.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
        <form onSubmit={handleSignIn}>
          {error && <p className="error-message">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="ADMIN">Admin</option>
            <option value="EMPLOYEE">Employee</option>
          </select>

          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey="6Lcqf44qAAAAAAh7u2ug5Cmc_jts-F1bA6CzkKO6"
              onChange={(val) => setCaptchaValue(val)}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={!captchaValue}>
            Sign In
          </button>
        </form>


        <p>
          Don't have an account?{" "}
          <a href="/signup" className="auth-link">Sign Up</a>
        </p>

      </div>
    </div>
  );
};

export default SignIn;
