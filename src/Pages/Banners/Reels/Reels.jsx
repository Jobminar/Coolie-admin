import React, { useState, useEffect } from "react";
import { uploadMedia, getMedia, deleteMedia } from "./services/videoService";
import toast, { Toaster } from "react-hot-toast";
import MediaManager from "./MediaManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Reels.css";

const Reels = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await getMedia();
      setMedia(data.filter((item) => item && (item.image || item.video)));
      toast.success("Media loaded successfully");
    } catch (error) {
      toast.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (type === "video") {
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
      } else if (type === "image") {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} selected successfully`,
      );
    } else {
      toast.error(`Please select a ${type} file.`);
    }
  };

  const handleSubmit = async () => {
    if (!videoFile || !imageFile) {
      toast.error("Please select both a video and an image.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("image", imageFile);

    try {
      toast.loading("Uploading media...");
      await uploadMedia(formData);
      toast.dismiss();
      toast.success("Media uploaded successfully");
      loadMedia();
      setVideoFile(null);
      setImageFile(null);
      setVideoPreview("");
      setImagePreview("");
    } catch (error) {
      toast.error("Failed to upload media");
    }
  };

  return (
    <div className="reels-container">
      <h3 className="reels-heading">Reels</h3>
      <div className="reels-upload-section">
        <div className="reels-card">
          <h4>Upload Video</h4>
          <label className="reels-file-upload-label">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, "video")}
              style={{ display: "none" }}
            />
            <FontAwesomeIcon icon={faUpload} /> Select Video
          </label>
          {videoPreview && (
            <div className="reels-preview">
              <h5>Video Preview:</h5>
              <video src={videoPreview} controls />
            </div>
          )}
        </div>

        <div className="reels-card">
          <h4>Upload Image</h4>
          <label className="reels-file-upload-label">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "image")}
              style={{ display: "none" }}
            />
            <FontAwesomeIcon icon={faUpload} /> Select Image
          </label>
          {imagePreview && (
            <div className="reels-preview">
              <h5>Image Preview:</h5>
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>
      </div>

      <button className="reels-submit-button" onClick={handleSubmit}>
        <FontAwesomeIcon icon={faCheck} /> Submit
      </button>

      <hr className="reels-divider" />

      <h3 className="reels-heading">Manage Reels</h3>
      {loading ? (
        <p>Loading media...</p>
      ) : (
        <div className="reels-media-scroll">
          <MediaManager media={media} handleDelete={deleteMedia} />
        </div>
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default Reels;
