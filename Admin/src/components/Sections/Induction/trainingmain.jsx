import React, { useState } from 'react';
import './induction.css'; 
import Addtraining from './addtraining';
import Modifytraining from './modifytraining';

const TrainingMain = () => {
  const [activeTab, setActiveTab] = useState('addtraining');

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case 'addtraining':
        return <Addtraining />;
      case 'modifytraining':
        return <Modifytraining />;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='induction-main-container'>
      <div className="induction-con">
        <div
          className={`tab ${activeTab === 'addtraining' && 'active'}`}
          onClick={() => handleTabClick('addtraining')}
        >
         Add Training
        </div>
        <div
          className={`tab ${activeTab === 'modifytraining' && 'active'}`}
          onClick={() => handleTabClick('modifytraining')}
        >
          Modify Training
        </div>
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default TrainingMain;
