import React, { useState } from 'react';
import './jobsarea.css'
import Pendingjobs from './tabs/pendig-jobs/pendingjobs';
import Completedjobs from './tabs/completed-jobs/completedjobs';
import Currentlyservingjobs from './tabs/currentlyserving-jobs/currentlyserving-jobs';
import Acceptedbyproviders from './tabs/acceptedby-providers/acceptedby-providers';
import Declinedbyproviders from './tabs/declainedby-providers/declinedby-providers';
import Customercancelledjobs from './tabs/customercancelled-jobs/customercancelledjobs';

const Jobsarea = () => {
  const [activeTab, setActiveTab] = useState('freshfruits');

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case 'pendingjobs':
        return <Pendingjobs/>
      case 'completedjobs':
        return <Completedjobs />;
      case 'currentlyservingjobs':
        return <Currentlyservingjobs />;
      case 'acceptedbyproviders':
        return <Acceptedbyproviders />;
      case 'declainedbyproviders':
        return <Declinedbyproviders />;
      case 'customercancelledjobs':
        return <Customercancelledjobs />;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div  className='services-container'>
      <div>
        <p className='jobsarea'>Jobs area</p>
      </div>
  
      <div className="tabs-container">
        <div
          className={`tab ${activeTab === 'pendingjobs' && 'active'}`}
          onClick={() => handleTabClick('pendingjobs')}
        >
          {/* <img src={general} alt="" width={30}/> */}
          Pending jobs
        </div>
        <div
          className={`tab ${activeTab === 'completedjobs' && 'active'}`}
          onClick={() => handleTabClick('completedjobs')}
        >
          {/* <img src={denting} alt="" width={30}/> */}
          Completed jobs
        </div>
        <div
          className={`tab ${activeTab === 'currentlyservingjobs' && 'active'}`}
          onClick={() => handleTabClick('currentlyservingjobs')}
        >
          {/* <img src={denting} alt="" width={30}/> */}
          Currently serving jobs
        </div>
        <div
          className={`tab ${activeTab === 'acceptedbyproviders' && 'active'}`}
          onClick={() => handleTabClick('acceptedbyproviders')}
        >
          {/* <img src={ac} alt="" width={30}/> */}
          Accepted by providers
        </div>
        <div
          className={`tab ${activeTab === 'declainedbyproviders' && 'active'}`}
          onClick={() => handleTabClick('declainedbyproviders')}
        >
          {/* <img src={accident} alt="" width={30}/> */}
          Declained by providers
        </div>
        <div
          className={`tab ${activeTab === 'customercancelledjobs' && 'active'}`}
          onClick={() => handleTabClick('customercancelledjobs')}
        >
          {/* <img src={battery} alt="" width={30}/> */}
          Customer cancelled jobs
        </div>
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default Jobsarea;
