import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const VerificationTable = ({ providers, onVerify, onReject, isLoading }) => {
  return (
    <div className="providers-table-container-unique">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="providers-table-unique">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Radius</th>
              <th>Categories</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider._id}>
                <td>{provider.userId || "N/A"}</td>
                <td>{provider.providerName || "N/A"}</td>
                <td>
                  {provider.image ? (
                    <img
                      src={provider.image}
                      alt={provider.providerName}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{provider.age || "N/A"}</td>
                <td>{provider.phone || "N/A"}</td>
                <td>{provider.pincode || "N/A"}</td>
                <td>{provider.radius || "N/A"}</td>
                <td>
                  {provider.work && Array.isArray(provider.work)
                    ? provider.work.join(", ")
                    : "N/A"}
                </td>
                <td>
                  <div
                    className={`status-indicator-unique ${
                      provider.status === "active" ? "online" : "offline"
                    }`}
                  />
                </td>
                <td>
                  <FaCheck
                    color="green"
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={() => onVerify(provider)}
                  />
                  <FaTimes
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={() => onReject(provider)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VerificationTable;
