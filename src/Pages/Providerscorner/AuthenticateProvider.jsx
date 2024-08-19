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
  const [documents, setDocuments] = useState([]); // Store documents here
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

  // Fetch provider certificates when providerId changes
  useEffect(() => {
    if (providerId) {
      const fetchDocuments = async () => {
        try {
          const response = await axios.post(
            `https://api.coolieno1.in/v1.0/providers/provider-certificate/get`,
            { providerId }, // Send providerId as part of the request body
          );
          console.log("Fetched provider certificates:", response.data);
          setDocuments(response.data);
        } catch (error) {
          console.error("Error fetching provider certificates:", error);
          toast.error("Failed to load provider documents");
        }
      };
      fetchDocuments();
    }
  }, [providerId]);

  // Handle table row click to remove fade effect
  const handleTableClick = () => {
    setIsRowClicked(true);
  };

  // Handle verification of a provider
  const handleVerify = (provider) => {
    if (window.confirm("Are you sure you want to verify this provider?")) {
      setSelectedProvider(provider); // Set the entire provider object including providerId
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
  const handleDocumentsClick = (providerId) => {
    setActiveComponent("DocumentVerification");
    toast.info("Viewing document verification");
    console.log("Navigated to DocumentVerification", providerId);

    // Fetch documents based on the providerId
    const fetchDocuments = async () => {
      try {
        const response = await axios.post(
          `https://api.coolieno1.in/v1.0/providers/provider-certificate/get`,
          { providerId }, // Send providerId as part of the request body
        );
        console.log("Fetched provider certificates:", response.data);
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching provider certificates:", error);
        toast.error("Failed to load provider documents");
      }
    };
    fetchDocuments();
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
      documents.forEach((doc) => {
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
      documents.forEach((doc) => {
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
              <div className="document-section">
                {documents.length > 0 ? (
                  documents.map((document) => (
                    <div key={document._id} className="document-item">
                      <embed
                        src={`https://api.coolieno1.in/v1.0/${document.image}`}
                        type="application/pdf"
                        className="document-display"
                      />
                      <label>
                        Status: {documentStatuses[document._id] || "Pending"}
                      </label>
                      <div className="button-group">
                        <button
                          className="action-button-unique approve"
                          onClick={() => handleDocumentApprove(document._id)}
                        >
                          Approve Doc
                        </button>
                        <button
                          className="action-button-unique reupload"
                          onClick={() => handleDocumentReupload(document._id)}
                        >
                          Reupload Doc
                        </button>
                        <button
                          className="action-button-unique decline"
                          onClick={() => handleDocumentDecline(document._id)}
                        >
                          Decline Doc
                        </button>
                      </div>
                      <div className="comment-section">
                        <textarea
                          placeholder="Comment"
                          value={comments[document._id] || ""}
                          onChange={(e) =>
                            handleCommentChange(document._id, e.target.value)
                          }
                        ></textarea>
                        <div className="comment-footer">
                          <button
                            className="submit-button-unique"
                            onClick={() => handleCommentSubmit(document._id)}
                          >
                            Send Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-certificates">
                    No certificates available
                  </div>
                )}
              </div>
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
