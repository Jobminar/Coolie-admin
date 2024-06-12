import React, { useState } from "react";
import "./AddProvider.css";
import axios from "axios";

const AddProvider = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    aadhar: "",
    pan: "",
    address: "",
    experience: "",
    pincode: "",
    locations: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    ifsc: "",
    branch: "",
    branchAddress: "",
    documents: null,
  });
  const [mobileOtp, setMobileOtp] = useState("");
  const [otpEntered, setOtpEntered] = useState("");
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [providerId, setProviderId] = useState(null);
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files[0] });
  };

  const handleGenerateOtp = async () => {
    try {
      const response = await axios.post(
        "http://13.126.118.3:3000/v1.0/providers/provider-auth/signUp",
        { phone: Number(formData.mobile) },
      );
      console.log("OTP sent:", response.data.otp);
      setMobileOtp(response.data.otp);
    } catch (error) {
      console.error("Error generating OTP:", error);
      setErrors({
        ...errors,
        mobile: "Error generating OTP. Please try again.",
      });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://13.126.118.3:3000/v1.0/providers/provider-auth/verify-otp",
        { otp: Number(otpEntered) },
      );
      if (response.data.providerId) {
        console.log("Provider ID:", response.data.providerId);
        setProviderId(response.data.providerId);
        setIsMobileVerified(true);
        setErrors({ ...errors, otp: "" });
      } else {
        setErrors({ ...errors, otp: "Invalid OTP" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrors({ ...errors, otp: "Error verifying OTP. Please try again." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError("");
    const validationErrors = validateForm(formData); // Assume this is defined elsewhere
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const responses = await sendFormDataToApis(formData); // Assume this is defined elsewhere
        console.log("Form submitted successfully:", responses);
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmissionError(
          "There was an error submitting the form. Please try again.",
        );
      }
    }
  };

  return (
    <div className="add-provider-form">
      <div className="provider-form-header">
        <h2>Provider Registration Form</h2>
      </div>
      <div className="provider-form-content">
        {!isMobileVerified ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Mobile No.:</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile No."
              />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
            <button
              type="button"
              className="generate-otp-button"
              onClick={handleGenerateOtp}
            >
              Generate OTP
            </button>
            <div>
              <label>Enter OTP:</label>
              <input
                type="text"
                value={otpEntered}
                onChange={(e) => setOtpEntered(e.target.value)}
                placeholder="OTP"
              />
              {errors.otp && <p className="error">{errors.otp}</p>}
            </div>
            <button
              type="button"
              className="submit-button"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Enter your name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name and Surname"
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <label>DOB:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Aadhar Number:</label>
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleInputChange}
                placeholder="Aadhar Number"
              />
              {errors.aadhar && <p className="error">{errors.aadhar}</p>}
            </div>
            <div>
              <label>PAN:</label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleInputChange}
                placeholder="PAN"
              />
              {errors.pan && <p className="error">{errors.pan}</p>}
            </div>
            <div>
              <label>Postal Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Postal Address"
              />
            </div>
            <div>
              <label>Experience:</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Experience"
              />
            </div>
            <div>
              <label>Address with Pincode:</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Address with Pincode"
              />
            </div>
            <div>
              <label>Serving Locations:</label>
              <input
                type="text"
                name="locations"
                value={formData.locations}
                onChange={handleInputChange}
                placeholder="Serving Locations"
              />
            </div>
            <div>
              <h3>Banking Details</h3>
              <label>Account Name:</label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleInputChange}
                placeholder="Account Name"
              />
              <label>Account Number:</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="Account Number"
              />
              <label>Bank Name:</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                placeholder="Bank Name"
              />
              <label>IFSC:</label>
              <input
                type="text"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleInputChange}
                placeholder="IFSC"
              />
              <label>Branch:</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                placeholder="Branch"
              />
              <label>Branch Address:</label>
              <input
                type="text"
                name="branchAddress"
                value={formData.branchAddress}
                onChange={handleInputChange}
                placeholder="Branch Address"
              />
              <label>Document(s):</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
            {submissionError && <p className="error">{submissionError}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AddProvider;
