// EditBanner.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './banners.css'
import { useNavigate } from "react-router-dom";

const EditBanner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { banner, apiEndpoint } = location.state;

  const [name, setBannername] = useState(banner.name);
  const [image, setBannerimg] = useState(null);

  const handleChange = (e) => {
    setBannername(e.target.value);
  };

  const handleFileChange = (e) => {
    setBannerimg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }
      const response = await fetch(
        `http://13.126.118.3:3000/v1.0/admin/${apiEndpoint}/${banner._id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (response.ok) {
        alert("Banner updated successfully");
        navigate(-1); // Navigate back to the previous page
      } else {
        alert("Error: Failed to update data.");
      }
    } catch (err) {
      console.log("error", err);
      alert("An error occurred while updating");
    }
  };
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    document.getElementById('hiddenFileInput').click();
 };

  return (
    <div className="edit-banner-form">
      <h1>Edit  Banners</h1>
      <form onSubmit={handleSubmit}>
      <div>
                        <input
                        type='file'
                        id='hiddenFileInput'
                        className='file-input'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        />
                        <button type='button' className='custom-button' onClick={handleButtonClick}>
                        Upload Banner image
                        </button>
                        {image && <p>Selected file: {image.name}</p>}
                     </div>
        <input
          type="text"
          name="name"
          value={name}
          className="bannername"
          placeholder="Enter your Service Name"
          onChange={handleChange}
        />
        <button type="submit" className="add-button">Update</button>
      </form>
    </div>
  );
};

export default EditBanner;
