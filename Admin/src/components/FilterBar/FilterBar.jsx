import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./filterbar.css";

const FilterBar = ({
  activeComponent,
  activeComponentState,
  setActiveComponentState,
  showGenderFilter,
  showPackageFilter,
  showServiceFilter,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    console.log("Filters:", {
      location: selectedLocation,
      service: selectedService,
      gender: selectedGender,
      package: selectedPackage,
      date: selectedDate,
    });
  }, [
    selectedLocation,
    selectedService,
    selectedGender,
    selectedPackage,
    selectedDate,
  ]);

  return (
    <div className="filter-bar">
      <div className="header-row">
        <h2>{activeComponent}</h2>
        {activeComponent === "Jobs Area" && (
          <button
            className={`filter-btn ${
              activeComponentState === "add" ? "active" : ""
            }`}
            onClick={() => setActiveComponentState("add")}
          >
            Add Job
          </button>
        )}
      </div>
      {activeComponent === "Providers Corner" && (
        <div className="filter-buttons">
          <button
            className={`filter-btn ${
              activeComponentState === "view" ? "active" : ""
            }`}
            onClick={() => setActiveComponentState("view")}
          >
            Bird Eye View
          </button>
          <button
            className={`filter-btn ${
              activeComponentState === "add" ? "active" : ""
            }`}
            onClick={() => setActiveComponentState("add")}
          >
            Add a Provider
          </button>
          <button
            className={`filter-btn ${
              activeComponentState === "authenticate" ? "active" : ""
            }`}
            onClick={() => setActiveComponentState("authenticate")}
          >
            Authenticate
          </button>
          <button
            className={`filter-btn ${
              activeComponentState === "manage" ? "active" : ""
            }`}
            onClick={() => setActiveComponentState("manage")}
          >
            Manage Providers
          </button>
          <button
            className={`filter-btn ${
              activeComponentState === "list" ? "active" : ""
            }`}
            onClick={() => setActiveComponentState("list")}
          >
            Provider List
          </button>
        </div>
      )}

      <div className="filter-items">
        <div className="filter-item">
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            name="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
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
            <select
              id="service"
              name="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
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
            <select
              id="gender"
              name="gender"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        )}
        {showPackageFilter && (
          <div className="filter-item">
            <label htmlFor="package">Package:</label>
            <select
              id="package"
              name="package"
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
            >
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
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  activeComponent: PropTypes.string.isRequired,
  activeComponentState: PropTypes.string.isRequired,
  setActiveComponentState: PropTypes.func.isRequired,
  showGenderFilter: PropTypes.bool,
  showPackageFilter: PropTypes.bool,
  showServiceFilter: PropTypes.bool,
};

export default FilterBar;
