import React, { useState, useEffect } from "react";
import "./styles/ProviderForm.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import VerificationTable from "./VerificationTable";
import { fetchProviderDetails } from "./api/provider-form-api";

const ProviderForm = ({ onVerifyProvider }) => {
  const [activeTab, setActiveTab] = useState("underVerification");
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchProviderDetails()
      .then((data) => {
        setProviders(data);
        setFilteredProviders(data.filter((provider) => !provider.isVerified));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = providers.filter((provider) => {
      return activeTab === "underVerification"
        ? !provider.isVerified
        : provider.isVerified;
    });
    setFilteredProviders(filtered);
  }, [providers, activeTab]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = providers.filter((provider) =>
      provider.providerName
        .toLowerCase()
        .includes(e.target.value.toLowerCase()),
    );
    setFilteredProviders(filtered);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setEditMode(false); // Exit edit mode when switching tabs
  };

  const handleVerify = (providerId) => {
    onVerifyProvider(providerId); // Call the verification handler
  };

  return (
    <div className="provider-form-unique">
      {isLoading && <div className="loading">Loading...</div>}
      <div className="provider-form-header">
        <h2>All Providers</h2>
        <div className="provider-tabs-unique">
          <button
            className={`provider-tab-unique ${
              activeTab === "underVerification" ? "active" : ""
            }`}
            onClick={() => handleTabClick("underVerification")}
          >
            Providers Under Verification
          </button>
          <button
            className={`provider-tab-unique ${
              activeTab === "verified" ? "active" : ""
            }`}
            onClick={() => handleTabClick("verified")}
          >
            Verified Providers
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
        {activeTab === "underVerification" && !editMode && (
          <VerificationTable
            isLoading={isLoading}
            providers={filteredProviders}
            onVerifyClick={handleVerify} // Pass the verification handler to VerificationTable
          />
        )}
        {activeTab === "verified" && (
          <div className="providers-table-container-unique">
            <table className="providers-table-unique">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Provider Name</th>
                  <th>Profile Image</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Age</th>
                  <th>Radius</th>
                  <th>Status</th>
                  <th className="actions-unique">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map((provider) => (
                  <tr key={provider._id}>
                    <td>{provider.providerId || "N/A"}</td>
                    <td>{provider.providerName || "N/A"}</td>
                    <td>
                      {provider.image ? (
                        <img
                          src={provider.image}
                          alt={provider.providerName}
                          className="provider-image-unique"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{provider.phone || "N/A"}</td>
                    <td>{provider.address || "N/A"}</td>
                    <td>{provider.age || "N/A"}</td>
                    <td>{provider.radius || "N/A"}</td>
                    <td>
                      <div
                        className={`status-indicator-unique ${
                          provider.isVerified ? "online" : "offline"
                        }`}
                      ></div>
                    </td>
                    <td className="actions-unique">
                      <FaEdit
                        className="actionIcon-unique edit"
                        onClick={() =>
                          console.log("Edit provider:", provider._id)
                        }
                      />
                      <FaTrash
                        className="actionIcon-unique delete"
                        onClick={() =>
                          console.log("Delete provider:", provider._id)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderForm;
