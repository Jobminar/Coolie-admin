import React, { useContext, useState } from "react";
import { ProviderAuthContext } from "./ProviderAuthContext";
import "./AddProvider.css"; // Ensure this is the same stylesheet used for AddProvider

const ProviderDetailsForm = ({
  additionalData,
  handleAdditionalInputChange,
  handleImageChange,
  handleAddDetails,
  submissionError,
}) => {
  const { providerId, phone } = useContext(ProviderAuthContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async () => {
    if (
      !window.confirm("Are you sure you want to submit these provider details?")
    ) {
      return;
    }

    const providerFormData = new FormData();
    providerFormData.append("providerName", additionalData.providerName);
    providerFormData.append("image", additionalData.image);
    providerFormData.append("age", additionalData.age);
    providerFormData.append("phone", phone);
    providerFormData.append("pincode", additionalData.pincode);
    providerFormData.append("radius", additionalData.radius);
    providerFormData.append("work", additionalData.work);
    providerFormData.append("userId", providerId);

    setLoading(true);
    try {
      await handleAddDetails(providerFormData);
      alert("Provider details submitted successfully.");
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error submitting provider details:", error);
      alert("Error submitting provider details.");
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="additional-details-form add-provider-form">
      {loading && <div className="loading">Loading...</div>}
      <h3 className="form-header">Additional Provider Details</h3>
      <form onSubmit={(e) => e.preventDefault()} className="form-content">
        <div className="form-group">
          <label>Provider Name:</label>
          <input
            type="text"
            name="providerName"
            value={additionalData.providerName}
            onChange={handleAdditionalInputChange}
            placeholder="Provider Name"
            className="form-control"
          />
          {errors.providerName && (
            <p className="error">{errors.providerName}</p>
          )}
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="form-control"
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="text"
            name="age"
            value={additionalData.age}
            onChange={handleAdditionalInputChange}
            placeholder="Age"
            className="form-control"
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={phone}
            readOnly
            className="form-control"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={additionalData.pincode}
            onChange={handleAdditionalInputChange}
            placeholder="Pincode"
            className="form-control"
          />
          {errors.pincode && <p className="error">{errors.pincode}</p>}
        </div>
        <div className="form-group">
          <label>Radius:</label>
          <input
            type="text"
            name="radius"
            value={additionalData.radius}
            onChange={handleAdditionalInputChange}
            placeholder="Radius"
            className="form-control"
          />
          {errors.radius && <p className="error">{errors.radius}</p>}
        </div>
        <div className="form-group">
          <label>Work:</label>
          <input
            type="text"
            name="work"
            value={additionalData.work}
            onChange={handleAdditionalInputChange}
            placeholder="Work"
            className="form-control"
          />
          {errors.work && <p className="error">{errors.work}</p>}
        </div>
        <button type="button" className="submit-button" onClick={handleSubmit}>
          Add Details
        </button>
        {submissionError && <p className="error">{submissionError}</p>}
      </form>
    </div>
  );
};

export default ProviderDetailsForm;
