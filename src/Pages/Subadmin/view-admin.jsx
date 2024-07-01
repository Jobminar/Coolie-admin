import React from 'react';
import { useLocation } from 'react-router-dom';

const Viewadmin = () => {
  const location = useLocation();
  const { admin } = location.state;
8
  return (
    <>
      <div>
        <h1>Admin Details</h1>
        <p><strong>Full Name:</strong> {admin.fullName}</p>
        <p><strong>Mobile No:</strong> {admin.mobileNo}</p>
        <p><strong>Email:</strong> {admin.emailforCommunication}</p>

      </div>
    </>
  );
};

export default Viewadmin;
