import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles/AuthenticateProvider.css";
import { FaFileAlt, FaTrash, FaArrowLeft, FaSearch } from "react-icons/fa";
import ProviderProfile from "./ProviderProfile";
import { FilterBarContext } from "../../FilterBarContext";
import { toast, Toaster } from "react-hot-toast"; // Import react-hot-toast
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import confirm alert CSS

import {
  fetchProviders,
  fetchProviderCertificates,
  updateProviderCertificate,
  updateProviderDetails, // Import the new API call for updating provider details
} from "./api/authenticate-provider.js"; // Import API calls

const AuthenticateProvider = ({ providerId }) => {
  const [activeComponent, setActiveComponent] = useState("ProviderList");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [documentStatuses, setDocumentStatuses] = useState({});
  const [comments, setComments] = useState({});
  const [overallStatus, setOverallStatus] = useState("Pending");
  const { setFilterBarProps } = useContext(FilterBarContext);
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [documents, setDocuments] = useState([]); // Store documents here
  const [error, setError] = useState(null);
  const [isRowClicked, setIsRowClicked] = useState(false); // Track row click

  // Log providerId whenever it changes
  useEffect(() => {
    console.log("Received providerId:", providerId);
  }, [providerId]);

  // Fetch providers when the component mounts
  useEffect(() => {
    const loadProviders = async () => {
      setLoading(true);
      try {
        const data = await fetchProviders();
        console.log("Fetched providers successfully:", data);
        setProviders(data);
      } catch (error) {
        console.error("Error fetching providers:", error.message);
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadProviders();
  }, []);

  // Fetch provider certificates when providerId changes
  useEffect(() => {
    if (providerId) {
      const loadDocuments = async () => {
        try {
          const data = await fetchProviderCertificates(providerId);
          console.log("Fetched provider certificates successfully:", data);
          setDocuments(data);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.error("No certificates found for this provider.");
            setDocuments([]); // Clear documents state if 404 error occurs
          } else {
            console.error(
              "Error fetching provider certificates:",
              error.message,
            );
            toast.error("Failed to load provider documents");
          }
        }
      };
      loadDocuments();
    }
  }, [providerId]);

  // Handle table row click to remove fade effect
  const handleTableClick = () => {
    console.log("Table row clicked");
    setIsRowClicked(true);
  };

  // Handle verification of a provider
  const handleVerify = (provider) => {
    confirmAlert({
      title: "Confirm to verify",
      message: "Are you sure you want to verify this provider?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log("Provider selected for verification:", provider);
            setSelectedProvider(provider); // Set the entire provider object including providerId
            setActiveComponent("ProviderProfile");
            setFilterBarProps((prev) => ({
              ...prev,
              showProviderButtons: false,
            }));
            toast.success("Please verify provider docs");
          },
        },
        {
          label: "No",
          onClick: () => console.log("Verification canceled"),
        },
      ],
    });
  };

  // Handle back button click
  const handleBackClick = () => {
    console.log("Navigating back to ProviderList");
    setActiveComponent("ProviderList");
    setFilterBarProps((prev) => ({
      ...prev,
      showProviderButtons: true,
    }));
    toast("Returning to provider list", { icon: "🔙" });
  };

  // Handle document section navigation
  const handleDocumentsClick = (providerId) => {
    console.log(
      "Navigating to DocumentVerification for providerId:",
      providerId,
    );
    setActiveComponent("DocumentVerification");
    toast("Viewing document verification", { icon: "📄" });

    // Fetch documents based on the providerId
    const loadDocuments = async () => {
      try {
        const data = await fetchProviderCertificates(providerId);
        console.log("Fetched provider certificates successfully:", data);
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching provider certificates:", error.message);
        toast.error(error.message);
      }
    };
    loadDocuments();
  };

  // Handle comment change
  const handleCommentChange = (documentId, value) => {
    console.log(`Updating comment for documentId ${documentId}:`, value);
    setComments((prevComments) => ({
      ...prevComments,
      [documentId]: value,
    }));
  };

  // Handle document update based on action type
  const handleDocumentUpdate = async (documentId, actionType) => {
    const customMessage = comments[documentId]?.trim();
    if (!customMessage && actionType !== "approve") {
      toast.error("Please enter a custom message before submitting.");
      return null; // Return null if no custom message is provided
    }

    let updateData = {
      isVerified: false,
      message: "",
    };

    if (actionType === "approve") {
      updateData.isVerified = true;
      updateData.message = `Document verified: ${customMessage || ""}`;
    } else if (actionType === "reupload" || actionType === "pending") {
      updateData.message = `Please reupload document: ${customMessage}`;
    } else if (actionType === "decline") {
      updateData.message = `Your document was declined: ${customMessage}`;
    }

    const toastId = toast.loading("Updating document status...");
    try {
      const updatedDocument = await updateProviderCertificate(
        documentId,
        updateData,
      );
      console.log(
        `Document ${documentId} updated successfully:`,
        updatedDocument,
      );
      toast.success("Document status updated successfully.", {
        id: toastId,
      });

      // Update local state to reflect the changes
      setDocumentStatuses((prevStatuses) => ({
        ...prevStatuses,
        [documentId]: actionType === "approve" ? "Approved" : "Pending",
      }));
      setComments((prevComments) => ({
        ...prevComments,
        [documentId]: "",
      }));

      // Re-fetch provider certificates after update
      await fetchProviderCertificates(providerId);

      // If the action was approve, also update the provider's isVerified status
      if (actionType === "approve") {
        const providerId = updatedDocument.providerId;
        await updateProviderDetails(providerId, { isVerified: true });
        console.log(`Provider ${providerId} updated to isVerified: true`);
        toast.success(`Provider ${providerId} has been verified.`);
      }

      return updatedDocument; // Return the updated document to get the providerId and associated providerDetails _id
    } catch (error) {
      toast.error("Failed to update document status.", { id: toastId });
      console.error("Error updating document:", error.message);
      return null; // Return null in case of error
    }
  };

  // Handle approving all documents
  const handleApproveAll = () => {
    confirmAlert({
      title: "Confirm to approve all",
      message: "Are you sure you want to approve all documents?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const providerDetailsMap = new Map(); // Map to store providerId and providerDetails _id
            for (const doc of documents) {
              const updatedDocument = await handleDocumentUpdate(
                doc._id,
                "approve",
              );
              if (updatedDocument) {
                const providerId = updatedDocument.providerId;
                providerDetailsMap.set(providerId, updatedDocument._id);
              }
            }
            setOverallStatus("Approved");

            // Update provider details for all associated providers
            for (const [providerId] of providerDetailsMap) {
              try {
                await updateProviderDetails(providerId, {
                  isVerified: true,
                });
                console.log(
                  `Provider ${providerId} updated to isVerified: true`,
                );
                toast.success(`Provider ${providerId} has been verified.`);
              } catch (error) {
                console.error(
                  `Failed to update provider ${providerId}:`,
                  error.message,
                );
                toast.error(`Failed to update provider ${providerId}.`);
              }
            }
          },
        },
        {
          label: "No",
          onClick: () => console.log("Approval canceled"),
        },
      ],
    });
  };

  // Handle marking all documents as pending
  const handlePendingAll = () => {
    confirmAlert({
      title: "Confirm to mark all as pending",
      message: "Are you sure you want to mark all documents as pending?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            for (const doc of documents) {
              await handleDocumentUpdate(doc._id, "reupload");
            }
            setOverallStatus("Pending");

            // Refetch provider certificates after marking all as pending
            await fetchProviderCertificates(providerId);
            toast.success(
              "All documents have been marked as pending. Please request reupload.",
            );
          },
        },
        {
          label: "No",
          onClick: () => console.log("Mark as pending canceled"),
        },
      ],
    });
  };

  const filteredProviders = providers.filter(
    (provider) =>
      provider.phone.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !provider.isVerified, // Only show providers where isVerified is false
  );

  return (
    <div className="authenticate-provider">
      <Toaster position="top-right" reverseOrder={false} />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          {activeComponent === "ProviderList" && (
            <>
              <div
                className="providers-table-container"
                onClick={handleTableClick}
              >
                <div className="authSearchBar">
                  <FaSearch className="authSearchIcon" />
                  <input
                    type="text"
                    placeholder="Search by provider phone number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <table className="providers-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Provider Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Pincode</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Radius</th>
                      <th>Status</th>
                      <th className="actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProviders.length > 0 ? (
                      filteredProviders.map((provider) => (
                        <tr
                          key={provider._id}
                          className={`${
                            provider._id === providerId ? "highlight-row" : ""
                          } ${
                            !isRowClicked && provider._id !== providerId
                              ? "fade-row"
                              : ""
                          }`}
                        >
                          <td>{provider.providerId}</td>
                          <td>
                            <img
                              src={provider.image}
                              alt={provider.providerName}
                              className="provider-image"
                            />
                          </td>
                          <td>{provider.providerName}</td>
                          <td>{provider.phone}</td>
                          <td>{provider.address}</td>
                          <td>{provider.pincode}</td>
                          <td>{provider.age}</td>
                          <td>{provider.gender}</td>
                          <td>{provider.radius}</td>
                          <td>
                            <div
                              className={`status-indicator ${
                                provider.isVerified ? "online" : "offline"
                              }`}
                            ></div>
                          </td>
                          <td className="actions">
                            <FaFileAlt
                              className="actionIcon doc"
                              onClick={() => handleVerify(provider)}
                            />
                            <FaTrash
                              className="actionIcon delete"
                              onClick={() =>
                                console.log("Provider deleted:", provider._id)
                              }
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="no-data">
                          No providers available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeComponent === "ProviderProfile" && selectedProvider && (
            <ProviderProfile
              providerId={selectedProvider.providerId} // This is the correct field
              onDocumentsClick={handleDocumentsClick}
              onBackClick={handleBackClick}
            />
          )}

          {activeComponent === "DocumentVerification" && (
            <div className="document-verification">
              <div className="sticky-header">
                <button className="Back-Button" onClick={handleBackClick}>
                  <FaArrowLeft /> Back
                </button>
                <span>Provider Name: {selectedProvider?.providerName}</span>
                <span className="status-Bar">Status: {overallStatus}</span>
                <span className="document-heading">Documents</span>
              </div>

              {documents.length > 0 ? (
                <div className="document-section">
                  {documents.map((document) => (
                    <div key={document._id} className="document-item">
                      <embed
                        src={document.image}
                        type="application/pdf"
                        className="document-display"
                      />
                      <label>
                        Status: {document.isVerified ? "Approved" : "Pending"}
                      </label>
                      <div className="button-group">
                        {document.isVerified ? (
                          <p>Document approved</p>
                        ) : (
                          <>
                            <button
                              className="action-button-unique approve"
                              onClick={() =>
                                handleDocumentUpdate(document._id, "approve")
                              }
                            >
                              Approve Doc
                            </button>
                            <button
                              className="action-button-unique reupload"
                              onClick={() =>
                                handleDocumentUpdate(document._id, "reupload")
                              }
                            >
                              Reupload Doc
                            </button>
                            <button
                              className="action-button-unique decline"
                              onClick={() =>
                                handleDocumentUpdate(document._id, "decline")
                              }
                            >
                              Decline Doc
                            </button>
                          </>
                        )}
                      </div>
                      <div className="comment-section">
                        <textarea
                          placeholder="Convey the reason or message"
                          value={comments[document._id] || ""}
                          onChange={(e) =>
                            handleCommentChange(document._id, e.target.value)
                          }
                          disabled={document.isVerified} // Disable if document is already verified
                        ></textarea>
                        <div className="comment-footer">
                          <button
                            className="submit-button-unique"
                            onClick={() =>
                              handleDocumentUpdate(document._id, "message")
                            }
                            disabled={document.isVerified} // Disable if document is already verified
                          >
                            Add Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-certificates">
                  No certificates available for this provider.
                </div>
              )}

              {documents.length > 0 && (
                <div className="global-status-buttons">
                  <button
                    className="status-button pending"
                    onClick={handlePendingAll}
                  >
                    Mark all as Pending
                  </button>
                  <button
                    className="status-button approve"
                    onClick={handleApproveAll}
                  >
                    Approve All
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

AuthenticateProvider.propTypes = {
  providerId: PropTypes.string,
};

export default AuthenticateProvider;
