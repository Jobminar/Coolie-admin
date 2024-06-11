// React component
import React, { useState } from "react";
import "./PermissionsForm.css";

const PermissionsForm = () => {
  const [permissions, setPermissions] = useState({
    allocatePermission: false,
    serviceManager: false,
    userCorner: false,
  });

  const handleChange = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted permissions:", permissions);
  };

  return (
    <form onSubmit={handleSubmit} className="permissions-form">
      <label>
        Allocate Permission:
        <input
          type="checkbox"
          name="allocatePermission"
          checked={permissions.allocatePermission}
          onChange={handleChange}
        />
      </label>
      <label>
        Service Manager:
        <input
          type="checkbox"
          name="serviceManager"
          checked={permissions.serviceManager}
          onChange={handleChange}
        />
      </label>
      <label>
        User Corner:
        <input
          type="checkbox"
          name="userCorner"
          checked={permissions.userCorner}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Done</button>
    </form>
  );
};

export default PermissionsForm;
