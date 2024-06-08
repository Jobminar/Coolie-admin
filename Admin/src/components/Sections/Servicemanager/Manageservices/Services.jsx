import React from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Ensure axios is imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Services = ({
  services,
  selectedService,
  setSelectedService,
  setServices,
  setShowServiceVariantsMenu,
  showServiceVariantsMenu,
  API_BASE_URL,
}) => {
  const handleDeleteService = (serviceId) => {
    axios
      .delete(`${API_BASE_URL}/v1.0/core/services/${serviceId}`)
      .then((response) => {
        setServices((prev) =>
          prev.filter((service) => service._id !== serviceId),
        );
      })
      .catch((error) => console.error("Error deleting service:", error));
  };

  return (
    <div className="manageservice-card" id="service-card">
      <div className="manageservice-form-group">
        <div className="manageservice-category-header">
          <span>Select Service</span>
          <button
            className="manageservice-hamburger-icon"
            onClick={() => setShowServiceVariantsMenu(!showServiceVariantsMenu)}
          >
            &#9776;
          </button>
        </div>
      </div>

      {showServiceVariantsMenu && (
        <div className="manageservice-menu">
          {services.map((service) => (
            <div
              key={service._id}
              className={`manageservice-menu-item ${
                selectedService && selectedService._id === service._id
                  ? "selected"
                  : ""
              }`}
            >
              <span onClick={() => setSelectedService(service)}>
                {service.name}
              </span>
              <div className="manageservice-icon-group">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="manageservice-edit-icon"
                  onClick={() => setSelectedService(service)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="manageservice-delete-icon"
                  onClick={() => handleDeleteService(service._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Services.propTypes = {
  services: PropTypes.array.isRequired,
  selectedService: PropTypes.object,
  setSelectedService: PropTypes.func.isRequired,
  setServices: PropTypes.func.isRequired,
  setShowServiceVariantsMenu: PropTypes.func.isRequired,
  showServiceVariantsMenu: PropTypes.bool.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
};

export default Services;
