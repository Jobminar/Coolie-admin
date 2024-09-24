import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faDownload,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import toast, { Toaster } from "react-hot-toast";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"; // Import the reactjs-popup CSS

const LocationsTable = ({
  locations,
  handleDelete,
  handleEdit,
  showActions,
}) => {
  const [isConverting, setIsConverting] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const csvLinkRef = useRef(); // Reference to the CSVLink component

  // Prepare the data for CSV download
  const prepareCsvData = () => {
    const data = locations.map((location) => ({
      Location: location.location,
      Pincode: location.pincode,
      District: location.district,
      State: location.state,
      Category: location.category,
      Subcategory: location.subcategory,
      "Service Name": location.servicename,
      Price: location.price ? JSON.stringify(location.price) : "N/A",
      "Offer Price": location.offerPrice
        ? JSON.stringify(location.offerPrice)
        : "N/A",
      Min: location.min || "N/A",
      Max: location.max || "N/A",
      Metric: location.metric || "N/A",
      "Credit Eligibility": location.creditEligibility ? "Yes" : "No",
      "Tax Percentage": location.taxPercentage || "N/A",
      "Misc Fee": location.miscFee || "N/A",
      "Platform Commission": location.platformCommission || "N/A",
      "Is Cash Payment": location.isCash ? "Yes" : "No",
    }));

    setCsvData(data);
  };

  // Trigger the CSV download after data preparation is complete
  useEffect(() => {
    if (csvData.length > 0) {
      csvLinkRef.current.link.click(); // Trigger the CSV download after data is ready
    }
  }, [csvData]);

  // Handle CSV conversion process with feedback and trigger the download
  const handleDownloadCsv = () => {
    setIsConverting(true);
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          prepareCsvData(); // Prepare CSV data
          if (locations.length > 0) {
            resolve();
            setIsSuccess(true);
            setIsConverting(false);
            setPopupOpen(true);
          } else {
            reject();
            setIsSuccess(false);
            setIsConverting(false);
            setPopupOpen(true);
          }
        }, 2000); // Simulate conversion delay
      }),
      {
        loading: "Converting to CSV...",
        success: "CSV file ready to download!",
        error: "Failed to convert data.",
      },
    );
  };

  return (
    <div className="tiger-locations-table-wrapper">
      <Toaster />
      <h2>Manage Locations</h2>

      {/* Download Button */}
      <div className="download-section">
        <button className="tiger-download-btn" onClick={handleDownloadCsv}>
          <FontAwesomeIcon icon={faDownload} /> Download as CSV
        </button>

        {/* Hidden CSVLink to programmatically trigger the download */}
        <CSVLink
          data={csvData}
          filename="locations_data.csv"
          className="hidden-link"
          ref={csvLinkRef}
        />
      </div>

      {/* Table Display */}
      <table className="tiger-locations-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Pincode</th>
            <th>District</th>
            <th>State</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Service Name</th>
            <th>Price</th>
            <th>Offer Price</th>
            <th>Min</th>
            <th>Max</th>
            <th>Metric</th>
            <th>Credit Eligibility</th>
            <th>Tax Percentage</th>
            <th>Misc Fee</th>
            <th>Platform Commission</th>
            <th>Is Cash Payment</th>
            {showActions && <th className="sticky-actions">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location._id}>
              <td>{location.location}</td>
              <td>{location.pincode}</td>
              <td>{location.district}</td>
              <td>{location.state}</td>
              <td>{location.category}</td>
              <td>{location.subcategory}</td>
              <td>{location.servicename}</td>
              <td>{JSON.stringify(location.price)}</td>
              <td>{JSON.stringify(location.offerPrice)}</td>
              <td>{location.min || "N/A"}</td>
              <td>{location.max || "N/A"}</td>
              <td>{location.metric || "N/A"}</td>
              <td>{location.creditEligibility ? "Yes" : "No"}</td>
              <td>{location.taxPercentage || "N/A"}</td>
              <td>{location.miscFee || "N/A"}</td>
              <td>{location.platformCommission || "N/A"}</td>
              <td>{location.isCash ? "Yes" : "No"}</td>
              {showActions && (
                <td className="sticky-actions">
                  <button
                    className="tiger-edit-btn"
                    onClick={() => handleEdit(location)} // Trigger edit
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="tiger-delete-btn"
                    onClick={() => handleDelete(location._id)} // Trigger delete
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* CSV Conversion Animation */}
      {isConverting && (
        <div className="csv-conversion-animation">
          <div className="loading-animation">
            <FontAwesomeIcon icon={faDownload} spin />
            <p>Converting to CSV...</p>
          </div>
        </div>
      )}

      {/* Popup for CSV conversion result */}
      <Popup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        closeOnDocumentClick
      >
        <div className="tiger-popup-content">
          {isSuccess ? (
            <>
              <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
              <h2>CSV Downloaded Successfully!</h2>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faTimesCircle} className="error-icon" />
              <h2>CSV Conversion Failed</h2>
            </>
          )}
          <button
            onClick={() => setPopupOpen(false)}
            className="popup-close-btn"
          >
            Close
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default LocationsTable;
