import React, { useEffect, useState } from "react";
import "./styles/ProviderProfile.css";
import { FaArrowLeft } from "react-icons/fa";
import ProfileImage from "../../assets/images/profile-image.jpeg";

const ProviderProfile = ({ onDocumentsClick, onBackClick, providerId }) => {
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workDetails, setWorkDetails] = useState([]);
  const [checkedServices, setCheckedServices] = useState({});

  useEffect(() => {
    const fetchProviderDetails = async (providerId) => {
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

    const fetchProviderWorkDetails = async (providerId) => {
      try {
        const response = await fetch(
          `https://api.coolieno1.in/v1.0/providers/work/${providerId}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.length > 0 ? data[0].works : [];
      } catch (error) {
        console.error("Failed to fetch provider work details:", error);
        return [];
      }
    };

    const getProviderData = async () => {
      if (!providerId) {
        console.error("Provider ID is missing");
        return;
      }

      try {
        const provider = await fetchProviderDetails(providerId);
        if (!provider) {
          throw new Error("Provider not found");
        }

        const workData = await fetchProviderWorkDetails(providerId);
        setWorkDetails(workData);

        // Initialize checkedServices state with all services unchecked
        const initialCheckedState = {};
        workData.forEach((work) => {
          initialCheckedState[work._id] = false; // All services unchecked by default
        });
        setCheckedServices(initialCheckedState);

        setProviderData(provider);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load provider data:", err);
      } finally {
        setLoading(false);
      }
    };

    getProviderData();
  }, [providerId]);

  const handleServiceCheck = (serviceId) => {
    setCheckedServices((prevChecked) => ({
      ...prevChecked,
      [serviceId]: !prevChecked[serviceId], // Toggle the checked state
    }));
  };

  const handleDocumentsButtonClick = () => {
    onDocumentsClick(providerId); // Pass the providerId back to the parent
  };

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
              <span>{providerData.providerName}</span>
            </div>
            <div className="info-item">
              <label>Mobile:</label>
              <span>{providerData.phone}</span>
            </div>
            <div className="info-item">
              <label>Address:</label>
              <span>{providerData.address}</span>
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
          {workDetails.length > 0 ? (
            workDetails.map((work) => (
              <div key={work._id} className="service-entry">
                <label className="service-checkbox">
                  <input
                    type="checkbox"
                    checked={checkedServices[work._id] || false}
                    onChange={() => handleServiceCheck(work._id)}
                  />
                  <span>{work.nameOfService}</span>
                </label>
                <span>Experience: {work.experience}</span>
              </div>
            ))
          ) : (
            <div>No services available</div>
          )}
        </div>
      </div>
      <button className="documentsButton" onClick={handleDocumentsButtonClick}>
        Documents
      </button>
    </div>
  );
};

export default ProviderProfile;
