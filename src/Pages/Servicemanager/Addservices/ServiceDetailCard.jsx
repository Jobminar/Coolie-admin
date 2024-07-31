import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles/servicemanager.css";

const ServiceDetailCard = ({ service, category, subCategory, onClose }) => {
  const [categoryName, setCategoryName] = useState(category?.name || "");
  const [subCategoryName, setSubCategoryName] = useState(
    subCategory?.name || "",
  );

  const [serviceData, setServiceData] = useState({
    name: service.name,
    serviceType: service.serviceVariants[0]?.variantName || "",
    price: service.serviceVariants[0]?.price || 0,
    serviceTime: service.serviceVariants[0]?.serviceTime || 0,
    metric: service.serviceVariants[0]?.metric || "",
    min: service.serviceVariants[0]?.min || "",
    max: service.serviceVariants[0]?.max || "",
    description: service.description,
    locations: service.locations,
    taxPercentage: service.taxPercentage,
    isMostBooked: service.isMostBooked,
    tag: service.tag,
    isCash: service.isCash,
    creditEligibility: service.creditEligibility,
    platformCommission: service.platformCommission,
    isActive: service.isActive,
    isDeleted: service.isDeleted,
  });

  useEffect(() => {
    setCategoryName(category?.name || "");
    setSubCategoryName(subCategory?.name || "");
    setServiceData({
      name: service.name,
      serviceType: service.serviceVariants[0]?.variantName || "",
      price: service.serviceVariants[0]?.price || 0,
      serviceTime: service.serviceVariants[0]?.serviceTime || 0,
      metric: service.serviceVariants[0]?.metric || "",
      min: service.serviceVariants[0]?.min || "",
      max: service.serviceVariants[0]?.max || "",
      description: service.description,
      locations: service.locations,
      taxPercentage: service.taxPercentage,
      isMostBooked: service.isMostBooked,
      tag: service.tag,
      isCash: service.isCash,
      creditEligibility: service.creditEligibility,
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
            className="service-input-borders"
            value={serviceData.name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Service Type:</label>
          <input
            type="text"
            className="service-input-borders"
            value={serviceData.serviceType}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Service Price:</label>
          <input
            type="text"
            className="service-input-borders"
            value={serviceData.price}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Total Service Time:</label>
          <input
            type="text"
            className="service-input-borders"
            value={serviceData.serviceTime}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Metric:</label>
          <input
            type="text"
            className="service-input-borders"
            value={serviceData.metric}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Min:</label>
          <input
            type="text"
            className="service-input-borders"
            value={serviceData.min}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Max:</label>
          <input
            type="text"
            className="service-input-borders"
            value={serviceData.max}
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
            className="service-input-borders"
            value={serviceData.locations.join(", ")}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Tax Percentage:</label>
          <input
            type="text"
            className="service-input-borders"
            value={serviceData.taxPercentage}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Platform Commission:</label>
          <input
            type="text"
            className="service-input-borders"
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
        price: PropTypes.number,
        serviceTime: PropTypes.number,
        metric: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number,
      }),
    ),
    description: PropTypes.string,
    locations: PropTypes.array,
    taxPercentage: PropTypes.string,
    isMostBooked: PropTypes.bool,
    tag: PropTypes.bool,
    isCash: PropTypes.bool,
    creditEligibility: PropTypes.bool,
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
