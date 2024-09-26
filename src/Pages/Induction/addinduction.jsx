import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ReactPlayer from "react-player";
import toast, { Toaster } from "react-hot-toast";
import "./induction.css";

function InductionForm() {
  const [formdata, setFormdata] = useState({
    profession: "",
    title: "",
    skip: false,
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { profession, title, skip, categoryId } = formdata;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/categories",
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (category) => category.name === e.target.value,
    );
    setFormdata({
      ...formdata,
      profession: e.target.value,
      categoryId: selectedCategory ? selectedCategory._id : "",
    });
  };

  const handleToggleChange = () => {
    setFormdata((prevState) => ({
      ...prevState,
      skip: !prevState.skip,
    }));
  };

  const handleButtonClick = () => {
    document.getElementById("hiddenFileInput").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file)); // Create a preview URL for the video
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("profession", profession);
    formData.append("title", title);
    formData.append("skip", skip);
    formData.append("categoryId", categoryId);
    formData.append("video", video);

    try {
      const response = await fetch(
        "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/induction",
        {
          method: "POST",
          body: formData,
        },
      );
      if (response.ok) {
        toast.success("Form submitted successfully!");
      } else {
        toast.error("Failed to submit the form.");
      }
    } catch (err) {
      toast.error("Error occurred while submitting the form.");
      console.log(err, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="IThead">Induction</h1>
      <form onSubmit={handleSubmit} className="induction-form">
        <div className="ITinputs">
          <Select
            label="Profession"
            name="profession"
            value={profession}
            onChange={handleCategoryChange}
            className="profession-select"
          >
            <MenuItem value="">Select a service</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.name}>
                {category.name}
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
            label="Title"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </div>

        <FormControlLabel
          control={
            <Checkbox
              checked={skip}
              onChange={handleToggleChange}
              name="skip"
              color="primary"
            />
          }
          label="Skip"
        />

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
            Upload Induction Video
          </button>
        </div>

        {videoPreview && (
          <div className="video-preview">
            <ReactPlayer url={videoPreview} controls width="100%" />
          </div>
        )}

        <div>
          <button
            type="submit"
            className="custom-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      <Toaster position="top-right" />
    </>
  );
}

export default InductionForm;
