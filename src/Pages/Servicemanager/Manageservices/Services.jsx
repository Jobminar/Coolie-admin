import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";

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
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this service?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`${API_BASE_URL}/v1.0/core/services/${serviceId}`)
              .then((response) => {
                setServices((prev) =>
                  prev.filter((service) => service._id !== serviceId),
                );
                toast.success("Service deleted successfully.");
              })
              .catch((error) => {
                console.error("Error deleting service:", error);
                toast.error("Error deleting service.");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleEditService = (service) => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to edit this service?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setSelectedService(service);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="manageServiceCard" id="serviceCard">
      <div className="manageServiceFormGroup">
        <div className="manageServiceCategoryHeader">
          <span>Select Service</span>
          <button
            className="manageServiceHamburgerIcon"
            onClick={() => setShowServiceVariantsMenu(!showServiceVariantsMenu)}
          >
            &#9776;
          </button>
        </div>
      </div>

      {showServiceVariantsMenu && (
        <div className="manageServiceMenu">
          {services.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className={`manageServiceMenuItem ${
                  selectedService && selectedService._id === service._id
                    ? "selected"
                    : ""
                }`}
              >
                <span onClick={() => setSelectedService(service)}>
                  {service.name}
                </span>
                <div className="manageServiceIconGroup">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="manageServiceEditIcon"
                    onClick={() => handleEditService(service)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="manageServiceDeleteIcon"
                    onClick={() => handleDeleteService(service._id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="manageServiceMenuItem">No services found</div>
          )}
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
