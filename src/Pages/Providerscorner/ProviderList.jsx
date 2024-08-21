import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import "./styles/ProviderList.css"; // Assuming you have a CSS file for styling

const ProviderList = ({ providers, handleEdit, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProviders = providers.filter((provider) =>
    provider.phone.includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="birdviewProvidersTableContainer">
      <div className="birdviewSearchBar">
        <FaSearch className="birdviewSearchIcon" />
        <input
          type="text"
          placeholder="Search by provider phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="birdviewTableWrapper">
        <table className="birdviewProvidersTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Provider Name</th>
              <th>Profile Image</th>
              <th>Email Address</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Join Date</th>
              <th>Package</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <tr key={provider.id}>
                  <td>{provider.id || "N/A"}</td>
                  <td>{provider.name || "N/A"}</td>
                  <td>
                    {provider.image ? (
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="provider-profile-image"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{provider.email || "N/A"}</td>
                  <td>{provider.phone || "N/A"}</td>
                  <td>{provider.address || "N/A"}</td>
                  <td>{provider.joinDate || "N/A"}</td>
                  <td>{provider.package?.type || "N/A"}</td>
                  <td>
                    {provider.workDetails?.map((workDetail, index) => (
                      <div key={index}>{workDetail.category}</div>
                    )) || "N/A"}
                  </td>
                  <td>
                    <div
                      className={`birdviewStatusToggle ${
                        provider.status === "active" ? "active" : "inactive"
                      }`}
                    ></div>
                  </td>
                  <td className="birdviewActions">
                    <FaEdit
                      className="birdviewActionIcon birdviewEdit"
                      onClick={() => handleEdit(provider)}
                    />
                    <FaTrash
                      className="birdviewActionIcon birdviewDelete"
                      onClick={() => handleDelete(provider.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="no-data">
                  No providers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ProviderList.propTypes = {
  providers: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ProviderList;
