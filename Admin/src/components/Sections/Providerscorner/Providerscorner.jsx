import React, { useState } from "react";
import "./ProvidersCorner.css";
import ProviderForm from "./ProviderForm";
import AddProvider from "./AddProviderForm";
import AuthenticateProvider from "./AuthenticateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProvidersCorner = () => {
  const [visibleCategories, setVisibleCategories] = useState([
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Carpentry",
  ]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeComponent, setActiveComponent] = useState("view");
  const [showProviders, setShowProviders] = useState(false);

  const allCategories = [
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Beauty & salon",
    "Labour supply",
    "Painting",
    "Gardening",
    "HVAC",
    "Pest Control",
    "Moving",
    "General Maintenance",
  ];

  const handlePrev = () => {
    setActiveCategory((prev) =>
      prev > 0 ? prev - 1 : allCategories.length - 1,
    );
    setVisibleCategories((prev) => [
      ...prev.slice(1),
      allCategories[
        (activeCategory + allCategories.length - 1) % allCategories.length
      ],
    ]);
  };

  const handleNext = () => {
    setActiveCategory((prev) => (prev + 1) % allCategories.length);
    setVisibleCategories((prev) => [
      allCategories[(activeCategory + 1) % allCategories.length],
      ...prev.slice(0, -1),
    ]);
  };

  const toggleProviders = () => {
    setShowProviders(!showProviders);
  };

  const providers = [
    {
      id: 1,
      name: "Provider 1",
      email: "provider1@example.com",
      phone: "1234567890",
      location: "Location 1",
      joinDate: "2021-01-01",
      loyaltyPoints: 100,
      package: "Basic",
      status: "active",
    },
    {
      id: 2,
      name: "Provider 2",
      email: "provider2@example.com",
      phone: "1234567891",
      location: "Location 2",
      joinDate: "2021-02-01",
      loyaltyPoints: 200,
      package: "Premium",
      status: "inactive",
    },
    {
      id: 3,
      name: "Provider 3",
      email: "provider3@example.com",
      phone: "1234567892",
      location: "Location 3",
      joinDate: "2021-03-01",
      loyaltyPoints: 300,
      package: "Basic",
      status: "active",
    },
    {
      id: 4,
      name: "Provider 4",
      email: "provider4@example.com",
      phone: "1234567893",
      location: "Location 4",
      joinDate: "2021-04-01",
      loyaltyPoints: 400,
      package: "Premium",
      status: "inactive",
    },
    {
      id: 5,
      name: "Provider 5",
      email: "provider5@example.com",
      phone: "1234567894",
      location: "Location 5",
      joinDate: "2021-05-01",
      loyaltyPoints: 500,
      package: "Basic",
      status: "active",
    },
  ];

  const handleEdit = (provider) => {
    console.log("Edit provider:", provider.id);
  };

  const handleDelete = (providerId) => {
    console.log("Delete provider:", providerId);
  };

  return (
    <div className="providers-container">
      <h3>Service Providers Corner</h3>
      <div className="providers-toolbar">
        <button
          className={`providers-btn ${
            activeComponent === "view" ? "active" : ""
          }`}
          onClick={() => setActiveComponent("view")}
        >
          Bird Eye View
        </button>
        <button
          className={`providers-btn ${
            activeComponent === "add" ? "active" : ""
          }`}
          onClick={() => setActiveComponent("add")}
        >
          Add a Provider
        </button>
        <button
          className={`providers-btn ${
            activeComponent === "authenticate" ? "active" : ""
          }`}
          onClick={() => setActiveComponent("authenticate")}
        >
          Authenticate
        </button>
        <button
          className={`providers-btn ${
            activeComponent === "manage" ? "active" : ""
          }`}
          onClick={() => setActiveComponent("manage")}
        >
          Manage Providers
        </button>
      </div>
      {activeComponent === "view" && (
        <>
          <div className="providers-sidebar">
            <button className="providers-arrow" onClick={handlePrev}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="providers-categories">
              {visibleCategories.map((category, index) => (
                <button
                  key={index}
                  className={`providers-category ${
                    index === activeCategory ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(index)}
                >
                  {category}
                </button>
              ))}
            </div>
            <button className="providers-arrow" onClick={handleNext}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <button
            id="showproviders-btn"
            className="custom-show-providers-btn"
            onClick={toggleProviders}
          >
            {showProviders ? "Hide All Providers" : "Show All Providers"}
          </button>
          <div className="providers-table-container">
            {showProviders && (
              <table className="providers-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Provider name</th>
                    <th>Email Address</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Join date</th>
                    <th>Loyalty Points</th>
                    <th>Package</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((provider) => (
                    <tr key={provider.id}>
                      <td>{provider.id}</td>
                      <td>{provider.name}</td>
                      <td>{provider.email}</td>
                      <td>{provider.phone}</td>
                      <td>{provider.location}</td>
                      <td>{provider.joinDate}</td>
                      <td>{provider.loyaltyPoints}</td>
                      <td>{provider.package}</td>
                      <td>
                        <div
                          className={`status-toggle ${
                            provider.status === "active" ? "active" : "inactive"
                          }`}
                        ></div>
                      </td>
                      <td>
                        <button
                          className="action-button edit"
                          onClick={() => handleEdit(provider)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-button delete"
                          onClick={() => handleDelete(provider.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="providers-main-content">
              {/* Google Maps integration */}
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345094493!2d-122.41941538468188!3d37.77492917975861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5e1e6c3b%3A0x1c3abf24c9452b09!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1614892339630!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </>
      )}
      {activeComponent === "add" && <AddProvider />}
      {activeComponent === "manage" && <ProviderForm />}
      {activeComponent === "authenticate" && <AuthenticateProvider />}
    </div>
  );
};

export default ProvidersCorner;
