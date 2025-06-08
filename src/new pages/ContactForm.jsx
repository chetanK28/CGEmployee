import { useState } from "react";
import axios from "axios";
// import ContactForm from "./new pages/contact";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/contact/send", formData);
      setStatus({ type: "success", message: response.data });
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message. Please try again later." });
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      {status && (
        <p className={status.type === "success" ? "success-message" : "error-message"}>
          {status.message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
