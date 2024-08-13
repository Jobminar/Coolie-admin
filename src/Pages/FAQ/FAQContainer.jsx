import React, { useState, useRef } from "react";
import AddFAQ from "./AddFAQ";
import GetFAQ from "./GetFAQ";
import EditFAQPopup from "./EditFAQPopup";
import "./FAQContainer.css";

const FAQContainer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [refreshFAQ, setRefreshFAQ] = useState(false);

  const toggleRefreshFAQ = () => setRefreshFAQ((prev) => !prev);

  const handleAddFAQClick = () => setIsPopupOpen(true);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    toggleRefreshFAQ(); // Trigger the FAQ reload when the AddFAQ popup is closed
  };

  const handleFAQAdded = () => {
    setIsPopupOpen(false);
    toggleRefreshFAQ(); // Trigger the FAQ reload when a new FAQ is added
  };

  const handleEditFAQClick = (faq) => {
    setSelectedFAQ(faq);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedFAQ(null);
  };

  const handleFAQUpdated = () => {
    handleCloseEditPopup();
    toggleRefreshFAQ();
  };

  // Ref to capture the popup content
  const popupRef = useRef(null);

  // Prevent closing the popup when clicking inside the popup content
  const handlePopupClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      handleClosePopup();
    }
  };

  return (
    <div className="faq-container">
      <button className="add-faq-button" onClick={handleAddFAQClick}>
        Add FAQ
      </button>
      <div className="faq-column">
        <GetFAQ refresh={refreshFAQ} onEditFAQClick={handleEditFAQClick} />
      </div>
      {isPopupOpen && (
        <div className="faq-popup" onClick={handlePopupClick}>
          <div
            className="faq-popup-content"
            ref={popupRef}
            onClick={(e) => e.stopPropagation()} // Stop propagation here
          >
            <AddFAQ onClose={handleClosePopup} onFAQAdded={handleFAQAdded} />
          </div>
        </div>
      )}
      {isEditPopupOpen && selectedFAQ && (
        <EditFAQPopup
          faq={selectedFAQ}
          isOpen={isEditPopupOpen}
          onClose={handleCloseEditPopup}
          onUpdate={handleFAQUpdated}
        />
      )}
    </div>
  );
};

export default FAQContainer;
