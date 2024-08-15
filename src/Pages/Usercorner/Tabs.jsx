import React from "react";

const Tabs = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    "All Users",
    "Booked Users",
    "New Users",
    "Bronze",
    "Silver",
    "Gold",
  ];

  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-button ${selectedTab === tab ? "active" : ""}`}
          onClick={() => setSelectedTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
