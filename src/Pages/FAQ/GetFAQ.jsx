import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GetFAQ.css";

const GetFAQ = ({ refresh }) => {
  const [services, setServices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch services and FAQs on component mount or when `refresh` changes
    setLoading(true);
    Promise.all([
      axios.get("https://api.coolieno1.in/v1.0/core/services"),
      axios.get("https://api.coolieno1.in/v1.0/users/faq"),
    ])
      .then(([servicesResponse, faqsResponse]) => {
        setServices(servicesResponse.data);
        setFaqs(faqsResponse.data);
        setFilteredFaqs(faqsResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  const handleServiceFilter = (e) => {
    const serviceId = e.target.value;
    setSelectedService(serviceId);
    if (serviceId === "") {
      setFilteredFaqs(faqs);
    } else {
      setFilteredFaqs(faqs.filter((faq) => faq.serviceId === serviceId));
    }
  };

  return (
    <div className="get-faq-container">
      <h2>Frequently Asked Questions</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="service-filter-bar">
        <label htmlFor="serviceFilter" className="faq-label">
          Filter by Service:
        </label>
        <select
          id="serviceFilter"
          className="faq-select"
          value={selectedService}
          onChange={handleServiceFilter}
        >
          <option value="">All Services</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div className="faq-scroll-container">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div key={faq._id} className="faq-card">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
              <p className="faq-customer">Customer: {faq.customerName}</p>
            </div>
          ))
        ) : (
          <p>No FAQs available for the selected service.</p>
        )}
      </div>
    </div>
  );
};

export default GetFAQ;
