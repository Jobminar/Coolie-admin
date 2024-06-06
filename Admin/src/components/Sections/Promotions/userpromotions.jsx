import React, { useState } from 'react';
import './promotion.css';
import Addpromotions from './addpromotions';
import Managepromotions from './managepromotions';

const Userpromotions = () => {
  const [activeTab, setActiveTab] = useState("addpromotions");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "addpromotions":
        return <Addpromotions />;
      case "managepromotions":
        return <Managepromotions />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='promotions-con'>
        <h1>User Promotions</h1>
        <div className='promotion-buttons'>
          <div
            className={`tab ${activeTab === "addpromotions" ? "active" : ""}`}
            onClick={() => handleTabClick("addpromotions")}
          >
            Add Promotion
          </div>
          <div
            className={`tab ${activeTab === "managepromotions" ? "active" : ""}`}
            onClick={() => handleTabClick("managepromotions")}
          >
            Manage Promotion
          </div>
        </div>
      </div>
      {renderSelectedComponent()}
    </>
  );
};

export default Userpromotions;
