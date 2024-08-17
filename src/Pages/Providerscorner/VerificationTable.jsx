import React from "react";
import { FaArrowRight } from "react-icons/fa";

const VerificationTable = ({ providers, onVerifyClick, isLoading }) => {
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
              <th className="actions-unique">Actions</th>
            </tr>
          </thead>
          <tbody className="scrollable-td">
            {providers.map((provider) => (
              <tr key={provider._id}>
                <td>{provider.providerId || "N/A"}</td>
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
                <td>{provider.address || "N/A"}</td>
                <td>{provider.radius || "N/A"}</td>
                <td>
                  {provider.work && Array.isArray(provider.work)
                    ? provider.work.join(", ")
                    : "N/A"}
                </td>
                <td>
                  <div
                    className={`status-indicator-unique ${
                      provider.isVerified ? "online" : "offline"
                    }`}
                  />
                </td>
                <td className="actions-unique">
                  <button
                    className="provider-verify-button"
                    onClick={() => onVerifyClick(provider._id)}
                  >
                    Verify <FaArrowRight />
                  </button>
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
