import React from "react";
import "./ProviderProfile.css";
import { FaArrowLeft } from "react-icons/fa";
import ProfileImage from "../../../assets/images/profile-image.jpeg";

const ProviderProfile = ({ onDocumentsClick, onBackClick }) => {
  const providerData = {
    name: "John Doe",
    mobile: "123-456-7890",
    email: "johndoe@example.com",
    address: "123 Main St, Anytown, USA",
    rating: "4.5",
    experience: "5 years",
    services: [
      ["Cleaning service", "Salon At Home", "Carpentry"],
      ["Plumbing", "Electrical", "Gardening"],
      ["HVAC", "Pest Control", "Painting"],
      ["Moving", "General Maintenance", "Labour Supply"],
    ],
  };

  return (
    <div className="provider-profile-container">
      <button className="back-button" onClick={onBackClick}>
        <FaArrowLeft className="back-icon" /> Back
      </button>
      <div className="profile-section">
        <div className="profile-image-container">
          <img src={ProfileImage} alt="Profile" className="profile-image" />
        </div>
        <div className="provider-details">
          <div className="user-info">
            <div className="info-item">
              <label>Name:</label>
              <span>{providerData.name}</span>
            </div>
            <div className="info-item">
              <label>Mobile:</label>
              <span>{providerData.mobile}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{providerData.email}</span>
            </div>
            <div className="info-item">
              <label>Address:</label>
              <span>{providerData.address}</span>
            </div>
            <div className="info-item">
              <label>Rating:</label>
              <span>{providerData.rating}</span>
            </div>
            <div className="info-item">
              <label>Experience:</label>
              <span>{providerData.experience}</span>
            </div>
          </div>
        </div>
      </div>
      <h3>Services</h3>
      <div className="services-container">
        <div className="services">
          {providerData.services.map((serviceRow, index) => (
            <div key={index} className="service-entry">
              {serviceRow.map((service, idx) => (
                <label key={idx} className="service-checkbox">
                  <input type="checkbox" />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className="documentsButton" onClick={onDocumentsClick}>
        Documents
      </button>
    </div>
  );
};

export default ProviderProfile;
