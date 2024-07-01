import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./filterbar.css";
import { FilterBarContext } from "../../FilterBarContext";

const FilterBar = ({
  activeComponent,
  activeComponentState,
  setActiveComponentState,
  showGenderFilter,
  showPackageFilter,
  showServiceFilter,
  showLocationFilter = true,
  showDateFilter = true,
  showStatusFilter = false,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const { filterBarProps } = useContext(FilterBarContext);

  useEffect(() => {
    console.log("Filters:", {
      location: selectedLocation,
      service: selectedService,
      gender: selectedGender,
      package: selectedPackage,
      date: selectedDate,
      status: selectedStatus,
    });
  }, [
    selectedLocation,
    selectedService,
    selectedGender,
    selectedPackage,
    selectedDate,
    selectedStatus,
  ]);

  const shouldShowFilters =
    activeComponent === "Providers Corner" && activeComponentState === "list";

  useEffect(() => {
    setShowCategoryFilter(
      activeComponent === "Providers Corner" && activeComponentState === "list",
    );
  }, [activeComponent, activeComponentState]);

  return (
    <div className="filter-bar">
      <div className="header-row">
        <h2 className={activeComponent === "Jobs Area" ? "small-header" : ""}>
          {activeComponent}
        </h2>
        {(activeComponent === "Jobs Area" ||
          activeComponent === "User Corner") && (
          <div className="inline-filters">
            {showGenderFilter && activeComponent === "User Corner" && (
              <div className="filter-item-inline">
                <label htmlFor="gender-inline">Gender:</label>
                <select
                  id="gender-inline"
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
            {showLocationFilter && (
              <div className="filter-item-inline">
                <label htmlFor="location-inline">Location:</label>
                <select
                  id="location-inline"
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
            )}
            {showServiceFilter && activeComponent === "Jobs Area" && (
              <div className="filter-item-inline">
                <label htmlFor="service-inline">Service:</label>
                <select
                  id="service-inline"
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
            {showDateFilter && (
              <div className="filter-item-inline">
                <label htmlFor="date-inline">Date:</label>
                <DatePicker
                  id="date-inline"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className="date-picker"
                />
              </div>
            )}
            {activeComponent === "Jobs Area" && (
              <button
                className={`filter-btn small-btn ${
                  activeComponentState === "add" ? "active" : ""
                }`}
                onClick={() => setActiveComponentState("add")}
              >
                Add Job
              </button>
            )}
          </div>
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

      {shouldShowFilters && (
        <div className="filter-items">
          {showLocationFilter && (
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
          )}
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
          {showGenderFilter && activeComponent === "User Corner" && (
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
          {showCategoryFilter && (
            <div className="filter-item">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </div>
          )}
          {showStatusFilter && (
            <div className="filter-item">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          )}
        </div>
      )}
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
  showLocationFilter: PropTypes.bool,
  showDateFilter: PropTypes.bool,
  showStatusFilter: PropTypes.bool,
};

export default FilterBar;
