import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "../Packages/providerpackage.css";
import "./loyalitycards.css"; // Ensure you have the CSS file for styling

const EditLoyaltyCards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { editdata } = location.state || {};

  const [formData, setFormData] = useState({
    name: editdata?.name || "",
    points: editdata?.points || "",
    amount: editdata?.amount || "",
    minimumSpentValue: editdata?.minimumSpentValue || "",
    discount: editdata?.discount || "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    document.getElementById("hiddenFileInput").click();
  };

  const handleSubmit = async (e) => {
    const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch(
        `${AZURE_BASE_URL}/v1.0/admin/loyalty/${editdata._id}`,
        {
          method: "PATCH",
          body: formDataToSend,
        },
      );

      if (response.ok) {
        alert("Loyalty Card updated successfully");
        navigate(-1); // Navigate back to the previous page
      } else {
        alert("Error: Failed to update Loyalty Card");
      }
    } catch (err) {
      console.log("Error:", err);
      alert("An error occurred while updating Loyalty Card");
    }
  };

  return (
    <div className="universal-edit-con">
      <h1>Edit Loyality Cards</h1>
      <form onSubmit={handleSubmit} className="form-submit-con">
        <div className="input">
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            className="inputs"
          />
        </div>
        <div className="input">
          <TextField
            type="tel"
            name="points"
            value={formData.points}
            onChange={handleChange}
            label="Points"
            variant="outlined"
            margin="normal"
            fullWidth
            className="inputs"
          />
        </div>
        <div className="input">
          <TextField
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            label="Amount"
            variant="outlined"
            margin="normal"
            fullWidth
            className="inputs"
          />
        </div>
        <div className="input">
          <TextField
            name="minimumSpentValue"
            value={formData.minimumSpentValue}
            onChange={handleChange}
            label="Minimum Spent Value"
            variant="outlined"
            margin="normal"
            fullWidth
            className="inputs"
          />
        </div>
        <div className="input">
          <TextField
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            label="Discount"
            variant="outlined"
            margin="normal"
            fullWidth
            className="inputs"
          />
        </div>
        <div>
          <input
            type="file"
            id="hiddenFileInput"
            className="file-input"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            type="button"
            className="custom-button"
            onClick={handleButtonClick}
          >
            Upload Loyalty card image
          </button>
        </div>
        <button type="submit" className="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditLoyaltyCards;
