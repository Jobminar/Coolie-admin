import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddInclusionExclusion.css";

const AddInclusionExclusion = ({ onClose, onDataAdded }) => {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [title, setTitle] = useState("");
  const [featureTitle, setFeatureTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exclusions, setExclusions] = useState([""]);
  const [listOfItems, setListOfItems] = useState([{ title: "" }]);
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [itemImages, setItemImages] = useState([]);
  const [itemImagePreviews, setItemImagePreviews] = useState([]);
  const [error, setError] = useState(null);

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://api.coolieno1.in/v1.0/core/services",
        );
        setServices(response.data);
      } catch (error) {
        setError("Failed to load services. Please try again later.");
      }
    };

    fetchServices();
  }, []);

  const handleListItemChange = (index, event) => {
    const newItems = [...listOfItems];
    newItems[index][event.target.name] = event.target.value;
    setListOfItems(newItems);
  };

  const handleAddItem = () => {
    setListOfItems([...listOfItems, { title: "" }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...listOfItems];
    newItems.splice(index, 1);
    setListOfItems(newItems);

    const newPreviews = [...itemImagePreviews];
    newPreviews.splice(index, 1);
    setItemImagePreviews(newPreviews);

    const newFiles = [...itemImages];
    newFiles.splice(index, 1);
    setItemImages(newFiles);
  };

  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    setBannerImage(file);
    setBannerImagePreview(URL.createObjectURL(file));
  };

  const handleItemImageChange = (index, event) => {
    const file = event.target.files[0];
    const newFiles = [...itemImages];
    newFiles[index] = file;
    setItemImages(newFiles);

    const newPreviews = [...itemImagePreviews];
    newPreviews[index] = URL.createObjectURL(file);
    setItemImagePreviews(newPreviews);
  };

  const handleExclusionChange = (index, event) => {
    const newExclusions = [...exclusions];
    newExclusions[index] = event.target.value;
    setExclusions(newExclusions);
  };

  const handleAddExclusion = () => {
    setExclusions([...exclusions, ""]);
  };

  const handleRemoveExclusion = (index) => {
    const newExclusions = [...exclusions];
    newExclusions.splice(index, 1);
    setExclusions(newExclusions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("serviceId", serviceId);
    formData.append("title", title);
    formData.append("featureTitle", featureTitle);
    formData.append("description", description);
    formData.append("exclusions", JSON.stringify(exclusions));
    formData.append("listOfItems", JSON.stringify(listOfItems));

    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }

    itemImages.forEach((file) => {
      formData.append("listOfItems", file);
    });

    try {
      const response = await axios.post(
        "https://api.coolieno1.in/v1.0/core/inclusion-exclusion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      toast.success("Inclusion/Exclusion added successfully!");
      setServiceId("");
      setTitle("");
      setFeatureTitle("");
      setDescription("");
      setExclusions([""]);
      setListOfItems([{ title: "" }]);
      setBannerImage(null);
      setBannerImagePreview(null);
      setItemImages([]);
      setItemImagePreviews([]);
      onDataAdded();
    } catch (error) {
      setError("Error adding Inclusion/Exclusion. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-inclusion-container">
      <h2>Add Inclusion/Exclusion</h2>
      <form className="add-inclusion-form" onSubmit={handleSubmit}>
        <div className="inclusion-form-group">
          <label htmlFor="service">Select Service</label>
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
        </div>

        <div className="inclusion-form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="inclusion-form-group">
          <label htmlFor="featureTitle">Feature Title</label>
          <input
            type="text"
            id="featureTitle"
            value={featureTitle}
            onChange={(e) => setFeatureTitle(e.target.value)}
            required
          />
        </div>

        <div className="inclusion-form-group description-container">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="inclusion-form-group">
          <label>Exclusions</label>
          <div className="scrollable-content">
            {exclusions.map((exclusion, index) => (
              <div key={index} className="exclusion-card">
                <input
                  type="text"
                  value={exclusion}
                  onChange={(e) => handleExclusionChange(index, e)}
                  required
                />
                {exclusions.length > 1 && (
                  <button
                    type="button"
                    className="remove-item-button"
                    onClick={() => handleRemoveExclusion(index)}
                  >
                    Remove Exclusion
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="add-inclusion-item-button"
            onClick={handleAddExclusion}
          >
            Add Exclusion
          </button>
        </div>

        <div className="inclusion-form-group">
          <label htmlFor="bannerImage">Banner Image</label>
          <input
            type="file"
            id="bannerImage"
            onChange={handleBannerImageChange}
            required
          />
          {bannerImagePreview && (
            <img
              src={bannerImagePreview}
              alt="Banner Preview"
              style={{ marginTop: "10px", maxHeight: "200px" }}
            />
          )}
        </div>

        <div className="inclusion-form-group">
          <label>List of Items</label>
          <div className="scrollable-content">
            {listOfItems.map((item, index) => (
              <div key={index} className="exclusion-card">
                <input
                  type="text"
                  name="title"
                  placeholder="Item Title"
                  value={item.title}
                  onChange={(e) => handleListItemChange(index, e)}
                  required
                />
                <input
                  type="file"
                  onChange={(e) => handleItemImageChange(index, e)}
                  required
                />
                {itemImagePreviews[index] && (
                  <img
                    src={itemImagePreviews[index]}
                    alt={`Item ${index + 1} Preview`}
                    style={{ marginTop: "10px", maxHeight: "100px" }}
                  />
                )}
                {listOfItems.length > 1 && (
                  <button
                    type="button"
                    className="remove-item-button"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove Item
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="add-inclusion-item-button"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>

        <button type="submit" className="add-inclusion-button">
          Submit
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddInclusionExclusion;
