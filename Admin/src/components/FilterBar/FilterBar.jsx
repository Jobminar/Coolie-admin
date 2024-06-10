import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./filterbar.css";

const FilterBar = ({
  showGenderFilter,
  showPackageFilter,
  showServiceFilter,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="filter-bar">
      <div className="filter-item">
        <label htmlFor="location">Location:</label>
        <select id="location" name="location">
          <option value="">Select Location</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="bangalore">Bangalore</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="ahmedabad">Ahmedabad</option>
          <option value="chennai">Chennai</option>
          <option value="kolkata">Kolkata</option>
          <option value="pune">Pune</option>
          <option value="jaipur">Jaipur</option>
          <option value="surat">Surat</option>
        </select>
      </div>
      {showServiceFilter && (
        <div className="filter-item">
          <label htmlFor="service">Service:</label>
          <select id="service" name="service">
            <option value="">Select Service</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="cleaning">Cleaning</option>
            <option value="gardening">Gardening</option>
          </select>
        </div>
      )}
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
      <div className="filter-item">
        <label htmlFor="date">Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="date-picker"
          placeholderText="Select Date"
          dateFormat="dd/MM/yyyy" // Specify the date format here
        />
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  showGenderFilter: PropTypes.bool,
  showPackageFilter: PropTypes.bool,
  showServiceFilter: PropTypes.bool,
};

export default FilterBar;
