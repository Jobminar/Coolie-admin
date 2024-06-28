import React, { useContext, useState, useEffect } from "react";
import { ProviderAuthContext } from "./ProviderAuthContext";
import { submitFinanceDetails } from "./api/api-service-provider";
import "./AddProvider.css"; // Ensure this is the same stylesheet used for AddProvider
import { FaTrash } from "react-icons/fa";

const ProviderFinance = ({ handleAddFinanceDetails, submissionError }) => {
  const { providerId, phone } = useContext(ProviderAuthContext);
  const [formData, setFormData] = useState({
    pan: "",
    gst: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    branch: "",
    branchAddress: "",
  });
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // Initialize form data if stored in sessionStorage
    const storedFinanceDetails = sessionStorage.getItem("financeDetails");
    if (storedFinanceDetails) {
      const parsedDetails = JSON.parse(storedFinanceDetails);
      setFormData(parsedDetails);
      setDocuments(parsedDetails.documents || []);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments((prevDocuments) => [...prevDocuments, ...files]);
  };

  const handleRemoveDocument = (index) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((_, i) => i !== index),
    );
  };

  const handleSubmit = async () => {
    if (
      !window.confirm("Are you sure you want to submit these finance details?")
    ) {
      return;
    }

    const financeFormData = new FormData();
    financeFormData.append("userId", providerId);
    financeFormData.append("pan", formData.pan);
    financeFormData.append("gst", formData.gst);
    financeFormData.append("accountName", formData.accountName);
    financeFormData.append("accountNumber", formData.accountNumber);
    financeFormData.append("bankName", formData.bankName);
    financeFormData.append("ifscCode", formData.ifscCode);
    financeFormData.append("branch", formData.branch);
    financeFormData.append("branchAddress", formData.branchAddress);
    documents.forEach((doc) => {
      financeFormData.append("documents", doc);
    });

    setLoading(true);
    try {
      await handleAddFinanceDetails(financeFormData);
      alert("Finance details submitted successfully.");
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error submitting finance details:", error);
      alert("Error submitting finance details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="finance-details-form add-provider-form">
      {loading && <div className="loading">Loading...</div>}
      <div className="form-header">
        <h3>Banking Details</h3>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="form-content">
        <div className="form-group">
          <label>PAN:</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleInputChange}
            placeholder="PAN"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>GST:</label>
          <input
            type="text"
            name="gst"
            value={formData.gst}
            onChange={handleInputChange}
            placeholder="GST"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Account Name:</label>
          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleInputChange}
            placeholder="Account Name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            placeholder="Account Number"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            placeholder="Bank Name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>IFSC:</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleInputChange}
            placeholder="IFSC"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Branch:</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            placeholder="Branch"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Branch Address:</label>
          <input
            type="text"
            name="branchAddress"
            value={formData.branchAddress}
            onChange={handleInputChange}
            placeholder="Branch Address"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Document(s):</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control"
            multiple
          />
          <div className="document-preview">
            {documents.map((doc, index) => (
              <div key={index} className="document-card">
                <span>{doc.name}</span>
                <FaTrash onClick={() => handleRemoveDocument(index)} />
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
        {submissionError && <p className="error">{submissionError}</p>}
      </form>
    </div>
  );
};

export default ProviderFinance;
