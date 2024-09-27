import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./Subadmin.css";

const initialAdminState = {
  fullName: "",
  mobileNo: "",
  emailforCommunication: "",
  loginEmailId: "",
  password: "",
  dob: "",
  aadharNumber: "",
  pan: "",
  designation: "",
  experience: "",
  addressWithPincode: "",
  servingLocations: "",
  accountName: "",
  accountNumber: "",
  bankName: "",
  ifscCode: "",
  branchName: "",
  branchAddress: "",
  profileImage: null,
  documents: [""],
};

const Addsubadmin = () => {
  const [addAdmin, setAddAdmin] = useState(initialAdminState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddAdmin({ ...addAdmin, [e.target.name]: e.target.value });
  };

  const {
    fullName,
    mobileNo,
    emailforCommunication,
    loginEmailId,
    password,
    dob,
    aadharNumber,
    pan,
    designation,
    experience,
    addressWithPincode,
    servingLocations,
    accountName,
    accountNumber,
    bankName,
    ifscCode,
    branchName,
    branchAddress,
  } = addAdmin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("${AZURE_BASE_URL}/v1.0/admin/sub-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addAdmin),
      });
      if (response.ok) {
        alert("Form submitted");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="subadmin-main-con">
      <h1>Add Sub Admin</h1>
      <div className="subadmin-main">
        <div className="subadmin-text">
          <TextField
            type="text"
            name="fullName"
            value={fullName}
            label="Full Name"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="mobileNo"
            value={mobileNo}
            label="Mobile No"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="emailforCommunication"
            value={emailforCommunication}
            label="Email for Communication"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="loginEmailId"
            value={loginEmailId}
            label="Login Email Id"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="password"
            name="password"
            value={password}
            label="Password"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="date"
            name="dob"
            value={dob}
            label="Date of Birth"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="number"
            name="aadharNumber"
            value={aadharNumber}
            label="Aadhar Number"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="pan"
            value={pan}
            label="PAN"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="designation"
            value={designation}
            label="Designation"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="experience"
            value={experience}
            label="Experience"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="addressWithPincode"
            value={addressWithPincode}
            label="Address with Pincode"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="servingLocations"
            value={servingLocations}
            label="Serving Locations"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="accountName"
            value={accountName}
            label="Account Name"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="number"
            name="accountNumber"
            value={accountNumber}
            label="Account Number"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="bankName"
            value={bankName}
            label="Bank Name"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="ifscCode"
            value={ifscCode}
            label="IFSC Code"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="branchName"
            value={branchName}
            label="Branch Name"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <TextField
            type="text"
            name="branchAddress"
            value={branchAddress}
            label="Branch Address"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="subadmin-text">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
        </div>
        <div className="subadmin-text">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate("/permissionform");
            }}
            fullWidth
          >
            Add Permissions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Addsubadmin;
