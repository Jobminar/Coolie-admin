import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./providerpackage.css";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";

const AddProviderPackage = () => {
  const [propackage, setPropackage] = useState({
    packageName: "",
    noOfJobOffers: "",
    priceRs: "",
    priceCr: "",
    discountPlatformCom: "",
    comments: "",
  });

  const handleChange = (e) => {
    setPropackage({ ...propackage, [e.target.name]: e.target.value });
    console.log(propackage, "handle change triggered");
  };

  const handleSubmit = async (e) => {
    const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
    e.preventDefault();
    console.log(propackage);
    try {
      const response = await fetch(`${AZURE_BASE_URL}/v1.0/admin/package`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propackage),
      });

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
        <FormControl component="fieldset" fullWidth>
          <div className="inputss">
            <TextField
              type="text"
              name="packageName"
              value={propackage.packageName}
              onChange={handleChange}
              label="Package Name"
              multiline
              maxRows={4}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="inputss">
            <TextField
              type="number"
              name="noOfJobOffers"
              value={propackage.noOfJobOffers}
              onChange={handleChange}
              label="No of Job Offers"
              variant="outlined"
              multiline
              fullWidth
            />
          </div>
          <div className="inputss">
            <TextField
              type="number"
              name="priceCr"
              value={propackage.priceCr}
              onChange={handleChange}
              label="Price in Cr"
              variant="outlined"
              multiline
              fullWidth
            />
          </div>
          <div className="inputss">
            <TextField
              type="number"
              name="priceRs"
              value={propackage.priceRs}
              onChange={handleChange}
              label="Price in Rs"
              variant="outlined"
              multiline
              fullWidth
            />
          </div>
          <div className="inputss">
            <TextField
              type="number"
              name="discountPlatformCom"
              value={propackage.discountPlatformCom}
              onChange={handleChange}
              label="Discount in Platform Commission (%)"
              variant="outlined"
              multiline
              fullWidth
            />
          </div>
          <div className="inputss">
            <TextField
              type="text"
              name="comments"
              value={propackage.comments}
              onChange={handleChange}
              label="Comments"
              multiline
              maxRows={4}
              variant="outlined"
              fullWidth
            />
          </div>
        </FormControl>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProviderPackage;
