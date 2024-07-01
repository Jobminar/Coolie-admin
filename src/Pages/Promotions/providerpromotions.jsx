import React, { useState } from 'react';
import './promotion.css';
import Addpropromotions from './Addproviderpromotions';
import Managepropromotions from './Managepropromotions';

const Providerpromotions = () => {
  const [activeTab, setActiveTab] = useState("addpropromotions");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "addpropromotions":
        return <Addpropromotions />;
      case "managepropromotions":
        return <Managepropromotions />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='universal-con'>
        <h1>Provider Promotions</h1>
        <div className='universal-buttons'>
          <div
            className={`tab ${activeTab === "addpropromotions" ? "active" : ""}`}
            onClick={() => handleTabClick("addpropromotions")}
          >
            Add Promotion
          </div>
          <div
            className={`tab ${activeTab === "managepropromotions" ? "active" : ""}`}
            onClick={() => handleTabClick("managepropromotions")}
          >
            Manage Promotion
          </div>
        </div>
      </div>
      {renderSelectedComponent()}
    </>
  );
};

export default Providerpromotions;
