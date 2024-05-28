import React from "react";
import "./servermanager.css"; // Ensure the CSS file is correctly linked

const ServiceDetailCard = ({ service, category, subCategory, onClose }) => {
  return (
    <div className="service-detail-card">
      <h3>Category: {category}</h3>
      <h3>Sub-Category: {subCategory}</h3>
      <h3>Service: {service.name}</h3>
      <form className="add-service-form">
        <div className="form-group">
          <label>Service Name:</label>
          <input
            type="text"
            className="bottom-border-input"
            value={service.name}
          />
        </div>
        <div className="form-group">
          <label>Service Type:</label>
          <select className="bottom-border-input" value={service.type}>
            <option>Normal</option>
            <option>Deep</option>
            <option>Male</option>
            <option>Female</option>
            <option>Hour</option>
            <option>Daily</option>
            <option>Monthly</option>
          </select>
        </div>
        <div className="form-group">
          <label>Service Price:</label>
          <input
            type="text"
            className="bottom-border-input"
            value={service.price}
          />
        </div>
        <div className="form-group">
          <label>Total Service Time:</label>
          <input
            type="text"
            className="bottom-border-input"
            value={service.time}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="textarea-input"
            value={service.description}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Locations:</label>
          <input
            type="text"
            className="bottom-border-input"
            value={service.locations}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            className="bottom-border-input"
            value={service.city}
          />
        </div>
        <div className="form-group">
          <label>TAX %:</label>
          <input
            type="text"
            className="bottom-border-input"
            value={service.tax}
          />
        </div>
        <div className="form-group">
          <label>Provider commission:</label>
          <input
            type="text"
            className="bottom-border-input"
            value={service.commission}
          />
        </div>
        <div className="form-group toggle-group">
          <label>Add to most booked service</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={service.mostBooked}
          />
        </div>
        <div className="form-group toggle-group">
          <label>TAG</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={service.tag}
          />
        </div>
        <div className="form-group toggle-group">
          <label>Cash After Service</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={service.cashAfterService}
          />
        </div>
        <button type="button" className="submit-button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export default ServiceDetailCard;
