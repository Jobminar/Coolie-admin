import React, { useState, useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import "./banners.css";

const Mostbookedservices = () => {
  const navigate = useNavigate(2);
  const [fetchService, setFetchService] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [mostBookedData, setMostBookedData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    id: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/services",
        );
        if (!response.ok) {
          throw new Error("Error occurred");
        }
        const data = await response.json();
        const filteredServices = data.filter((service) => service.isMostBooked);
        setFetchService(filteredServices);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    const serviceId = event.target.value;
    setSelectedServiceId(serviceId);
    const selected =
      fetchService.find((service) => service._id === serviceId) || null;
    setSelectedService(selected);
  };

  useEffect(() => {
    if (selectedService) {
      setFormData({
        name: selectedService.name || "",
        price:
          selectedService.serviceVariants &&
          selectedService.serviceVariants.length > 0
            ? selectedService.serviceVariants[0].price
            : "",
        id: selectedService._id || "",
      });
    }
  }, [selectedService]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById("hiddenFileInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("image", image);
    data.append("serviceId", formData.id);

    try {
      const response = await fetch(
        "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/most-booked",
        {
          method: "POST",
          body: data,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      alert("Form Submitted");
      console.log("Success:", result);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    const fetchMostBooked = async () => {
      try {
        const response = await fetch(
          "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/most-booked",
        );
        if (!response.ok) {
          throw new Error("Error while getting the most booked data");
        }
        const data = await response.json();
        setMostBookedData(data);
      } catch (err) {
        console.error(
          "Error while fetching the most booked services:",
          err.message,
        );
      }
    };
    fetchMostBooked();
  }, []);

  const handleEdit = (banner) => {
    navigate("/editbanner", { state: { banner, apiEndpoint: "most-booked" } });
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.log("ID not provided");
      return;
    }

    try {
      const response = await fetch(
        `https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/most-booked/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        alert("Deleted successfully");
        setMostBookedData((prevData) =>
          prevData.filter((banner) => banner._id !== id),
        );
      } else {
        alert("Error: Failed to delete banner.");
      }
    } catch (err) {
      console.error("Error", err);
      alert("An error occurred while deleting");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="select-option">
        {fetchService.length > 0 ? (
          <select value={selectedServiceId} onChange={handleSelectChange}>
            <option value="">Select a service</option>
            {fetchService.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>
        ) : (
          <p>No services found.</p>
        )}

        <div className="mostbookedform">
          {selectedService && selectedService.name ? (
            <form onSubmit={handleSubmit}>
              <div className="most-booked-form">
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
                  Upload Banner image
                </button>
                {image && <p>Selected file: {image.name}</p>}
              </div>
              <button type="submit" className="most-button">
                Submit
              </button>
            </form>
          ) : (
            <p>Please select a service to see details.</p>
          )}
        </div>

        <div className="getmbs-con">
          {mostBookedData.length > 0 ? (
            mostBookedData.map((item, index) => <div key={index}></div>)
          ) : (
            <p>No most booked services found.</p>
          )}
        </div>
      </div>
      <div className="main-banners">
        <div className="banner-con">
          {mostBookedData.map((banner) => (
            <div className="banner-sub-con" key={banner._id}>
              <img src={banner.image} alt={banner.name} />
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

export default Mostbookedservices;
