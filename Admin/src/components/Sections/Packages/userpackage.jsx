import React, { useState } from 'react';
import '../Promotions/promotion.css'
import AddUserPackage from './adduserpackage';
import Manageuserpackage from './Manageuserpackage';


const  Userpackage = () => {
  const [activeTab, setActiveTab] = useState("adduserpackage");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "adduserpackage":
        return <AddUserPackage/>;
      case "manageuserpackage":
        return <Manageuserpackage/>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='universal-con'>
        <h1>User Packages</h1>
        <div className='universal-buttons'>
          <div
            className={`tab ${activeTab === "adduserpackage" ? "active" : ""}`}
            onClick={() => handleTabClick("adduserpackage")}
          >
          Add Packages
          </div>
          <div
            className={`tab ${activeTab === "manageuserpackage" ? "active" : ""}`}
            onClick={() => handleTabClick("manageuserpackage")}
          >
          Manage packages
          </div>
        </div>
      </div>
      {renderSelectedComponent()}
    </>
  );
};

export default  Userpackage;
