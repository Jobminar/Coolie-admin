import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ReactPlayer from "react-player";
import toast, { Toaster } from "react-hot-toast";
import "./induction.css";

const AddTraining = () => {
  const [formData, setFormData] = useState({
    job: "", // This will hold the service.name
    title: "",
    skip: false,
    quickLinks: false,
  });
  const { job, title, skip, quickLinks } = formData;

  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/services",
        );
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    const selectedService = services.find(
      (service) => service.name === e.target.value,
    );
    setFormData({
      ...formData,
      job: selectedService ? selectedService.name : "",
    });
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file)); // Create a preview URL for the video
  };

  const handleButtonClick = () => {
    document.getElementById("hiddenFileInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append(
      "serviceId",
      services.find((service) => service.name === job)._id,
    );
    submitData.append("quickLinks", quickLinks);
    submitData.append("skip", skip);
    submitData.append("job", job);
    submitData.append("title", title);
    submitData.append("video", video);

    const toastId = toast.loading("Submitting form...");

    try {
      const response = await fetch(
        "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/training",
        {
          method: "POST",
          body: submitData,
        },
      );
      if (response.ok) {
        toast.success("Form submitted successfully!", { id: toastId });
      } else {
        toast.error("Failed to submit the form", { id: toastId });
      }
    } catch (err) {
      toast.error("An error occurred while submitting the form", {
        id: toastId,
      });
      console.log(err, "error");
    }
  };

  return (
    <>
      <h1 className="IThead">Training</h1>
      <form onSubmit={handleSubmit} className="induction-form">
        <div className="ITinputs">
          <Select
            className="dropdown"
            name="job"
            value={job}
            onChange={handleServiceChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">
              <em>Select a service</em>
            </MenuItem>
            {services.map((service) => (
              <MenuItem key={service._id} value={service.name}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="ITinputs">
          <TextField
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Title"
            label="Title"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="ITinputs">
          <FormControlLabel
            control={
              <Checkbox
                name="skip"
                checked={skip}
                onChange={handleToggleChange}
              />
            }
            label="Skip"
          />
        </div>
        <div className="ITinputs">
          <FormControlLabel
            control={
              <Checkbox
                name="quickLinks"
                checked={quickLinks}
                onChange={handleToggleChange}
              />
            }
            label="Quick links"
          />
        </div>

        <div className="ITinputs">
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
            Upload Training Video
          </button>
        </div>

        {videoPreview && (
          <div className="video-preview">
            <ReactPlayer url={videoPreview} controls width="100%" />
          </div>
        )}

        <div className="ITinputs">
          <button type="submit" className="custom-button">
            Submit
          </button>
        </div>
      </form>
      <Toaster position="top-right" />
    </>
  );
};

export default AddTraining;
