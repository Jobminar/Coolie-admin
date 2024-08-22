import React from "react";
import "./induction.css";
import Addtraining from "./addtraining";
import ManageTraining from "./ManageTraining";

const Trainingmain = () => {
  return (
    <div className="training-main-container">
      <div className="add-training-section">
        <Addtraining />
      </div>
      <hr className="divider-line" />
      <div className="manage-training-section">
        <h3 className="manage-training-heading">Manage Training</h3>
        <ManageTraining />
      </div>
    </div>
  );
};

export default Trainingmain;
