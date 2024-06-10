import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditproviderPromotion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { promotion, apiEndpoint } = location?.state || {};

  const { promoName, serviceType, cities, noOfJobs, offerAmount, validFrom, validTill, notifyProviders } = promotion;

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
        `http://13.126.118.3:3000/v1.0/admin/provider-promotions/${promotion._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPromotion),
        }
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
    <div className="edit-promotion-form">
      <h1>Edit provider Promotion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="promoName"
          value={editedPromotion.promoName}
          placeholder="Enter Promotion Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="serviceType"
          value={editedPromotion.serviceType}
          placeholder="Enter Service Type"
          onChange={handleChange}
        />
        <input
          type="text"
          name="cities"
          value={editedPromotion.cities}
          placeholder="Enter Cities"
          onChange={handleChange}
        />
        <input
          type="number"
          name="noOfJobs"
          value={editedPromotion.noOfJobs}
          placeholder="Enter Number of Jobs"
          onChange={handleChange}
        />
        <input
          type="number"
          name="offerAmount"
          value={editedPromotion.offerAmount}
          placeholder="Enter Offer Amount"
          onChange={handleChange}
        />
        <input
          type="date"
          name="validFrom"
          value={editedPromotion.validFrom}
          placeholder="Valid From"
          onChange={handleChange}
        />
        <input
          type="date"
          name="validTill"
          value={editedPromotion.validTill}
          placeholder="Valid Till"
          onChange={handleChange}
        />
        <label>
          Notify Providers:
          <input
            type="checkbox"
            name="notifyProviders"
            checked={editedPromotion.notifyProviders}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditproviderPromotion;
