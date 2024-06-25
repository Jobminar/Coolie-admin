import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditproviderPromotion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { promotion, apiEndpoint } = location?.state || {};

  const {
    promoName,
    serviceType,
    cities,
    noOfJobs,
    offerAmount,
    validFrom,
    validTill,
    notifyProviders,
  } = promotion;

  const [editedPromotion, setEditedPromotion] = useState({
    promoName,
    serviceType,
    cities,
    noOfJobs,
    offerAmount,
    validFrom,
    validTill,
    notifyProviders,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.coolieno1.in/v1.0/admin/provider-promotions/${promotion._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPromotion),
        },
      );
      if (response.ok) {
        alert("Promotion updated successfully");
        navigate(-1); // Navigate back to the previous page
      }
    } catch (err) {
      console.error("Error:", err);
      alert(err.message || "An error occurred while updating promotion");
    }
  };

  return (
    <div className="u-mian-con">
      <h1>Edit provider Promotion</h1>
      <form onSubmit={handleSubmit} className="universal-edit-con">
        <div className="universal-edit">
          <p>Promotion Name:</p>
          <input
            type="text"
            name="promoName"
            value={editedPromotion.promoName}
            placeholder="Enter Promotion Name"
            onChange={handleChange}
          />
        </div>
        <div className="universal-edit">
          <p>Service Type:</p>
          <input
            type="text"
            name="serviceType"
            value={editedPromotion.serviceType}
            placeholder="Enter Service Type"
            onChange={handleChange}
          />
        </div>
        <div className="universal-edit">
          <p>Cities:</p>
          <input
            type="text"
            name="cities"
            value={editedPromotion.cities}
            placeholder="Enter Cities"
            onChange={handleChange}
          />
        </div>
        <div className="universal-edit">
          <p>Number of Jobs:</p>
          <input
            type="number"
            name="noOfJobs"
            value={editedPromotion.noOfJobs}
            placeholder="Enter Number of Jobs"
            onChange={handleChange}
          />
        </div>
        <div className="universal-edit">
          <p>Offer Amount:</p>
          <input
            type="number"
            name="offerAmount"
            value={editedPromotion.offerAmount}
            placeholder="Enter Offer Amount"
            onChange={handleChange}
          />
        </div>
        <div className="universal-edit">
          <p>Valid From:</p>
          <input
            type="date"
            name="validFrom"
            value={editedPromotion.validFrom}
            placeholder="Valid From"
            onChange={handleChange}
          />
        </div>
        <div className="universal-edit">
          <p>Valid Till:</p>
          <input
            type="date"
            name="validTill"
            value={editedPromotion.validTill}
            placeholder="Valid Till"
            onChange={handleChange}
          />
        </div>
        <div className="universal-edit-notify">
          <p>Notify Users</p>
          <input
            type="checkbox"
            name="notifyUsers"
            checked={editedPromotion.notifyUsers}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="update-button">
          Update promotion
        </button>
      </form>
    </div>
  );
};

export default EditproviderPromotion;
