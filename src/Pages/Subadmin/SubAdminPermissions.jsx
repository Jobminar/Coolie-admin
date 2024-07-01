import React, { useState } from "react";
import "./SubAdminPermissions.css";

const PermissionsForm = () => {
  const [permissions, setPermissions] = useState({
    jobsArea: {},
    serviceManager: {},
    userCorner: {},
    providerCorner: {},
    loyaltyCard: "",
    banners: {},
    marketing: {},
    subAdmin: {},
  });

  const handleCheckboxChange = (category) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [category]: {
        ...prevPermissions[category],
        all: !prevPermissions[category].all,
      },
    }));
  };

  const handleRadioChange = (category, value) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [category]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted permissions:", permissions);
  };

  return (
    <form onSubmit={handleSubmit} className="permissions-form">
      <h3>Allocate permission</h3>

      <div className="permissions-grid">
        <div className="permissions-category">
          <h4>Jobs Area</h4>
          <label>
            <input
              type="checkbox"
              checked={permissions.jobsArea.all || false}
              onChange={() => handleCheckboxChange("jobsArea")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="jobsArea"
              checked={permissions.jobsArea === "pending"}
              onChange={() => handleRadioChange("jobsArea", "pending")}
            />
            Pending jobs
          </label>
          <label>
            <input
              type="radio"
              name="jobsArea"
              checked={permissions.jobsArea === "currentlyServing"}
              onChange={() => handleRadioChange("jobsArea", "currentlyServing")}
            />
            Currently serving jobs
          </label>
          <label>
            <input
              type="radio"
              name="jobsArea"
              checked={permissions.jobsArea === "completed"}
              onChange={() => handleRadioChange("jobsArea", "completed")}
            />
            Completed jobs
          </label>
          <label>
            <input
              type="radio"
              name="jobsArea"
              checked={permissions.jobsArea === "accepted"}
              onChange={() => handleRadioChange("jobsArea", "accepted")}
            />
            Accepted by providers
          </label>
          <label>
            <input
              type="radio"
              name="jobsArea"
              checked={permissions.jobsArea === "declined"}
              onChange={() => handleRadioChange("jobsArea", "declined")}
            />
            Declined by providers
          </label>
          <label>
            <input
              type="radio"
              name="jobsArea"
              checked={permissions.jobsArea === "canceled"}
              onChange={() => handleRadioChange("jobsArea", "canceled")}
            />
            Customer canceled jobs
          </label>
        </div>

        <div className="permissions-category">
          <h4>Service Manager</h4>
          <label>
            <input
              type="checkbox"
              checked={permissions.serviceManager.all || false}
              onChange={() => handleCheckboxChange("serviceManager")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="serviceManager"
              checked={permissions.serviceManager === "addService"}
              onChange={() => handleRadioChange("serviceManager", "addService")}
            />
            Add a service
          </label>
          <label>
            <input
              type="radio"
              name="serviceManager"
              checked={permissions.serviceManager === "manageService"}
              onChange={() =>
                handleRadioChange("serviceManager", "manageService")
              }
            />
            Manage a service
          </label>
        </div>

        <div className="permissions-category">
          <h4>User Corner</h4>
          <label>
            <input
              type="checkbox"
              checked={permissions.userCorner.all || false}
              onChange={() => handleCheckboxChange("userCorner")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="userCorner"
              checked={permissions.userCorner === "user"}
              onChange={() => handleRadioChange("userCorner", "user")}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="userCorner"
              checked={permissions.userCorner === "addUser"}
              onChange={() => handleRadioChange("userCorner", "addUser")}
            />
            Add a user
          </label>
        </div>

        <div className="permissions-category">
          <h4>Provider Corner</h4>
          <label>
            <input
              type="checkbox"
              checked={permissions.providerCorner.all || false}
              onChange={() => handleCheckboxChange("providerCorner")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="providerCorner"
              checked={permissions.providerCorner === "addProvider"}
              onChange={() =>
                handleRadioChange("providerCorner", "addProvider")
              }
            />
            Add a provider
          </label>
          <label>
            <input
              type="radio"
              name="providerCorner"
              checked={permissions.providerCorner === "authenticate"}
              onChange={() =>
                handleRadioChange("providerCorner", "authenticate")
              }
            />
            Authenticate
          </label>
          <label>
            <input
              type="radio"
              name="providerCorner"
              checked={permissions.providerCorner === "manageProvider"}
              onChange={() =>
                handleRadioChange("providerCorner", "manageProvider")
              }
            />
            Manage provider
          </label>
        </div>

        <div className="permissions-category">
          <h4>Loyalty Card</h4>
          <label>
            <input
              type="checkbox"
              checked={permissions.loyaltyCard === "all"}
              onChange={() => handleCheckboxChange("loyaltyCard")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="loyaltyCard"
              checked={permissions.loyaltyCard === "bronze"}
              onChange={() => handleRadioChange("loyaltyCard", "bronze")}
            />
            Bronze
          </label>
          <label>
            <input
              type="radio"
              name="loyaltyCard"
              checked={permissions.loyaltyCard === "silver"}
              onChange={() => handleRadioChange("loyaltyCard", "silver")}
            />
            Silver
          </label>
          <label>
            <input
              type="radio"
              name="loyaltyCard"
              checked={permissions.loyaltyCard === "gold"}
              onChange={() => handleRadioChange("loyaltyCard", "gold")}
            />
            Gold
          </label>
        </div>

        <div className="permissions-category">
          <h4>Banners</h4>
          <label>
            <input
              type="checkbox"
              checked={permissions.banners.all || false}
              onChange={() => handleCheckboxChange("banners")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="banners"
              checked={permissions.banners === "cleaning"}
              onChange={() => handleRadioChange("banners", "cleaning")}
            />
            Cleaning banner
          </label>
          <label>
            <input
              type="radio"
              name="banners"
              checked={permissions.banners === "kitchen"}
              onChange={() => handleRadioChange("banners", "kitchen")}
            />
            Kitchen cleaning
          </label>
          <label>
            <input
              type="radio"
              name="banners"
              checked={permissions.banners === "carwash"}
              onChange={() => handleRadioChange("banners", "carwash")}
            />
            Carwash cleaning
          </label>
        </div>

        <div className="permissions-category">
          <h4>Marketing</h4>
          <label>
            <input
              type="checkbox"
              checked={permissions.marketing.all || false}
              onChange={() => handleCheckboxChange("marketing")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="marketing"
              checked={permissions.marketing === "provider"}
              onChange={() => handleRadioChange("marketing", "provider")}
            />
            Provider
          </label>
          <label>
            <input
              type="radio"
              name="marketing"
              checked={permissions.marketing === "user"}
              onChange={() => handleRadioChange("marketing", "user")}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="marketing"
              checked={permissions.marketing === "nonUser"}
              onChange={() => handleRadioChange("marketing", "nonUser")}
            />
            Non-user
          </label>
        </div>

        <div className="permissions-category">
          <h4>Sub-admin</h4>
          <label>
            <input
              type="checkbox"
              checked={permissions.subAdmin.all || false}
              onChange={() => handleCheckboxChange("subAdmin")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="subAdmin"
              checked={permissions.subAdmin === "addSubAdmin"}
              onChange={() => handleRadioChange("subAdmin", "addSubAdmin")}
            />
            Add sub-admin
          </label>
          <label>
            <input
              type="radio"
              name="subAdmin"
              checked={permissions.subAdmin === "manageSubAdmin"}
              onChange={() => handleRadioChange("subAdmin", "manageSubAdmin")}
            />
            Manage sub-admin
          </label>
        </div>
      </div>

      <button type="submit" className="permissions-submit-button">
        Done
      </button>
    </form>
  );
};

export default PermissionsForm;
