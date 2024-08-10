import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import the plus and minus icons from FontAwesome
import "./AddInclusionExclusion.css"; // Separate CSS file for styling

const AddInclusionExclusion = () => {
  const [services, setServices] = useState(null);
  const [serviceId, setServiceId] = useState("");
  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [featureTitle, setFeatureTitle] = useState("");
  const [listOfItems, setListOfItems] = useState([
    { title: "", iconImage: null, exclusions: [""] },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.coolieno1.in/v1.0/core/services")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          setError("No services data available");
        }
      })
      .catch((error) => {
        setError("Failed to load services. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...listOfItems];
    newItems[index][field] = value;
    setListOfItems(newItems);
  };

  const handleExclusionChange = (itemIndex, exclusionIndex, value) => {
    const newItems = [...listOfItems];
    newItems[itemIndex].exclusions[exclusionIndex] = value;
    setListOfItems(newItems);
  };

  const addItem = () => {
    setListOfItems([
      ...listOfItems,
      { title: "", iconImage: null, exclusions: [""] },
    ]);
  };

  const removeItem = (index) => {
    const newItems = [...listOfItems];
    newItems.splice(index, 1);
    setListOfItems(newItems);
  };

  const addExclusion = (itemIndex) => {
    const newItems = [...listOfItems];
    newItems[itemIndex].exclusions.push("");
    setListOfItems(newItems);
  };

  const removeExclusion = (itemIndex, exclusionIndex) => {
    const newItems = [...listOfItems];
    newItems[itemIndex].exclusions.splice(exclusionIndex, 1);
    setListOfItems(newItems);
  };

  const handleFileChange = (index, field, event) => {
    const file = event.target.files[0];
    handleItemChange(index, field, file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("serviceId", serviceId);
    formData.append("title", title);
    formData.append("bannerImage", bannerImage);
    formData.append("featureTitle", featureTitle);

    // Format listOfItems as a JSON string
    const items = listOfItems.map((item) => ({
      title: item.title,
      iconImage: item.iconImage ? undefined : null, // Prepare a placeholder for iconImage
    }));

    formData.append("listOfItems", JSON.stringify(items));

    // Append each iconImage file separately with the correct key format
    listOfItems.forEach((item, index) => {
      if (item.iconImage) {
        formData.append(`listOfItems[${index}].iconImage`, item.iconImage);
      }
    });

    // Log the formData to the console
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    axios
      .post(
        "https://api.coolieno1.in/v1.0/core/inclusion-exclusion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((response) => {
        setSuccessMessage("Inclusion/Exclusion added successfully!");
        // Reset form
        setServiceId("");
        setTitle("");
        setBannerImage(null);
        setFeatureTitle("");
        setListOfItems([{ title: "", iconImage: null, exclusions: [""] }]);
      })
      .catch((error) => {
        setError("Error adding Inclusion/Exclusion. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="add-inclusion-container">
      <h2>Add Inclusion/Exclusion</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="add-inclusion-form" onSubmit={handleSubmit}>
        <div className="inclusion-form-group">
          <label htmlFor="service">Select Service:</label>
          <select
            id="service"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
          >
            <option value="">Select Service</option>
            {services?.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>
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
            type="file"
            id="bannerImage"
            onChange={(e) => setBannerImage(e.target.files[0])}
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

        {listOfItems.map((item, itemIndex) => (
          <div className="inclusion-item-group" key={itemIndex}>
            <div className="inclusion-item-header">
              <label htmlFor={`item-title-${itemIndex}`}>Item Title:</label>
              <input
                type="text"
                id={`item-title-${itemIndex}`}
                value={item.title}
                onChange={(e) =>
                  handleItemChange(itemIndex, "title", e.target.value)
                }
                required
              />

              <label htmlFor={`item-icon-${itemIndex}`}>Item Icon:</label>
              <input
                type="file"
                id={`item-icon-${itemIndex}`}
                onChange={(e) => handleFileChange(itemIndex, "iconImage", e)}
                required
              />
            </div>

            <div className="exclusions-container">
              {item.exclusions.map((exclusion, exclusionIndex) => (
                <div key={exclusionIndex} className="exclusion-card">
                  <label>Exclusion {exclusionIndex + 1}:</label>
                  <input
                    type="text"
                    value={exclusion}
                    onChange={(e) =>
                      handleExclusionChange(
                        itemIndex,
                        exclusionIndex,
                        e.target.value,
                      )
                    }
                    required
                  />
                  <div className="exclusion-controls">
                    {exclusionIndex === item.exclusions.length - 1 && (
                      <FaPlus
                        className="add-exclusion-icon"
                        onClick={() => addExclusion(itemIndex)}
                      />
                    )}
                    {item.exclusions.length > 1 && (
                      <FaMinus
                        className="remove-exclusion-icon"
                        onClick={() =>
                          removeExclusion(itemIndex, exclusionIndex)
                        }
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="remove-item-button"
              onClick={() => removeItem(itemIndex)}
            >
              Remove Item
            </button>
          </div>
        ))}

        <button
          type="button"
          className="add-inclusion-item-button"
          onClick={addItem}
        >
          Add Another Item
        </button>

        <button
          type="submit"
          className="add-inclusion-button"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddInclusionExclusion;
