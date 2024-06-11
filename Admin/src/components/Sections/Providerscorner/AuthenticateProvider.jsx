import React, { useState } from "react";
import "./AuthenticateProvider.css";
import Document1 from "../../../assets/Documents/ProviderReport1.pdf";
import Document2 from "../../../assets/Documents/ProviderReport2.pdf";
import fileImage from "../../../assets/images/Documents.png";

const AuthenticateProvider = ({ provider }) => {
  const fakeData = {
    documents: [
      { id: 1, name: "Document 1", file: Document1 },
      { id: 2, name: "Document 2", file: Document2 },
    ],
    providerName: provider || "Varma", // Fallback to 'Sample Provider' if no provider is passed
  };

  // State to manage which document and if the document section should be displayed
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocuments, setShowDocuments] = useState(false);

  // Function to handle document selection
  const handleDocumentSelect = (documentId) => {
    setSelectedDocument(selectedDocument === documentId ? null : documentId);
  };

  // Function to handle document approval
  const handleApprove = (documentId) => {
    console.log("Document approved:", documentId);
  };

  // Function to handle document reupload
  const handleReupload = (documentId) => {
    console.log("Reupload requested for document:", documentId);
  };

  // Function to handle document decline
  const handleDecline = (documentId) => {
    console.log("Document declined:", documentId);
  };

  // Function to toggle the document section
  const toggleDocumentSection = () => {
    setShowDocuments(!showDocuments);
  };

  return (
    <div className="authenticate-provider">
      <div className="sticky-header">
        <button
          className="document-heading-button"
          onClick={toggleDocumentSection}
        >
          Documents
        </button>
        <span>{fakeData.providerName}</span>
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
                      onClick={() => handleApprove(document.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="action-button-unique reupload"
                      onClick={() => handleReupload(document.id)}
                    >
                      Reupload
                    </button>
                    <button
                      className="action-button-unique decline"
                      onClick={() => handleDecline(document.id)}
                    >
                      Decline
                    </button>
                  </div>
                  <div className="comment-section">
                    <textarea placeholder="Comment"></textarea>
                    <div className="comment-footer">
                      <button className="submit-button-unique">Submit</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthenticateProvider;
