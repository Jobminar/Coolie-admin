import React, { useState } from 'react';
import Addproviderpackage from './Addproviderpackage';
import Manageproviderpackage from './Manageproviderpackage';
import '../Promotions/promotion.css'


const Providerpackage = () => {
  const [activeTab, setActiveTab] = useState("addproviderpackage");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "addproviderpackage":
        return < Addproviderpackage/>;
      case "manageproviderpackage":
        return <Manageproviderpackage />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='universal-con'>
        <h1>Provider Packages</h1>
        <div className='universal-buttons'>
          <div
            className={`tab ${activeTab === "addproviderpackage" ? "active" : ""}`}
            onClick={() => handleTabClick("addproviderpackage")}
          >
            Add Packages
          </div>
          <div
            className={`tab ${activeTab === "manageproviderpackage" ? "active" : ""}`}
            onClick={() => handleTabClick("manageproviderpackage")}
          >
            Manage Packages
          </div>
        </div>
      </div>
      {renderSelectedComponent()}
    </>
  );
};

export default Providerpackage;
