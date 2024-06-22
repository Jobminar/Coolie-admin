import React, { useState, useEffect } from "react";
import "./ProviderForm.css";
import {
  generateOtp,
  sendOtpEmail,
  sendFormDataToApis,
  validateForm,
} from "../../../utils/api";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import VerificationTable from "./VerificationTable";
import { fetchProviderDetails } from "./api/provider-form-api";

const ProviderForm = ({ providers }) => {
  const [activeTab, setActiveTab] = useState("verified");
  const [underVerificationProviders, setUnderVerificationProviders] = useState(
    [],
  );

  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState([]);

  useEffect(() => {
    setFilteredProviders(providers);
    if (activeTab === "underVerification") {
      fetchProviderDetails().then((data) => {
        setUnderVerificationProviders(data);
      });
    }
  }, [providers, activeTab]);
  useEffect(() => {
    fetchProviderDetails()
      .then((data) => {
        setUnderVerificationProviders(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
  }, []);
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
  };

  // Function to handle edit mode for a provider

  // Placeholder function for handling provider deletion
  const handleVerify = (provider) => {
    // Assuming an API endpoint to verify the provider
    fetch(`api/verify-provider/${provider._id}`, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Provider verified:", data);
        // Optionally refresh the list or update the status in the state
      })
      .catch((error) => console.error("Error verifying provider:", error));
  };

  const handleReject = (provider) => {
    fetch(`api/reject-provider/${provider._id}`, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Provider rejected:", data);
        // Optionally refresh the list or update the status in the state
      })
      .catch((error) => console.error("Error rejecting provider:", error));
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
          placeholder="Search by Name"
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

        {activeTab === "underVerification" && (
          <VerificationTable
            isLoading={isLoading}
            providers={underVerificationProviders}
            onVerify={handleVerify}
            onReject={handleReject}
          />
        )}
      </div>
    </div>
  );
};

export default ProviderForm;
