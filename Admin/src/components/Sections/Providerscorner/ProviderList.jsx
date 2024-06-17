import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const ProviderList = ({ providers, handleEdit, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="uniqueProvidersTableContainer">
      <div className="uniqueSearchBar">
        <FaSearch className="uniqueSearchIcon" />
        <input
          type="text"
          placeholder="Search by provider name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="uniqueTableWrapper">
        <table className="uniqueProvidersTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Provider Name</th>
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
            {filteredProviders.map((provider) => (
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
                    className={`uniqueStatusToggle ${
                      provider.status === "active" ? "active" : "inactive"
                    }`}
                  ></div>
                </td>
                <td className="uniqueActions">
                  <FaEdit
                    className="uniqueActionIcon uniqueEdit"
                    onClick={() => handleEdit(provider)}
                  />
                  <FaTrash
                    className="uniqueActionIcon uniqueDelete"
                    onClick={() => handleDelete(provider.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderList;
