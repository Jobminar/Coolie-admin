import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import { FaPlus } from "react-icons/fa"; // Importing FaPlus icon
import "./Blogs.css";

const AddBlogs = ({ onAdd }) => {
  const [blogData, setBlogData] = useState({
    title: "",
    subject: "",
    text: "",
    image: null,
    video: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [formVisible, setFormVisible] = useState(false); // State for form visibility

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible); // Toggle the form visibility
  };

  const onDropImage = (acceptedFiles) => {
    const image = acceptedFiles[0];
    setBlogData({
      ...blogData,
      image: image,
    });
    setImagePreview(URL.createObjectURL(image));
  };

  const onDropVideo = (acceptedFiles) => {
    const video = acceptedFiles[0];
    setBlogData({
      ...blogData,
      video: video,
    });
    setVideoPreview(URL.createObjectURL(video));
  };

  const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } =
    useDropzone({
      accept: "image/*",
      onDrop: onDropImage,
    });

  const { getRootProps: getRootPropsVideo, getInputProps: getInputPropsVideo } =
    useDropzone({
      accept: "video/*",
      onDrop: onDropVideo,
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subject", blogData.subject);
    formData.append("text", blogData.text);
    if (blogData.image) {
      formData.append("image", blogData.image);
    }
    if (blogData.video) {
      formData.append("video", blogData.video);
    }

    try {
      const response = await fetch("${AZURE_BASE_URL}/v1.0/admin/blogs", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        console.log("Blog posted successfully:", result);
        onAdd(blogData); // Optionally trigger the parent update
        // Clear the form after success
        setBlogData({
          title: "",
          subject: "",
          text: "",
          image: null,
          video: null,
        });
        setImagePreview(null);
        setVideoPreview(null);
        setFormVisible(false); // Hide the form after successful submission
      } else {
        console.error("Error posting blog:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="tigress-blogs">
        <h4>Blogs</h4>
        <button onClick={toggleFormVisibility}>
          {formVisible ? "Hide Form" : "Add Blogs"}
        </button>
      </div>

      {formVisible && (
        <form className="tigress-form" onSubmit={handleSubmit}>
          <h2 className="tigress-form-title">Add a New Blog</h2>

          <div className="tigress-grid-wrapper">
            {/* Image Upload Section */}
            <div className="tigress-media-upload">
              <div {...getRootPropsImage()} className="tigress-dropzone">
                <input {...getInputPropsImage()} />
                <p>
                  <FaPlus /> Drag and drop an image, or click to select one
                </p>
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="tigress-preview-image"
                />
              )}

              <div {...getRootPropsVideo()} className="tigress-dropzone">
                <input {...getInputPropsVideo()} />
                <p>
                  <FaPlus /> Drag and drop a video, or click to select one
                </p>
              </div>
              {videoPreview && (
                <ReactPlayer
                  url={videoPreview}
                  controls={true}
                  width="100%"
                  height="200px"
                  className="tigress-preview-video"
                />
              )}
            </div>

            {/* Text Fields Section */}
            <div className="tigress-form-fields">
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="tigress-input"
                placeholder="Title"
                required
              />
              <input
                type="text"
                name="subject"
                value={blogData.subject}
                onChange={handleChange}
                className="tigress-input"
                placeholder="Subject"
                required
              />
              <textarea
                name="text"
                value={blogData.text}
                onChange={handleChange}
                className="tigress-textarea"
                placeholder="Description"
                required
              />
            </div>
          </div>

          <button className="tigress-btn-save" type="submit">
            Add Blog
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBlogs;
