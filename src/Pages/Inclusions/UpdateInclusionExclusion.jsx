import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Input, Alert, Form, Select, Upload } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import "./UpdateInclusionExclusion.css";

const { Option } = Select;
const { TextArea } = Input;

const UpdateInclusionExclusion = ({ item, isOpen, onClose, onUpdate }) => {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState(item.serviceId._id);
  const [title, setTitle] = useState(item.title);
  const [featureTitle, setFeatureTitle] = useState(item.featureTitle);
  const [description, setDescription] = useState(item.description);
  const [exclusions, setExclusions] = useState(item.exclusions || [""]);
  const [listOfItems, setListOfItems] = useState(
    item.listOfItems.map((i) => ({ title: i.title, iconImage: i.iconImage })),
  );
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(
    item.bannerImage,
  );
  const [itemImages, setItemImages] = useState([]);
  const [itemImagePreviews, setItemImagePreviews] = useState(
    item.listOfItems.map((i) => i.iconImage),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
      try {
        const response = await axios.get(
          `${AZURE_BASE_URL}/v1.0/core/services`,
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

  const handleBannerImageChange = ({ file }) => {
    setBannerImage(file);
    setBannerImagePreview(URL.createObjectURL(file));
  };

  const handleItemImageChange = (index, { file }) => {
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

  const handleSubmit = async () => {
    const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
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

    setLoading(true);
    try {
      const response = await axios.patch(
        `${AZURE_BASE_URL}/v1.0/core/inclusion-exclusion/${item._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      onUpdate(response.data);
      onClose();
    } catch (error) {
      setError("Failed to update Inclusion/Exclusion.");
      console.error("Error updating Inclusion/Exclusion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Inclusion/Exclusion"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} className="popup-cancel-button">
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
          className="popup-update-button"
        >
          {loading ? "Updating..." : "Update"}
        </Button>,
      ]}
      className="update-ie-modal"
    >
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="popup-error-alert"
        />
      )}
      <Form layout="vertical" className="popup-form-group">
        <Form.Item label="Select Service" required>
          <Select
            value={serviceId}
            onChange={setServiceId}
            placeholder="Select Service"
            className="popup-select"
          >
            {services.map((service) => (
              <Option key={service._id} value={service._id}>
                {service.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Title" required>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="popup-input"
          />
        </Form.Item>
        <Form.Item label="Feature Title" required>
          <Input
            value={featureTitle}
            onChange={(e) => setFeatureTitle(e.target.value)}
            placeholder="Enter feature title"
            className="popup-input"
          />
        </Form.Item>
        <Form.Item label="Description" required>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="popup-textarea"
            rows={5}
          />
        </Form.Item>
        <Form.Item label="Banner Image">
          <Upload
            listType="picture-card"
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleBannerImageChange}
            showUploadList={false}
            className="popup-upload"
          >
            {bannerImagePreview ? (
              <img
                src={bannerImagePreview}
                alt="Banner Preview"
                style={{ width: "100%" }}
              />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Exclusions">
          <div className="scrollable-content">
            {exclusions.map((exclusion, index) => (
              <div key={index} className="exclusion-card">
                <Input
                  value={exclusion}
                  onChange={(e) => handleExclusionChange(index, e)}
                  placeholder="Enter exclusion"
                  required
                />
                {exclusions.length > 1 && (
                  <Button
                    type="danger"
                    onClick={() => handleRemoveExclusion(index)}
                    className="remove-item-button"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="dashed"
            onClick={handleAddExclusion}
            className="add-inclusion-item-button"
          >
            <PlusOutlined /> Add Exclusion
          </Button>
        </Form.Item>
        <Form.Item label="List of Items">
          <div className="scrollable-content">
            {listOfItems.map((item, index) => (
              <div key={index} className="exclusion-card">
                <Input
                  name="title"
                  placeholder="Item Title"
                  value={item.title}
                  onChange={(e) => handleListItemChange(index, e)}
                  required
                />
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false} // Prevent automatic upload
                  onChange={(file) => handleItemImageChange(index, file)}
                  showUploadList={false}
                  className="popup-upload"
                >
                  {itemImagePreviews[index] ? (
                    <img
                      src={itemImagePreviews[index]}
                      alt={`Item ${index + 1} Preview`}
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
                {listOfItems.length > 1 && (
                  <Button
                    type="danger"
                    onClick={() => handleRemoveItem(index)}
                    className="remove-item-button"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="dashed"
            onClick={handleAddItem}
            className="add-inclusion-item-button"
          >
            <PlusOutlined /> Add Item
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateInclusionExclusion;
