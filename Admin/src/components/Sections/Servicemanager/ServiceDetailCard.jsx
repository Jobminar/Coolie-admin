import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./servicemanager.css"; // Ensure the CSS file is correctly linked

const ServiceDetailCard = ({ service, category, subCategory, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [serviceData, setServiceData] = useState({
    name: "",
    type: "",
    price: "",
    time: "",
    description: "",
    locations: "",
    city: "",
    tax: "",
    commission: "",
    mostBooked: false,
    tag: false,
    cashAfterService: false,
  });

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(
          `http://13.126.118.3:3000/v1.0/core/categories/${category}`,
        );
        setCategoryName(response.data.name);
      } catch (error) {
        console.error("Error fetching category name:", error);
      }
    };

    const fetchSubCategoryName = async () => {
      try {
        const response = await axios.get(
          `http://13.126.118.3:3000/v1.0/core/sub-categories/${subCategory}`,
        );
        setSubCategoryName(response.data.name);
      } catch (error) {
        console.error("Error fetching sub-category name:", error);
      }
    };

    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `http://13.126.118.3:3000/v1.0/core/services/${service._id}`,
        );
        setServiceData(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchCategoryName();
    fetchSubCategoryName();
    fetchServiceDetails();
  }, [category, subCategory, service._id]);

  return (
    <div className="service-detail-card">
      <div className="service-detail-header">
        <h6>Category: {categoryName}</h6>
        <h6>Sub-Category: {subCategoryName}</h6>
        <h6>Service: {serviceData.name}</h6>
      </div>
      <form className="add-service-form">
        <div className="form-group">
          <label>Service Name:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Service Type:</label>
          <select
            className="bottom-borders-input"
            value={serviceData.type}
            readOnly
          >
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
            className="bottom-borders-input"
            value={serviceData.price}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Total Service Time:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.time}
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
          <label>Locations:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.locations}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.city}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>TAX %:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.tax}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Provider commission:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.commission}
            readOnly
          />
        </div>
        <div className="form-group toggle-group">
          <label>Add to most booked service</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.mostBooked}
            readOnly
          />
        </div>
        <div className="form-group toggle-group">
          <label>TAG</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.tag}
            readOnly
          />
        </div>
        <div className="form-group toggle-group">
          <label>Cash After Service</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.cashAfterService}
            readOnly
          />
        </div>
        <button type="button" className="submit-button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

ServiceDetailCard.propTypes = {
  service: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ServiceDetailCard;
