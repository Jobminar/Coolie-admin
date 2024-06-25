import React, { useState, useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";

const OurCoreServices = () => {
  const navigate = useNavigate();
  const [fetchService, setFetchService] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [coreservices, setcoreservices] = useState("");
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coolieno1.in/v1.0/admin/our-core-services",
        );
        if (!response.ok) {
          throw new Error("Error occurred");
        }
        const data = await response.json();
        setFetchService(data); // Fetch all services
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
        serviceName: selectedService.name || "",
        description: selectedService.description || "",
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
    data.append("serviceName", formData.serviceName);
    data.append("description", formData.description);
    data.append("image", image);

    // Debugging: Log FormData content
    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await fetch(
        "https://api.coolieno1.in/v1.0/admin/our-core-services",
        {
          method: "POST",
          body: data,
        },
      );

      // Detailed error handling
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to submit data: ${response.status} - ${response.statusText} - ${errorText}`,
        );
      }

      const result = await response.json();
      alert("Form Submitted");
      console.log("Success:", result);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    const fetchCoreServices = async () => {
      try {
        const response = await fetch(
          "https://api.coolieno1.in/v1.0/admin/our-core-services",
        );
        if (!response.ok) {
          throw new Error("Error while fetching the core services data");
        }
        const data = await response.json();
        setcoreservices(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
      }
    };

    fetchCoreServices();
  }, []);

  const handleEdit = (banner) => {
    console.log(banner, "editbanner");
    navigate("/editbanner", {
      state: { banner, apiEndpoint: "our-core-services" },
    });
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.log("ID not provided");
      return;
    }

    try {
      const response = await fetch(
        `https://api.coolieno1.in/v1.0/admin/our-core-services/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        alert("Deleted successfully");
        setcoreservices((prevData) =>
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
      <h1>Our Core Services</h1>
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

      <div className="core-services-form">
        {selectedService && selectedService.name ? (
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
                Upload Banner image
              </button>
              {image && <p>Selected file: {image.name}</p>}
            </div>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <p>Please select a service to see details.</p>
        )}
      </div>

      <div className="main-banners">
        <div className="banner-con">
          {Array.isArray(coreservices) &&
            coreservices.map((banner) => (
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

export default OurCoreServices;
