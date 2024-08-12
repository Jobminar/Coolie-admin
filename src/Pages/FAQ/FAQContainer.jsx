import React, { useState } from "react";
import AddFAQ from "./AddFAQ";
import GetFAQ from "./GetFAQ";
import "./FAQContainer.css";

const FAQContainer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [refreshFAQ, setRefreshFAQ] = useState(false);

  const handleAddFAQClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFAQAdded = () => {
    setIsPopupOpen(false);
    setRefreshFAQ(!refreshFAQ); // Toggle to trigger FAQ reload
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "faq-popup") {
      setIsPopupOpen(false);
    }
  };

  return (
    <div className="faq-container">
      <button className="add-faq-button" onClick={handleAddFAQClick}>
        Add FAQ
      </button>
      <div className="faq-column">
        <GetFAQ refresh={refreshFAQ} />
      </div>
      {isPopupOpen && (
        <div className="faq-popup" onClick={handleOutsideClick}>
          <div className="faq-popup-content">
            <AddFAQ onClose={handleClosePopup} onFAQAdded={handleFAQAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQContainer;
