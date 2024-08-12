import React, { useState } from "react";
import AddInclusionExclusion from "./AddInclusionExclusion";
import GetInclusionExclusion from "./GetInclusionExclusion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./IEContainer.css";

const IEContainer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  return (
    <div className="ie-container">
      <button className="add-ie-button" onClick={handleAddButtonClick}>
        Add Inclusion/Exclusion
      </button>
      <div className="ie-column">
        <GetInclusionExclusion refresh={refreshData} />
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
      <ToastContainer />
    </div>
  );
};

export default IEContainer;
