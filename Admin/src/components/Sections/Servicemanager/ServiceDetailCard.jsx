import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./servicemanager.css";

const ServiceDetailCard = ({ service, category, subCategory, onClose }) => {
  const [categoryName, setCategoryName] = useState(category.name || "");
  const [subCategoryName, setSubCategoryName] = useState(
    subCategory.name || "",
  );
  const [serviceData, setServiceData] = useState({
    name: service.name,
    serviceType: service.serviceVariants[0]?.variantName || "",
    price: service.serviceVariants[0]?.price || "",
    serviceTime: service.serviceVariants[0]?.serviceTime || "",
    description: service.description,
    locations: service.locations,
    taxPercentage: service.taxPercentage,
    isMostBooked: service.isMostBooked,
    tag: service.tag,
    isCash: service.isCash,
    creditEligibility: service.creditEligibility,
    selectedUserPackage: service.selectedUserPackage,
    selectedProviderPackage: service.selectedProviderPackage,
    platformCommission: service.platformCommission,
    isActive: service.isActive,
    isDeleted: service.isDeleted,
  });

  useEffect(() => {
    setCategoryName(category.name || "");
    setSubCategoryName(subCategory.name || "");
    setServiceData({
      name: service.name,
      serviceType: service.serviceVariants[0]?.variantName || "",
      price: service.serviceVariants[0]?.price || "",
      serviceTime: service.serviceVariants[0]?.serviceTime || "",
      description: service.description,
      locations: service.locations,
      taxPercentage: service.taxPercentage,
      isMostBooked: service.isMostBooked,
      tag: service.tag,
      isCash: service.isCash,
      creditEligibility: service.creditEligibility,
      selectedUserPackage: service.selectedUserPackage,
      selectedProviderPackage: service.selectedProviderPackage,
      platformCommission: service.platformCommission,
      isActive: service.isActive,
      isDeleted: service.isDeleted,
    });
  }, [service, category, subCategory]);

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
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.serviceType}
            readOnly
          />
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
            value={serviceData.serviceTime}
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
            value={serviceData.locations.join(", ")}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Tax Percentage:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.taxPercentage}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>User Package:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.selectedUserPackage}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Provider Package:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.selectedProviderPackage}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Platform Commission:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.platformCommission}
            readOnly
          />
        </div>
        <div className="form-group toggle-group">
          <label>Add to most booked service</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isMostBooked}
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
            checked={serviceData.isCash}
            readOnly
          />
        </div>
        <div className="form-group toggle-group">
          <label>Credit Eligibility</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.creditEligibility}
            readOnly
          />
        </div>
        <div className="form-group toggle-group">
          <label>Active</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isActive}
            readOnly
          />
        </div>
        <div className="form-group toggle-group">
          <label>Deleted</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isDeleted}
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
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    serviceVariants: PropTypes.arrayOf(
      PropTypes.shape({
        variantName: PropTypes.string,
        price: PropTypes.string,
        serviceTime: PropTypes.string,
      }),
    ),
    description: PropTypes.string,
    locations: PropTypes.array,
    taxPercentage: PropTypes.string,
    isMostBooked: PropTypes.bool,
    tag: PropTypes.bool,
    isCash: PropTypes.bool,
    creditEligibility: PropTypes.bool,
    selectedUserPackage: PropTypes.string,
    selectedProviderPackage: PropTypes.string,
    platformCommission: PropTypes.string,
    isActive: PropTypes.bool,
    isDeleted: PropTypes.bool,
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
