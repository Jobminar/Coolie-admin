import React, { useState } from 'react';
import './promotion.css';
import Addpromotions from './Adduserpromotions';
import Manageuserpromotions from './manageuserpromotions';

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
        return <Manageuserpromotions />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='universal-con'>
        <h1>User Promotions</h1>
        <div className='universal-buttons'>
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
