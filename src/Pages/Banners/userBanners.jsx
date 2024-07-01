import React, { useState } from 'react';
import '../Promotions/promotion.css'

import Mostbookedservices from '../Banners/mostbookedservices';
import OurCoreServices from '../Banners/ourcoreservices';


const  Userbanners = () => {
  const [activeTab, setActiveTab] = useState("mostbookedservices");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "most-booked-services":
        return <Mostbookedservices/>;
      case "our-core-services":
        return <OurCoreServices/>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='universal-con'>
        <h1>User Banners</h1>
        <div className='universal-buttons'>
          <div
            className={`tab ${activeTab === "most-booked-services" ? "active" : ""}`}
            onClick={() => handleTabClick("most-booked-services")}
          >
           Most booked Services
          </div>
          <div
            className={`tab ${activeTab === "our-core-services" ? "active" : ""}`}
            onClick={() => handleTabClick("our-core-services")}
          >
           Our core services
          </div>
        </div>
      </div>
      {renderSelectedComponent()}
    </>
  );
};

export default  Userbanners;
