import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddFAQ.css";

const AddFAQ = () => {
  const [services, setServices] = useState(null); // Initialize as null
  const [serviceId, setServiceId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null); // To capture and display any errors
  const [loading, setLoading] = useState(false); // To handle loading state
  const [successMessage, setSuccessMessage] = useState(""); // To capture success message

  useEffect(() => {
    // Fetch the list of services for the dropdown
    setLoading(true);
    axios
      .get("https://api.coolieno1.in/v1.0/core/services")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          setServices([]);
          setError("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setError("Failed to load services");
        setServices([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const newFAQ = { serviceId, customerName, question, answer };

    axios
      .post("https://api.coolieno1.in/v1.0/users/faq", newFAQ)
      .then((response) => {
        console.log("FAQ added:", response.data);
        setSuccessMessage("FAQ added successfully!");
        // Reset form
        setServiceId("");
        setCustomerName("");
        setQuestion("");
        setAnswer("");
      })
      .catch((error) => {
        console.error("Error adding FAQ:", error);
        setError("Error adding FAQ. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="faq-add-category-form">
      <h2>Add FAQ</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="service" className="faq-label">
          Select Service:
        </label>
        {services === null ? (
          <p>Loading...</p>
        ) : services.length === 0 ? (
          <p>No data available</p>
        ) : (
          <select
            id="service"
            className="faq-select"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>
        )}

        <label htmlFor="customerName" className="faq-label">
          Customer Name:
        </label>
        <input
          type="text"
          id="customerName"
          className="faq-input"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <label htmlFor="question" className="faq-label">
          Question:
        </label>
        <input
          type="text"
          id="question"
          className="faq-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <label htmlFor="answer" className="faq-label">
          Answer:
        </label>
        <textarea
          id="answer"
          className="faq-textarea"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />

        <button type="submit" className="faq-add-button" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddFAQ;