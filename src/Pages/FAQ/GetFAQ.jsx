import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomDropdown.css";
import "./GetFAQ.css";

// Utility function to strip HTML tags
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const CustomDropdown = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option._id);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div
        className="custom-dropdown-selected"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected
          ? options.find((option) => option._id === selected)?.name
          : "Select Service"}
      </div>
      {isOpen && (
        <div className="custom-dropdown-options">
          {options.map((option) => (
            <div
              key={option._id}
              className="custom-dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              <img
                src={option.image}
                alt={option.name}
                className="dropdown-image"
              />
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const GetFAQ = ({ refresh, onEditFAQClick }) => {
  const [services, setServices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
    setLoading(true);
    Promise.all([
      axios.get(`${AZURE_BASE_URL}/v1.0/core/services`),
      axios.get(`${AZURE_BASE_URL}/v1.0/users/faq`),
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

  const handleServiceFilter = (serviceId) => {
    setSelectedService(serviceId);
    if (serviceId === "") {
      setFilteredFaqs(faqs);
    } else {
      setFilteredFaqs(
        faqs.filter((faq) => faq.serviceId && faq.serviceId._id === serviceId),
      );
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
        <CustomDropdown
          options={services}
          selected={selectedService}
          onChange={handleServiceFilter}
        />
      </div>

      <div className="faq-scroll-container">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div key={faq._id} className="faq-card">
              <h3 className="faq-question">{stripHtmlTags(faq.question)}</h3>
              <p className="faq-answer">{stripHtmlTags(faq.answer)}</p>
              <p className="faq-customer">Customer: {faq.customerName}</p>
              <button
                className="edit-faq-button"
                onClick={() => onEditFAQClick(faq)}
              >
                Edit
              </button>
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
