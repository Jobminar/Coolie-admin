// Userbanners.js
// Similar to Providerbanners, but with the appropriate API endpoint
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";

const Popupbanners = () => {
  const [name, setBannername] = useState("");
  const [image, setBannerimg] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://13.126.118.3:3000/v1.0/admin/user-banners")
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
    e.preventDefault();
    console.log(name, 'name', image, 'image');
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const response = await fetch(
        "http://13.126.118.3:3000/v1.0/admin/user-banners",
        {
          method: "POST",
          body: formData,
        }
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
    if (!id) {
      console.log("ID not provided");
      return;
    }

    try {
      const response = await fetch(`http://13.126.118.3:3000/v1.0/admin/user-banners/banners/${id}`, {
        method: "DELETE",
      });

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
    navigate("/editbanner", { state: { banner, apiEndpoint: 'user-banners' } });
  };

  const toggleFormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <>
      <div className="banners">
        <h1>Pop-up Banners</h1>
        <button onClick={toggleFormVisibility}>Add banners</button>
      </div>
      {showForm && (
        <div className="add-banner-form">
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              name="image"
              className="bannerimg"
              placeholder="Upload your banner"
              onChange={handleFileChange}
            />
            <input
              type="text"
              name="name"
              value={name}
              className="bannername"
              placeholder="Enter your Service Name"
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      <div className="main-banners">
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
      </div>
    </>
  );
};

export default Popupbanners;
