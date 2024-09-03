import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles/servicemanager.css";

const ServiceDetailCard = ({ service, category, subCategory, onClose }) => {
  const [serviceData, setServiceData] = useState({
    image: service.image,
    name: service.name,
    description: service.description,
    variantName: service.variantName,
  });

  useEffect(() => {
    setServiceData({
      image: service.image,
      name: service.name,
      description: service.description,
      variantName: service.variantName,
    });
  }, [service]);

  return (
    <div className="service-detail-card">
      <form className="add-service-form">
        <button
          type="button"
          className="servermanager-close-icon"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          &times;
        </button>
        <div className="form-group">
          <label>Service Name:</label>
          <input
            type="text"
            className="service-input-borders"
            value={serviceData.name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="textarea-input"
            value={serviceData.description}
            readOnly
          ></textarea>
        </div>
        <div className="form-group">
          <label>Variant Name:</label>
          <input
            type="text"
            className="service-input-borders"
            value={serviceData.variantName}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Service Image:</label>
          <img
            src={serviceData.image}
            alt={serviceData.name}
            className="service-image-preview"
          />
        </div>
        <div className="form-group toggle-group">
          <label>Most Booked:</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isMostBooked}
            readOnly
          />
        </div>
        <div className="form-group toggle-group">
          <label>Active:</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isActive}
            readOnly
          />
        </div>
        <div className="form-group toggle-group">
          <label>Deleted:</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isDeleted}
            readOnly
          />
        </div>
        <div className="form-group toggle-group">
          <label>Tag:</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.tag}
            readOnly
          />
        </div>
        <button type="button" className="submissionbutton" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

ServiceDetailCard.propTypes = {
  service: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    variantName: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  subCategory: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ServiceDetailCard;
