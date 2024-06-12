import React, { useState } from 'react';
import Addproviderpackage from './Addproviderpackage';
import Manageproviderpackage from './Manageproviderpackage';
import '../Promotions/promotion.css'
import Adduserpackage from './adduserpackage';
import Manageuserpackage from './Manageuserpackage';


const  Userpackage = () => {
  const [activeTab, setActiveTab] = useState("adduserpackage");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "adduserpackage":
        return <Adduserpackage/>;
      case "manageuserpackage":
        return < Manageuserpackage/>;
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
            Add User Packages
          </div>
          <div
            className={`tab ${activeTab === "manageuserpackage" ? "active" : ""}`}
            onClick={() => handleTabClick("manageuserpackage")}
          >
            Manage User Packages
          </div>
        </div>
      </div>
      {renderSelectedComponent()}
    </>
  );
};

export default  Userpackage;
