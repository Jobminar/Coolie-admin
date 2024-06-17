import React, { useState } from "react";
import "./ProviderForm.css";
import {
  generateOtp,
  sendOtpEmail,
  sendFormDataToApis,
  validateForm,
} from "../../../utils/api";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const ProviderForm = () => {
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = providers.filter((provider) =>
      provider.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredProviders(filtered);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files[0] });
  };

  const handleGenerateOtp = (otpSetter, recipient) => {
    const otp = generateOtp();
    otpSetter(otp);
    sendOtpEmail(otp, recipient);
  };

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
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmissionError(
          "There was an error submitting the form. Please try again.",
        );
      }
    }
  };

  const handleEdit = (provider) => {
    setFormData(provider);
    setEditMode(true);
    setActiveTab("verified");
  };

  const handleDelete = (providerId) => {
    // Logic to handle provider deletion
    console.log("Provider deleted:", providerId);
  };

  const providers = [
    {
      id: 1,
      name: "Provider 1",
      email: "provider1@example.com",
      phone: "1234567890",
      location: "Location 1",
      joinDate: "2021-01-01",
      package: "Basic",
      category: "Category 1",
      status: "active",
    },
    // Add more sample providers as needed
  ];

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
          placeholder="Search..."
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
                {providers.map((provider) => (
                  <tr key={provider.id}>
                    <td>{provider.id}</td>
                    <td>{provider.name}</td>
                    <td>{provider.email}</td>
                    <td>{provider.phone}</td>
                    <td>{provider.location}</td>
                    <td>{provider.joinDate}</td>
                    <td>{provider.package}</td>
                    <td>{provider.category}</td>
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
                Generate OTP
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
                Generate OTP
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
