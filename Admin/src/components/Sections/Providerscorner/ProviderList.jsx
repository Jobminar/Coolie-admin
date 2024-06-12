import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProviderList = ({ providers, handleEdit, handleDelete }) => {
  return (
    <div className="providersTableContainer">
      <table className="providersTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Provider Name</th>
            <th>Email Address</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Join Date</th>
            <th>Loyalty Points</th>
            <th>Package</th>
            <th>Status</th>
            <th>Actions</th>
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
              <td>{provider.loyaltyPoints}</td>
              <td>{provider.package}</td>
              <td>
                <div
                  className={`statusToggle ${
                    provider.status === "active" ? "active" : "inactive"
                  }`}
                ></div>
              </td>
              <td>
                <button
                  className="actionButton edit"
                  onClick={() => handleEdit(provider)}
                >
                  <FaEdit />
                </button>
                <button
                  className="actionButton delete"
                  onClick={() => handleDelete(provider.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderList;
