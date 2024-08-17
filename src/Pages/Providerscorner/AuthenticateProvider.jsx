import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles/AuthenticateProvider.css";
import { FaFileAlt, FaTrash, FaArrowLeft, FaSearch } from "react-icons/fa";
import ProviderProfile from "./ProviderProfile";
import axios from "axios";
import { FilterBarContext } from "../../FilterBarContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

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
  const [error, setError] = useState(null);
  const [isRowClicked, setIsRowClicked] = useState(false); // Track row click

  // Log providerId whenever it changes
  useEffect(() => {
    console.log("Received providerId:", providerId);
  }, [providerId]);

  // Fetch providers when the component mounts
  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.coolieno1.in/v1.0/providers/provider-details",
        );
        setProviders(response.data);
        console.log("Fetched providers:", response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching providers:", error.message);
        toast.error("Failed to load providers");
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  // Set the selected provider when the providerId prop changes
  useEffect(() => {
    if (providerId) {
      console.log("Processing providerId:", providerId);
      const filtered = providers.find(
        (provider) => provider._id === providerId,
      );
      setSelectedProvider(filtered);
      if (filtered) {
        // Move the selected provider to the top of the list
        setProviders((prevProviders) => [
          filtered,
          ...prevProviders.filter((provider) => provider._id !== providerId),
        ]);
      }
      console.log("Selected provider:", filtered);
    }
  }, [providerId, providers]);

  // Handle table row click to remove fade effect
  const handleTableClick = () => {
    setIsRowClicked(true);
  };

  // Handle verification of a provider
  const handleVerify = (provider) => {
    if (window.confirm("Are you sure you want to verify this provider?")) {
      setSelectedProvider(provider);
      setActiveComponent("ProviderProfile");
      setFilterBarProps((prev) => ({
        ...prev,
        showProviderButtons: false,
      }));
      toast.success("Please verify provider docs");
      console.log("Provider verified:", provider);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    setActiveComponent("ProviderList");
    setFilterBarProps((prev) => ({
      ...prev,
      showProviderButtons: true,
    }));
    toast.info("Returning to provider list");
    console.log("Navigated back to ProviderList");
  };

  // Handle document section navigation
  const handleDocumentsClick = () => {
    setActiveComponent("DocumentVerification");
    toast.info("Viewing document verification");
    console.log("Navigated to DocumentVerification");
  };

  const handleDocumentApprove = (documentId) => {
    if (window.confirm("Are you sure you want to approve this document?")) {
      setDocumentStatuses((prevStatuses) => ({
        ...prevStatuses,
        [documentId]: "Approved",
      }));
      toast.success("Please verify provider docs");
      console.log("Document approved:", documentId);
    }
  };

  const handleDocumentReupload = (documentId) => {
    if (
      window.confirm(
        "Are you sure you want to request a reupload for this document?",
      )
    ) {
      setDocumentStatuses((prevStatuses) => ({
        ...prevStatuses,
        [documentId]: "Reupload",
      }));
      toast.warning("Please verify provider docs");
      console.log("Reupload requested for document:", documentId);
    }
  };

  const handleDocumentDecline = (documentId) => {
    if (window.confirm("Are you sure you want to decline this document?")) {
      setDocumentStatuses((prevStatuses) => ({
        ...prevStatuses,
        [documentId]: "Declined",
      }));
      toast.error("Please verify provider docs");
      console.log("Document declined:", documentId);
    }
  };

  const handleCommentChange = (documentId, value) => {
    setComments((prevComments) => ({
      ...prevComments,
      [documentId]: value,
    }));
    console.log("Comment updated for document:", documentId);
  };

  const handleCommentSubmit = (documentId) => {
    toast.info("Please verify provider docs");
    console.log("Comment sent for document:", documentId, comments[documentId]);
    setComments((prevComments) => ({
      ...prevComments,
      [documentId]: "",
    }));
  };

  const handleApproveAll = () => {
    if (window.confirm("Are you sure you want to approve all documents?")) {
      const newStatuses = {};
      fakeData.documents.forEach((doc) => {
        newStatuses[doc.id] = "Approved";
      });
      setDocumentStatuses(newStatuses);
      setOverallStatus("Approved");
      toast.success("Please verify provider docs");
      console.log("All documents approved");
    }
  };

  const handlePendingAll = () => {
    if (
      window.confirm("Are you sure you want to mark all documents as pending?")
    ) {
      const newStatuses = {};
      fakeData.documents.forEach((doc) => {
        newStatuses[doc.id] = "Pending";
      });
      setDocumentStatuses(newStatuses);
      setOverallStatus("Pending");
      toast.info("Please verify provider docs");
      console.log("All documents marked as pending");
    }
  };

  const filteredProviders = providers.filter((provider) =>
    provider.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="authenticate-provider">
      <ToastContainer />
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
                      <th className="actions">Actions</th>{" "}
                      {/* Add the 'actions' class */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProviders.map((provider) => (
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
                          {" "}
                          {/* Add the 'actions' class */}
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
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeComponent === "ProviderProfile" && (
            <ProviderProfile
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
                <span>Provider Name: {fakeData.providerName}</span>
                <span className="status-Bar">Status: {overallStatus}</span>
                <span className="document-heading">Documents</span>
              </div>
              <div className="document-section">
                {fakeData.documents.map((document) => (
                  <div key={document.id} className="document-item">
                    <embed
                      src={document.file}
                      type="application/pdf"
                      className="document-display"
                    />
                    <label>
                      Status: {documentStatuses[document.id] || "Pending"}
                    </label>
                    <div className="button-group">
                      <button
                        className="action-button-unique approve"
                        onClick={() => handleDocumentApprove(document.id)}
                      >
                        Approve Doc
                      </button>
                      <button
                        className="action-button-unique reupload"
                        onClick={() => handleDocumentReupload(document.id)}
                      >
                        Reupload Doc
                      </button>
                      <button
                        className="action-button-unique decline"
                        onClick={() => handleDocumentDecline(document.id)}
                      >
                        Decline Doc
                      </button>
                    </div>
                    <div className="comment-section">
                      <textarea
                        placeholder="Comment"
                        value={comments[document.id] || ""}
                        onChange={(e) =>
                          handleCommentChange(document.id, e.target.value)
                        }
                      ></textarea>
                      <div className="comment-footer">
                        <button
                          className="submit-button-unique"
                          onClick={() => handleCommentSubmit(document.id)}
                        >
                          Send Comment
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="global-status-buttons">
                <button
                  className="status-button approve-all"
                  onClick={handleApproveAll}
                >
                  Approve All
                </button>
                <button
                  className="status-button pending-all"
                  onClick={handlePendingAll}
                >
                  Mark All Pending
                </button>
              </div>
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
