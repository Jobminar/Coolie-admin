import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./AuthenticateProvider.css";
import { FaEdit, FaTrash, FaArrowLeft, FaSearch } from "react-icons/fa";
import ProviderProfile from "./ProviderProfile";
import Document1 from "../../../assets/Documents/ProviderReport1.pdf";
import Document2 from "../../../assets/Documents/ProviderReport2.pdf";
import { FilterBarContext } from "../../../FilterBarContext";

const AuthenticateProvider = ({ providers }) => {
  const [activeComponent, setActiveComponent] = useState("ProviderList");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [documentStatuses, setDocumentStatuses] = useState({});
  const [comments, setComments] = useState({});
  const [overallStatus, setOverallStatus] = useState("Pending");
  const { setFilterBarProps } = useContext(FilterBarContext);

  useEffect(() => {
    console.log("providers from provider corner", providers);
  }, [providers]);

  const handleVerify = (provider) => {
    setSelectedProvider(provider);
    setActiveComponent("ProviderProfile");
    setFilterBarProps((prev) => ({
      ...prev,
      showProviderButtons: false,
    }));
  };

  const handleBackClick = () => {
    setActiveComponent("ProviderList");
    setFilterBarProps((prev) => ({
      ...prev,
      showProviderButtons: true,
    }));
  };

  const handleDocumentsClick = () => {
    setActiveComponent("DocumentVerification");
  };

  const fakeData = {
    documents: [
      { id: 1, name: "Document 1", file: Document1 },
      { id: 2, name: "Document 2", file: Document2 },
    ],
    providerName: selectedProvider?.name || "Varma",
  };

  const handleDocumentApprove = (documentId) => {
    setDocumentStatuses((prevStatuses) => ({
      ...prevStatuses,
      [documentId]: "Approved",
    }));
    console.log("Document approved:", documentId);
  };

  const handleDocumentReupload = (documentId) => {
    setDocumentStatuses((prevStatuses) => ({
      ...prevStatuses,
      [documentId]: "Reupload",
    }));
    console.log("Reupload requested for document:", documentId);
  };

  const handleDocumentDecline = (documentId) => {
    setDocumentStatuses((prevStatuses) => ({
      ...prevStatuses,
      [documentId]: "Declined",
    }));
    console.log("Document declined:", documentId);
  };

  const handleCommentChange = (documentId, value) => {
    setComments((prevComments) => ({
      ...prevComments,
      [documentId]: value,
    }));
  };

  const handleCommentSubmit = (documentId) => {
    alert("Comment sent successfully");
    console.log(
      "Comment submitted for document",
      documentId,
      ":",
      comments[documentId],
    );
    setComments((prevComments) => ({
      ...prevComments,
      [documentId]: "",
    }));
  };

  const handleApproveAll = () => {
    const newStatuses = {};
    fakeData.documents.forEach((doc) => {
      newStatuses[doc.id] = "Approved";
    });
    setDocumentStatuses(newStatuses);
    setOverallStatus("Approved");
  };

  const handlePendingAll = () => {
    const newStatuses = {};
    fakeData.documents.forEach((doc) => {
      newStatuses[doc.id] = "Pending";
    });
    setDocumentStatuses(newStatuses);
    setOverallStatus("Pending");
  };

  const filteredProviders = providers.filter((provider) =>
    provider.contact.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="authenticate-provider">
      {activeComponent === "ProviderList" && (
        <>
          <div className="providers-table-container">
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
                  <th>Provider name</th>
                  <th>Email Address</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Join date</th>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th className="actions">Actions</th>
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
                      <div
                        className={`status-indicator ${
                          provider.status === "active" ? "online" : "offline"
                        }`}
                      ></div>
                    </td>
                    <td>
                      {provider.workDetails.map((workDetail, index) => (
                        <div key={index}>{workDetail.category}</div>
                      ))}
                    </td>
                    <td className="actions">
                      <FaEdit
                        className="actionIcon edit"
                        onClick={() => handleVerify(provider)}
                      />
                      <FaTrash
                        className="actionIcon delete"
                        onClick={() =>
                          console.log("Provider deleted:", provider.id)
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
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="status-toggle-container">
            <button
              className="status-toggle-button approve-all"
              onClick={handleApproveAll}
            >
              Approve All Docs
            </button>
            <button
              className="status-toggle-button pending-all"
              onClick={handlePendingAll}
            >
              Pending
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

AuthenticateProvider.propTypes = {
  providers: PropTypes.array.isRequired,
};

export default AuthenticateProvider;
