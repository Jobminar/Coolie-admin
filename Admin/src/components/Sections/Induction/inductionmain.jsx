import React, { useState } from 'react';
import './induction.css'
import Addinduction from './addinduction';
import Manageinduction from './Manageinduction';

const Inductionmain = () => {
  const [activeTab, setActiveTab] = useState('addinduction');

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case 'addinduction':
        return <Addinduction/>
      case 'manageinduction':
        return <Manageinduction/>;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div  className='induction-main-container'>
  
      <div className="induction-con">
        {/* <div
          className={`tab ${activeTab === 'addinduction' && 'active'}`}
          onClick={() => handleTabClick('addinduction')}
        >
         Add Induction
        </div> */}
        {/* <div
          className={`tab ${activeTab === 'training' && 'active'}`}
          onClick={() => handleTabClick('training')}
        >
          
          Manage Induction
        </div> */}
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default Inductionmain;
