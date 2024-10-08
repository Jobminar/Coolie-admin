// Providerbanners.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";

const Providerbanners = () => {
  const [name, setBannername] = useState("");
  const [image, setBannerimg] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
    axios
      .get(`${AZURE_BASE_URL}/v1.0/admin/provider-banners`)
      .then((response) => setData(response.data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChange = (e) => {
    setBannername(e.target.value);
  };

  const handleFileChange = (e) => {
    setBannerimg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
    e.preventDefault();
    console.log(name, "name", image, "image");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const response = await fetch(
        `${AZURE_BASE_URL}/v1.0/admin/provider-banners`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (response.ok) {
        alert("Banner added successfully");
        const newBanner = await response.json();
        setData((prevData) => [...prevData, newBanner]);
      } else {
        alert("Error: Failed to add data.");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleDelete = async (id) => {
    const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
    if (!id) {
      console.log("ID not provided");
      return;
    }

    try {
      const response = await fetch(
        `${AZURE_BASE_URL}/v1.0/admin/provider-banners/banners/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        alert("Deleted successfully");
        setData((prevData) => prevData.filter((banner) => banner._id !== id));
      } else {
        alert("Error: Failed to delete banner.");
      }
    } catch (err) {
      console.error("Error", err);
      alert("An error occurred while deleting");
    }
  };

  const handleEdit = (banner) => {
    navigate("/edit-banner", {
      state: { banner, apiEndpoint: "provider-banners" },
    });
  };

  const toggleFormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    document.getElementById("hiddenFileInput").click();
  };

  return (
    <>
      <div className="banners">
        <h1>Provider Banners</h1>
        <button onClick={toggleFormVisibility}>Add banners</button>
      </div>
      {showForm && (
        <div className="add-banner-form">
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="add-button">
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="banner-con">
        {data.map((banner) => (
          <div className="banner-sub-con" key={banner._id}>
            <img
              src={`https://coolie1-dev.s3.ap-south-1.amazonaws.com/${banner.image}`}
              alt={banner.name}
            />
            <p className="title">{banner.name}</p>
            <div className="edit-button" onClick={() => handleEdit(banner)}>
              <EditOutlinedIcon />
            </div>
            <div
              className="delete-button"
              onClick={() => handleDelete(banner._id)}
            >
              <DeleteOutlineOutlinedIcon />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Providerbanners;
