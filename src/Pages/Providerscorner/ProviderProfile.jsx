import React, { useEffect, useState } from "react";
import "./styles/ProviderProfile.css";
import { FaArrowLeft } from "react-icons/fa";
import ProfileImage from "../../assets/images/profile-image.jpeg";

const ProviderProfile = ({ onDocumentsClick, onBackClick, providerId }) => {
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch provider details by providerId
  const fetchProviderDetailsId = async (providerId) => {
    console.log(
      "Fetching provider details from the API for providerId:",
      providerId,
    );
    try {
      const response = await fetch(
        `https://api.coolieno1.in/v1.0/providers/provider-details/${providerId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Provider details fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch provider details:", error);
      return null;
    }
  };

  useEffect(() => {
    const getProviderData = async () => {
      try {
        // Fetch provider details
        const provider = await fetchProviderDetailsId(providerId);

        if (!provider) {
          throw new Error("Provider not found");
        }

        // Fetch provider work details
        const workDetails = await fetch(
          `https://api.coolieno1.in/v1.0/providers/work/${providerId}`,
        );
        const workData = await workDetails.json();
        const experience =
          workData?.length > 0 ? workData[0].works[0]?.experience : "N/A";
        const services =
          workData?.length > 0
            ? workData[0].works.map((work) => [work.nameOfService])
            : [];

        // Combine the data
        const formattedData = {
          name: provider.providerName,
          mobile: provider.phone,
          email: "provider@example.com", // Use actual email if available
          address: provider.address,
          rating: "N/A", // If rating is part of work details, replace with actual data
          experience: experience,
          services: services,
          image: provider.image,
          age: provider.age,
          pincode: provider.pincode,
          radius: provider.radius,
          gender: provider.gender,
        };

        setProviderData(formattedData);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load provider data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (providerId) {
      getProviderData();
    }
  }, [providerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="provider-profile-container">
      <button className="back-button" onClick={onBackClick}>
        <FaArrowLeft className="back-icon" /> Back
      </button>
      <div className="profile-section">
        <div className="profile-image-container">
          <img
            src={providerData.image || ProfileImage}
            alt="Profile"
            className="profile-image"
          />
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
            <div className="info-item">
              <label>Age:</label>
              <span>{providerData.age}</span>
            </div>
            <div className="info-item">
              <label>Pincode:</label>
              <span>{providerData.pincode}</span>
            </div>
            <div className="info-item">
              <label>Radius:</label>
              <span>{providerData.radius}</span>
            </div>
            <div className="info-item">
              <label>Gender:</label>
              <span>{providerData.gender}</span>
            </div>
          </div>
        </div>
      </div>
      <h3>Services</h3>
      <div className="services-container">
        <div className="services">
          {providerData.services.length > 0 ? (
            providerData.services.map((serviceRow, index) => (
              <div key={index} className="service-entry">
                {serviceRow.map((service, idx) => (
                  <label key={idx} className="service-checkbox">
                    <input type="checkbox" />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            ))
          ) : (
            <div>No services available</div>
          )}
        </div>
      </div>
      <button className="documentsButton" onClick={onDocumentsClick}>
        Documents
      </button>
    </div>
  );
};

export default ProviderProfile;
