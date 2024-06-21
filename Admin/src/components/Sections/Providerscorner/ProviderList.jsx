import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const ProviderList = ({ providers, handleEdit, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProviders = providers.filter((provider) =>
    provider.contact.phone.toLowerCase().includes(searchTerm.toLowerCase()),
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
                <td>{provider.contact.email}</td>
                <td>{provider.contact.phone}</td>
                <td>{provider.location.address}</td>
                <td>{provider.membership.joinDate}</td>
                <td>{provider.membership.package.type}</td>
                <td>
                  {provider.workDetails.map((workDetail, index) => (
                    <div key={index}>{workDetail.category}</div>
                  ))}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderList;
