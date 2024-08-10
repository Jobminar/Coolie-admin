import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddInclusionExclusion.css"; // Separate CSS file for styling

const AddInclusionExclusion = () => {
  const [services, setServices] = useState(null); // Initialize as null
  const [serviceId, setServiceId] = useState("");
  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [featureTitle, setFeatureTitle] = useState("");
  const [listOfItems, setListOfItems] = useState([
    { title: "", iconImage: "" },
  ]);
  const [error, setError] = useState(null); // To capture and display any errors

  useEffect(() => {
    // Fetch the list of services for the dropdown
    axios
      .get("/api/services")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          setServices([]);
          setError("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setError("Failed to load services");
        setServices([]);
      });
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...listOfItems];
    newItems[index][field] = value;
    setListOfItems(newItems);
  };

  const addItem = () => {
    setListOfItems([...listOfItems, { title: "", iconImage: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInclusionExclusion = {
      serviceId,
      title,
      bannerImage,
      featureTitle,
      listOfItems,
    };

    axios
      .post("/api/inclusion-exclusion", newInclusionExclusion)
      .then((response) => {
        console.log("Inclusion/Exclusion added:", response.data);
        // Reset form
        setServiceId("");
        setTitle("");
        setBannerImage("");
        setFeatureTitle("");
        setListOfItems([{ title: "", iconImage: "" }]);
      })
      .catch((error) =>
        console.error("Error adding Inclusion/Exclusion:", error),
      );
  };

  return (
    <div className="add-inclusion-container">
      <h2>Add Inclusion/Exclusion</h2>
      <form className="add-inclusion-form" onSubmit={handleSubmit}>
        <div className="inclusion-form-group">
          <label htmlFor="service">Select Service:</label>
          {error ? (
            <p className="error-message">{error}</p>
          ) : services === null ? (
            <p>Loading...</p>
          ) : services.length === 0 ? (
            <p>No data available</p>
          ) : (
            <select
              id="service"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              required
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="inclusion-form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="inclusion-form-group">
          <label htmlFor="bannerImage">Banner Image:</label>
          <input
            type="text"
            id="bannerImage"
            value={bannerImage}
            onChange={(e) => setBannerImage(e.target.value)}
            required
          />
        </div>

        <div className="inclusion-form-group">
          <label htmlFor="featureTitle">Feature Title:</label>
          <input
            type="text"
            id="featureTitle"
            value={featureTitle}
            onChange={(e) => setFeatureTitle(e.target.value)}
            required
          />
        </div>

        {listOfItems.map((item, index) => (
          <div className="inclusion-form-group" key={index}>
            <label htmlFor={`item-title-${index}`}>Item Title:</label>
            <input
              type="text"
              id={`item-title-${index}`}
              value={item.title}
              onChange={(e) => handleItemChange(index, "title", e.target.value)}
              required
            />

            <label htmlFor={`item-icon-${index}`}>Item Icon:</label>
            <input
              type="text"
              id={`item-icon-${index}`}
              value={item.iconImage}
              onChange={(e) =>
                handleItemChange(index, "iconImage", e.target.value)
              }
              required
            />
          </div>
        ))}

        <button
          type="button"
          className="add-inclusion-item-button"
          onClick={addItem}
        >
          Add Another Item
        </button>

        <button type="submit" className="add-inclusion-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddInclusionExclusion;
