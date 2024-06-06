import React from "react";
import PropTypes from "prop-types";
import "./filterbar.css";

const FilterBar = ({
  showGenderFilter,
  showPackageFilter,
  showServiceFilter,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-item">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter location"
        />
      </div>
      {showServiceFilter && (
        <div className="filter-item">
          <label htmlFor="service">Service:</label>
          <input
            type="text"
            id="service"
            name="service"
            placeholder="Enter service"
          />
        </div>
      )}
      <div className="filter-item">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" />
      </div>
      {showGenderFilter && (
        <div className="filter-item">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      )}
      {showPackageFilter && (
        <div className="filter-item">
          <label htmlFor="package">Package:</label>
          <select id="package" name="package">
            <option value="">Select Package</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      )}
    </div>
  );
};

FilterBar.propTypes = {
  showGenderFilter: PropTypes.bool,
  showPackageFilter: PropTypes.bool,
  showServiceFilter: PropTypes.bool,
};

export default FilterBar;
