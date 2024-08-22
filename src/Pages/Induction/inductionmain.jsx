import React from "react";
import "./induction.css";
import AddInduction from "./addinduction";
import ManageInduction from "./Manageinduction";

const InductionMain = () => {
  return (
    <div className="induction-main-container">
      <div className="induction-con">
        <AddInduction />
      </div>
      <hr className="divider-line" />
      <div className="video-section">
        <h3 className="manage-induction-heading">Manage Induction</h3>
        <ManageInduction />
      </div>
    </div>
  );
};

export default InductionMain;
