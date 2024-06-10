import React, { useState } from "react";
import "./ProviderForm.css";
import emailjs from "emailjs-com";

const ProviderForm = () => {
  const [activeTab, setActiveTab] = useState("verified");
  const [mobileOtp, setMobileOtp] = useState("");
  const [aadharOtp, setAadharOtp] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtpEmail = (otp, recipient) => {
    const templateParams = {
      otp: otp,
      recipient: recipient,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "YOUR_USER_ID",
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        },
      );
  };

  const handleGenerateOtp = (otpSetter, recipient) => {
    const otp = generateOtp();
    otpSetter(otp);
    sendOtpEmail(otp, recipient);
  };

  return (
    <div className="provider-form-unique">
      <div className="provider-form-header">
        <h2>Provider Registration Form</h2>
        <div className="provider-tabs-unique">
          <button
            className={`provider-tab-unique ${
              activeTab === "verified" ? "active" : ""
            }`}
            onClick={() => handleTabClick("verified")}
          >
            Verified Providers
          </button>
          <button
            className={`provider-tab-unique ${
              activeTab === "underVerification" ? "active" : ""
            }`}
            onClick={() => handleTabClick("underVerification")}
          >
            Providers Under Verification
          </button>
        </div>
      </div>
      <div className="provider-form-content">
        {activeTab === "verified" && (
          <form>
            <div>
              <label>Enter your name:</label>
              <input type="text" placeholder="Name and Surname" />
            </div>
            <div>
              <label>Mobile No.:</label>
              <input type="text" placeholder="Mobile No." />
            </div>
            <div>
              <button
                type="button"
                className="generate-otp-button"
                onClick={() =>
                  handleGenerateOtp(setMobileOtp, "recipient@example.com")
                }
              >
                Generate OTP
              </button>
              <label>OTP:</label>
              <input type="text" value={mobileOtp} placeholder="OTP" readOnly />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" placeholder="Email" />
            </div>
            <div>
              <label>DOB:</label>
              <input type="date" />
            </div>
            <div>
              <label>Aadhar Number:</label>
              <input type="text" placeholder="Aadhar Number" />
            </div>
            <div>
              <button
                type="button"
                className="generate-otp-button"
                onClick={() =>
                  handleGenerateOtp(setAadharOtp, "recipient@example.com")
                }
              >
                Generate OTP
              </button>
              <label>OTP:</label>
              <input type="text" value={aadharOtp} placeholder="OTP" readOnly />
            </div>
            <div>
              <label>PAN:</label>
              <input type="text" placeholder="PAN" />
            </div>
            <div>
              <label>Postal Address:</label>
              <input type="text" placeholder="Postal Address" />
            </div>
            <div>
              <label>Experience:</label>
              <input type="text" placeholder="Experience" />
            </div>
            <div>
              <label>Address with Pincode:</label>
              <input type="text" placeholder="Address with Pincode" />
            </div>
            <div>
              <label>Serving Locations:</label>
              <input type="text" placeholder="Serving Locations" />
            </div>
            <div>
              <h3>Banking Details</h3>
              <label>Account Name:</label>
              <input type="text" placeholder="Account Name" />
              <label>Account Number:</label>
              <input type="text" placeholder="Account Number" />
              <label>Bank Name:</label>
              <input type="text" placeholder="Bank Name" />
              <label>IFSC:</label>
              <input type="text" placeholder="IFSC" />
              <label>Branch:</label>
              <input type="text" placeholder="Branch" />
              <label>Branch Address:</label>
              <input type="text" placeholder="Branch Address" />
              <label>Document(s):</label>
              <input type="text" placeholder="Document(s)" />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
        {activeTab === "underVerification" && (
          <div className="under-verification-unique">
            <p>Providers Under Verification content goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderForm;
