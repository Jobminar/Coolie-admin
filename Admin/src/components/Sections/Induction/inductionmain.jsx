import React, { useState } from 'react';
import Induction from './induction';
import Training from './training';
import './induction.css'

const Inductionmain = () => {
  const [activeTab, setActiveTab] = useState('induction');

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case 'induction':
        return <Induction/>
      case 'training':
        return <Training />;
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
        <div
          className={`tab ${activeTab === 'induction' && 'active'}`}
          onClick={() => handleTabClick('induction')}
        >
          {/* <img src={general} alt="" width={30}/> */}
          Induction
        </div>
        <div
          className={`tab ${activeTab === 'training' && 'active'}`}
          onClick={() => handleTabClick('training')}
        >
          {/* <img src={denting} alt="" width={30}/> */}
          Training
        </div>
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default Inductionmain;
