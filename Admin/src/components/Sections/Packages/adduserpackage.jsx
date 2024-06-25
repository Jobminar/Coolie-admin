import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./providerpackage.css";

const AddUserPackage = () => {
  const [userPackage, setUserPackage] = useState({
    packageName: "",
    priceRs: "",
    priceCr: "",
    discountPlatformCom: "",
    comments: "",
  });

  const handleChange = (e) => {
    setUserPackage({ ...userPackage, [e.target.name]: e.target.value });
    console.log(userPackage, "handle change triggered");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userPackage);
    try {
      const response = await fetch(
        "https://api.coolieno1.in/v1.0/admin/user-package",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userPackage),
        },
      );

      if (response.ok) {
        alert("Success");
      } else {
        alert("Failed to submit");
        console.error("Response error:", response.statusText);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div className="add-package-con">
      <form className="form-con" onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="packageName"
          value={userPackage.packageName}
          onChange={handleChange}
          label="Package Name"
          multiline
          maxRows={4}
          variant="outlined"
          fullWidth
          classes={{ root: "textFieldCustom" }}
        />
        <TextField
          type="number"
          name="priceRs"
          value={userPackage.priceRs}
          onChange={handleChange}
          label="Price in Rs"
          variant="outlined"
          multiline
          fullWidth
          classes={{ root: "textFieldCustom" }}
        />
        <TextField
          type="number"
          name="priceCr"
          value={userPackage.priceCr}
          onChange={handleChange}
          label="Price in Cr"
          variant="outlined"
          multiline
          fullWidth
          classes={{ root: "textFieldCustom" }}
        />
        <TextField
          type="number"
          name="discountPlatformCom"
          value={userPackage.discountPlatformCom}
          onChange={handleChange}
          label="Discount in(%)"
          variant="outlined"
          multiline
          fullWidth
          classes={{ root: "textFieldCustom" }}
        />
        <TextField
          type="text"
          name="comments"
          value={userPackage.comments}
          onChange={handleChange}
          label="Comments"
          multiline
          maxRows={4}
          variant="outlined"
          fullWidth
          classes={{ root: "textFieldCustom" }}
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserPackage;
