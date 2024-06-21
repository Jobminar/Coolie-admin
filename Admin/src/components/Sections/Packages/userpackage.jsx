import React, { useState } from 'react';
import '../Promotions/promotion.css'

import Mostbookedservices from '../Banners/mostbookedservices';
import OurCoreServices from '../Banners/ourcoreservices';


const  Userpackage = () => {
  const [activeTab, setActiveTab] = useState("mostbookedservices");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "mostbookedservices":
        return <Mostbookedservices/>;
      case "ourcoreservices":
        return <OurCoreServices/>;
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
            className={`tab ${activeTab === "mostbookedservices" ? "active" : ""}`}
            onClick={() => handleTabClick("mostbookedservices")}
          >
           Most booked Services
          </div>
          <div
            className={`tab ${activeTab === "ourcoreservices" ? "active" : ""}`}
            onClick={() => handleTabClick("ourcoreservices")}
          >
           Our core services
          </div>
        </div>
      </div>
      {renderSelectedComponent()}
    </>
  );
};

export default  Userpackage;
