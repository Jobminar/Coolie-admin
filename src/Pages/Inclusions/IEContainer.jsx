import React, { useState } from "react";
import AddInclusionExclusion from "./AddInclusionExclusion";
import GetInclusionExclusion from "./GetInclusionExclusion";
import UpdateInclusionExclusion from "./UpdateInclusionExclusion"; // Import the update component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./IEContainer.css";

const IEContainer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State for edit popup
  const [selectedInclusionExclusion, setSelectedInclusionExclusion] =
    useState(null); // State to track selected item for edit
  const [refreshData, setRefreshData] = useState(false);

  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDataAdded = () => {
    toast.success("Inclusion/Exclusion added successfully!");
    setIsPopupOpen(false);
    setRefreshData(!refreshData); // Toggle to trigger data reload
  };

  const handleEditClick = (item) => {
    setSelectedInclusionExclusion(item); // Set the item to be edited
    setIsEditPopupOpen(true); // Open the edit popup
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedInclusionExclusion(null); // Clear selected item
  };

  const handleDataUpdated = () => {
    toast.success("Inclusion/Exclusion updated successfully!");
    handleCloseEditPopup();
    setRefreshData(!refreshData); // Toggle to trigger data reload
  };

  return (
    <div className="ie-container">
      <button className="add-ie-button" onClick={handleAddButtonClick}>
        Add Inclusion/Exclusion
      </button>
      <div className="ie-column">
        <GetInclusionExclusion
          refresh={refreshData}
          onEditClick={handleEditClick} // Pass the edit click handler
        />
      </div>
      {isPopupOpen && (
        <div
          className="ie-popup"
          onClick={(e) =>
            e.target.className === "ie-popup" && handleClosePopup()
          }
        >
          <div className="ie-popup-content">
            <AddInclusionExclusion
              onClose={handleClosePopup}
              onDataAdded={handleDataAdded}
            />
          </div>
        </div>
      )}
      {isEditPopupOpen && selectedInclusionExclusion && (
        <div
          className="ie-popup"
          onClick={(e) =>
            e.target.className === "ie-popup" && handleCloseEditPopup()
          }
        >
          <div className="ie-popup-content">
            <UpdateInclusionExclusion
              inclusionExclusion={selectedInclusionExclusion}
              onClose={handleCloseEditPopup}
              onDataUpdated={handleDataUpdated}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default IEContainer;
