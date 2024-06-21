import React, { useState, useContext, useEffect } from "react";
import "./AddProvider.css";
import {
  generateOtp,
  verifyOtp,
  submitProviderDetails,
  submitFinanceDetails,
} from "./api-service-provider";
import ProviderDetailsForm from "./ProviderDetailsForm";
import ProviderFinance from "./ProviderFinance";
import {
  ProviderAuthContext,
  ProviderAuthProvider,
} from "./ProviderAuthContext";

const AddProviderContent = () => {
  const { providerId, setProviderId, phone, setPhone } =
    useContext(ProviderAuthContext);
  const [formData, setFormData] = useState({
    mobile: phone || "",
  });
  const [additionalData, setAdditionalData] = useState({
    providerName: "",
    image: null,
    age: "",
    phone: phone || "",
    pincode: "",
    radius: "",
    work: "",
    userId: providerId || "",
  });
  const [mobileOtp, setMobileOtp] = useState("");
  const [otpEntered, setOtpEntered] = useState("");
  const [isMobileVerified, setIsMobileVerified] = useState(!!providerId);
  const [showProviderDetails, setShowProviderDetails] = useState(!!providerId);
  const [showFinanceDetails, setShowFinanceDetails] = useState(false);
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState("");

  useEffect(() => {
    const storedProviderDetails = sessionStorage.getItem("providerDetails");
    if (storedProviderDetails) {
      setShowProviderDetails(false);
      setShowFinanceDetails(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdditionalInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalData({ ...additionalData, [name]: value });
  };

  const handleImageChange = (e) => {
    setAdditionalData({ ...additionalData, image: e.target.files[0] });
  };

  const handleGenerateOtp = async () => {
    try {
      console.log("Requesting OTP for phone number:", formData.mobile);
      const data = await generateOtp(Number(formData.mobile));
      setMobileOtp(data.otp);
      console.log("OTP received:", data.otp);
    } catch (error) {
      console.error("Error during OTP generation:", error);
      setErrors({
        ...errors,
        mobile: error.message,
      });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      console.log("Verifying OTP:", otpEntered);
      const data = await verifyOtp(Number(otpEntered));
      if (data.providerId) {
        setProviderId(data.providerId);
        setPhone(formData.mobile);
        setIsMobileVerified(true);
        setErrors({ ...errors, otp: "" });
        setShowProviderDetails(true);
        console.log(
          "OTP verification successful, provider ID:",
          data.providerId,
        );
      } else {
        setErrors({ ...errors, otp: "Invalid OTP" });
        console.log("Invalid OTP");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setErrors({ ...errors, otp: error.message });
    }
  };

  const handleAddDetails = async (providerFormData) => {
    try {
      console.log("Submitting provider details:", providerFormData);
      const data = await submitProviderDetails(providerFormData);
      console.log("Provider details submitted successfully:", data);
      setShowProviderDetails(false);
      setShowFinanceDetails(true);
      setSubmissionError("");
    } catch (error) {
      console.error("Error submitting provider details:", error);
      setSubmissionError(error.message);
    }
  };

  const handleAddFinanceDetails = async (financeFormData) => {
    try {
      console.log("Submitting finance details:", financeFormData);
      const data = await submitFinanceDetails(financeFormData);
      console.log("Finance details submitted successfully:", data);
      alert("Finance details submitted successfully!");
      setSubmissionError("");
    } catch (error) {
      console.error("Error submitting finance details:", error);
      setSubmissionError(error.message);
    }
  };

  const handleReset = () => {
    setProviderId("");
    setPhone("");
    setIsMobileVerified(false);
    setShowProviderDetails(false);
    setShowFinanceDetails(false);
    sessionStorage.removeItem("providerId");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("providerDetails");
    sessionStorage.removeItem("financeDetails");
  };

  return (
    <div className="add-provider-form">
      <div className="provider-form-header">
        <h2>Provider Registration Form</h2>
        <button
          className="add-new-button"
          id="add-new-button"
          onClick={handleReset}
        >
          Add New
        </button>
        {showFinanceDetails && (
          <span className="continue-message">
            Continue with Finance Details
          </span>
        )}
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
          <>
            {showProviderDetails && (
              <ProviderDetailsForm
                additionalData={additionalData}
                handleAdditionalInputChange={handleAdditionalInputChange}
                handleImageChange={handleImageChange}
                handleAddDetails={handleAddDetails}
                submissionError={submissionError}
              />
            )}
            {showFinanceDetails && (
              <ProviderFinance
                handleAddFinanceDetails={handleAddFinanceDetails}
                submissionError={submissionError}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const AddProvider = () => {
  return (
    <ProviderAuthProvider>
      <AddProviderContent />
    </ProviderAuthProvider>
  );
};

export default AddProvider;
