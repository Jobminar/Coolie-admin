import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Subadmin.css";
import SubAdminPermissions from "./SubAdminPermissions"; // Import PermissionsForm component

const Subadmin = () => {
  const navigate = useNavigate();
  const [showPermissionsForm, setShowPermissionsForm] = useState(false);

  const handleManageSubadmin = () => {
    setShowPermissionsForm(!showPermissionsForm);
  };

  return (
    <>
      <div className="sub-admin-main-con">
        <button onClick={() => navigate("/addsubadmin")}>Add Sub-admin</button>
        <button onClick={handleManageSubadmin}>Manage Sub-admin</button>
      </div>
      {showPermissionsForm && (
        <div className="permissions-form-container">
          <SubAdminPermissions />
        </div>
      )}
    </>
  );
};

export default Subadmin;
