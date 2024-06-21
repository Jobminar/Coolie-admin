import React, { useState, useEffect } from "react";
import "./ProviderForm.css";
import {
  generateOtp,
  sendOtpEmail,
  sendFormDataToApis,
  validateForm,
} from "../../../utils/api";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const ProviderForm = ({ providers }) => {
  const [activeTab, setActiveTab] = useState("verified");
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
  const [aadharOtp, setAadharOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState([]);

  useEffect(() => {
    setFilteredProviders(providers);
  }, [providers]);

  // Function to handle search by provider name
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = providers.filter((provider) =>
      provider.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredProviders(filtered);
  };

  // Function to handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setEditMode(false); // Exit edit mode when switching tabs
    resetForm();
  };

  // Function to reset the form data and errors
  const resetForm = () => {
    setFormData({
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
    setErrors({});
    setSubmissionError("");
  };

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle file selection for documents
  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files[0] });
  };

  // Function to generate OTP and send email
  const handleGenerateOtp = (otpSetter, recipient) => {
    const otp = generateOtp();
    otpSetter(otp);
    sendOtpEmail(otp, recipient);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError("");
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const responses = await sendFormDataToApis(formData);
        console.log("Form submitted successfully:", responses);
        resetForm();
        setEditMode(false);
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmissionError(
          "There was an error submitting the form. Please try again.",
        );
      }
    }
  };

  // Function to handle edit mode for a provider
  const handleEdit = (provider) => {
    setFormData({
      name: provider.name,
      mobile: provider.contact.phone,
      email: provider.contact.email,
      dob: "",
      aadhar: "",
      pan: "",
      address: provider.location.address,
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
    setEditMode(true);
    setActiveTab("verified"); // Assuming switching to verified tab when editing
  };

  // Placeholder function for handling provider deletion
  const handleDelete = (providerId) => {
    console.log("Provider deleted:", providerId);
  };

  return (
    <div className="provider-form-unique">
      <div className="provider-form-header">
        <h2>Provider Managing Form</h2>
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
      <div className="searchBar-unique">
        <FaSearch className="searchIcon-unique" />
        <input
          type="text"
          placeholder="Search by provider name"
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
      <div className="provider-form-content">
        {activeTab === "verified" && !editMode && (
          <div className="providers-table-container-unique">
            <table className="providers-table-unique">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Provider name</th>
                  <th>Email Address</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Join date</th>
                  <th>Package</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th className="actions-unique">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map((provider) => (
                  <tr key={provider.id}>
                    <td>{provider.id}</td>
                    <td>{provider.name}</td>
                    <td>{provider.contact.email}</td>
                    <td>{provider.contact.phone}</td>
                    <td>{provider.location.address}</td>
                    <td>{provider.membership.joinDate}</td>
                    <td>{provider.membership.package.type}</td>
                    <td>
                      {provider.workDetails
                        .map((detail) => detail.category)
                        .join(", ")}
                    </td>
                    <td>
                      <div
                        className={`status-indicator-unique ${
                          provider.status === "active" ? "online" : "offline"
                        }`}
                      ></div>
                    </td>
                    <td className="actions-unique">
                      <FaEdit
                        className="actionIcon-unique edit"
                        onClick={() => handleEdit(provider)}
                      />
                      <FaTrash
                        className="actionIcon-unique delete"
                        onClick={() => handleDelete(provider.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "verified" && editMode && (
          <form onSubmit={handleSubmit}>
            {/* Form inputs for editing */}
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
            <div>
              <button
                type="button"
                className="generate-otp-button"
                onClick={() => handleGenerateOtp(setMobileOtp, formData.email)}
              >
                Generate Mobile OTP
              </button>
              <label>OTP:</label>
              <input type="text" value={mobileOtp} placeholder="OTP" readOnly />
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
              <button
                type="button"
                className="generate-otp-button"
                onClick={() => handleGenerateOtp(setAadharOtp, formData.email)}
              >
                Generate Aadhar OTP
              </button>
              <label>OTP:</label>
              <input type="text" value={aadharOtp} placeholder="OTP" readOnly />
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
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
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
              <label>Pincode:</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
              />
            </div>
            <div>
              <label>Locations:</label>
              <input
                type="text"
                name="locations"
                value={formData.locations}
                onChange={handleInputChange}
                placeholder="Locations"
              />
            </div>
            <div>
              <label>Account Name:</label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleInputChange}
                placeholder="Account Name"
              />
            </div>
            <div>
              <label>Account Number:</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                placeholder="Account Number"
              />
            </div>
            <div>
              <label>Bank Name:</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                placeholder="Bank Name"
              />
            </div>
            <div>
              <label>IFSC:</label>
              <input
                type="text"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleInputChange}
                placeholder="IFSC"
              />
            </div>
            <div>
              <label>Branch:</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                placeholder="Branch"
              />
            </div>
            <div>
              <label>Branch Address:</label>
              <input
                type="text"
                name="branchAddress"
                value={formData.branchAddress}
                onChange={handleInputChange}
                placeholder="Branch Address"
              />
            </div>
            <div>
              <label>Documents:</label>
              <input type="file" name="documents" onChange={handleFileChange} />
            </div>
            {submissionError && <p className="error">{submissionError}</p>}
            <div className="form-actions">
              <button type="submit" className="submit-button">
                Submit
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {activeTab === "underVerification" && (
          <p className="under-verification-message">
            Under verification providers list will be displayed here.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProviderForm;
