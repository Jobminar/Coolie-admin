import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ThreeDots } from "react-loader-spinner";
import "./induction.css"; // Import custom CSS for styling

export default function ManageTraining() {
  const [trainingVideos, setTrainingVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bucketName = "coolie1-dev";
  const region = "ap-south-1";
  const baseUrl = `https://${bucketName}.s3.${region}.amazonaws.com/`;

  useEffect(() => {
    const fetchTrainingVideos = async () => {
      const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
      try {
        const response = await axios.get(
          `${AZURE_BASE_URL}/v1.0/admin/training`,
        );
        const videoData = response.data.map((video) => ({
          ...video,
          videoUrl: `${baseUrl}${video.videoKey}`,
        }));
        setTrainingVideos(videoData);
      } catch (error) {
        console.error("Error fetching training videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingVideos();
  }, []);

  const handleButtonClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? trainingVideos.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === trainingVideos.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleDeleteClick = (id) => {
    const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
    const updatedVideos = trainingVideos.filter((video) => video._id !== id);
    setTrainingVideos(updatedVideos);

    axios
      .delete(`${AZURE_BASE_URL}/v1.0/admin/training/${id}`)
      .then(() => {
        console.log("Video deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });
  };

  return (
    <div className="training-video-gallery">
      {loading ? (
        <div className="loader-container">
          <ThreeDots color="#00BFFF" height={100} width={100} />
          <p>Videos are loading, please wait...</p>
        </div>
      ) : (
        <div className="training-content">
          <div className="button-column">
            {trainingVideos.map((video, index) => (
              <button
                key={video._id}
                className={`video-button ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => handleButtonClick(index)}
              >
                {video.job}
              </button>
            ))}
          </div>

          <div className="carousel">
            <button className="carousel-control prev" onClick={handlePrevClick}>
              &lt;
            </button>
            <div className="carousel-inner">
              {trainingVideos.map((video, index) => (
                <div
                  key={video._id}
                  className={`carousel-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                >
                  <div className="video-wrapper">
                    <ReactPlayer
                      url={video.videoUrl}
                      controls
                      width="100%"
                      height="100%"
                      className="react-player"
                      onError={(e) => {
                        console.error("Error loading video:", e);
                        alert("There was an error loading this video.");
                      }}
                    />
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(video._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <p>{video.job}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control next" onClick={handleNextClick}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
