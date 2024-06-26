import React, { useState } from "react";
import "./jobsarea.css";

import Completedjobs from "./tabs/completed-jobs/completedjobs";
import Currentlyservingjobs from "./tabs/currentlyserving-jobs/currentlyserving-jobs";
import Acceptedbyproviders from "./tabs/acceptedby-providers/acceptedby-providers";
import Declinedbyproviders from "./tabs/declinedby-providers/declinedby-providers";
import Customercancelledjobs from "./tabs/customercancelled-jobs/customercancelledjobs";
import Allocatedjobs from "./tabs/allocated-jobs/allocatedjobs";
import Unallocatedjobs from "./tabs/unallocated-jobs/unallocatedjobs";

const Jobsarea = () => {
  const [activeTab, setActiveTab] = useState("pendingjobs");
  const [activeSubTab, setActiveSubTab] = useState("allocatedjobs");

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "pendingjobs":
        return activeSubTab === "allocatedjobs" ? (
          <Allocatedjobs />
        ) : (
          <Unallocatedjobs />
        );
      case "currentlyservingjobs":
        return <Currentlyservingjobs />;
      case "completedjobs":
        return <Completedjobs />;
      case "acceptedbyproviders":
        return <Acceptedbyproviders />;
      case "declinedbyproviders":
        return <Declinedbyproviders />;
      case "customercancelledjobs":
        return <Customercancelledjobs />;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== "pendingjobs") {
      setActiveSubTab("");
    } else {
      setActiveSubTab("allocatedjobs");
    }
  };

  return (
    <div className="jobcontainer">
      <div className="jobstabs">
        <div
          className={`tab ${activeTab === "pendingjobs" && "active"}`}
          onClick={() => handleTabClick("pendingjobs")}
        >
          Pending jobs
        </div>
        <div
          className={`tab ${activeTab === "currentlyservingjobs" && "active"}`}
          onClick={() => handleTabClick("currentlyservingjobs")}
        >
          Currently serving jobs
        </div>
        <div
          className={`tab ${activeTab === "completedjobs" && "active"}`}
          onClick={() => handleTabClick("completedjobs")}
        >
          Completed jobs
        </div>
        <div
          className={`tab ${activeTab === "acceptedbyproviders" && "active"}`}
          onClick={() => handleTabClick("acceptedbyproviders")}
        >
          Accepted by providers
        </div>
        <div
          className={`tab ${activeTab === "declinedbyproviders" && "active"}`}
          onClick={() => handleTabClick("declinedbyproviders")}
        >
          Declined by providers
        </div>
        <div
          className={`tab ${activeTab === "customercancelledjobs" && "active"}`}
          onClick={() => handleTabClick("customercancelledjobs")}
        >
          Customer cancelled jobs
        </div>
      </div>
      {activeTab === "pendingjobs" && (
        <div className="jobs-tabs-container">
          <div
            className={`sub-tab ${
              activeSubTab === "allocatedjobs" && "active"
            }`}
            onClick={() => setActiveSubTab("allocatedjobs")}
          >
            Allocated Jobs
          </div>
          <div
            className={`sub-tab ${
              activeSubTab === "unallocatedjobs" && "active"
            }`}
            onClick={() => setActiveSubTab("unallocatedjobs")}
          >
            Unallocated Jobs
          </div>
        </div>
      )}
      {renderSelectedComponent()}
    </div>
  );
};

export default Jobsarea;
