import React, { useState } from "react";
import "./AuthenticateProvider.css";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import ProviderProfile from "./ProviderProfile";
import Document1 from "../../../assets/Documents/ProviderReport1.pdf";
import Document2 from "../../../assets/Documents/ProviderReport2.pdf";
import fileImage from "../../../assets/images/Documents.png";

const AuthenticateProvider = () => {
  const [activeComponent, setActiveComponent] = useState("ProviderList");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [documentStatus, setDocumentStatus] = useState("Pending");

  const handleVerify = (provider) => {
    setSelectedProvider(provider);
    setActiveComponent("ProviderProfile");
  };

  const handleDocumentsClick = () => {
    setActiveComponent("DocumentVerification");
  };

  const providers = [
    {
      id: 1,
      name: "Varma",
      email: "provider1@example.com",
      phone: "1234567890",
      location: "Location 1",
      joinDate: "2021-01-01",
      loyaltyPoints: 100,
      package: "Basic",
      status: "active",
    },
    // Add more sample providers as needed
  ];

  const fakeData = {
    documents: [
      { id: 1, name: "Document 1", file: Document1 },
      { id: 2, name: "Document 2", file: Document2 },
    ],
    providerName: selectedProvider?.name || "Varma",
  };

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocuments, setShowDocuments] = useState(false);

  const handleDocumentSelect = (documentId) => {
    setSelectedDocument(selectedDocument === documentId ? null : documentId);
  };

  const handleDocumentApprove = (documentId) => {
    console.log("Document approved:", documentId);
    setDocumentStatus("Approved");
  };

  const handleDocumentReupload = (documentId) => {
    console.log("Reupload requested for document:", documentId);
    setDocumentStatus("Pending");
  };

  const handleDocumentDecline = (documentId) => {
    console.log("Document declined:", documentId);
    setDocumentStatus("Declined");
  };

  const toggleDocumentSection = () => {
    setShowDocuments(!showDocuments);
  };

  const handleBackClick = () => {
    setActiveComponent("ProviderProfile");
  };

  return (
    <div className="authenticate-provider">
      {activeComponent === "ProviderList" && (
        <div className="providers-table-container">
          <table className="providers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Provider name</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Join date</th>
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
                      className={`status-toggle ${
                        provider.status === "active" ? "active" : "inactive"
                      }`}
                    ></div>
                  </td>
                  <td>
                    <button
                      className="action-button edit"
                      onClick={() => handleVerify(provider)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() =>
                        console.log("Provider deleted:", provider.id)
                      }
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeComponent === "ProviderProfile" && (
        <ProviderProfile onDocumentsClick={handleDocumentsClick} />
      )}
      {activeComponent === "DocumentVerification" && (
        <div className="document-verification">
          <div className="sticky-header">
            <button
              className="document-heading-button"
              onClick={toggleDocumentSection}
            >
              Documents
            </button>
            <span>{fakeData.providerName}</span>
            <span className="status-Bar">Status: {documentStatus}</span>
            <button className="Back-Button" onClick={handleBackClick}>
              <FaArrowLeft /> Back
            </button>
          </div>
          {showDocuments && (
            <div className="document-section">
              {fakeData.documents.map((document) => (
                <div key={document.id} className="document-item">
                  <img
                    src={fileImage}
                    alt={document.name}
                    className={`document-image ${
                      selectedDocument === document.id ? "small" : ""
                    }`}
                    onClick={() => handleDocumentSelect(document.id)}
                  />
                  {selectedDocument === document.id && (
                    <>
                      <embed
                        src={document.file}
                        type="application/pdf"
                        className="document-preview"
                      />
                      <div className="button-group">
                        <button
                          className="action-button-unique approve"
                          onClick={() => handleDocumentApprove(document.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="action-button-unique reupload"
                          onClick={() => handleDocumentReupload(document.id)}
                        >
                          Reupload
                        </button>
                        <button
                          className="action-button-unique decline"
                          onClick={() => handleDocumentDecline(document.id)}
                        >
                          Decline
                        </button>
                      </div>
                      <div className="comment-section">
                        <textarea placeholder="Comment"></textarea>
                        <div className="comment-footer">
                          <button className="submit-button-unique">
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="status-toggle-container">
            <button
              className={`status-toggle-button ${
                documentStatus === "Approved" ? "active" : ""
              }`}
              onClick={() => setDocumentStatus("Approved")}
            >
              Approve
            </button>
            <button
              className={`status-toggle-button ${
                documentStatus === "Pending" ? "active" : ""
              }`}
              onClick={() => setDocumentStatus("Pending")}
            >
              Pending
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticateProvider;
