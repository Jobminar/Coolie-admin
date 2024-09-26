import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ThreeDots } from "react-loader-spinner";
import "./induction.css"; // Import custom CSS for styling

export default function ManageInduction() {
  const [inductionVideos, setInductionVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bucketName = "coolie1-dev";
  const region = "ap-south-1";
  const baseUrl = `https://${bucketName}.s3.${region}.amazonaws.com/`;

  useEffect(() => {
    const fetchInductionVideos = async () => {
      try {
        const response = await axios.get(
          "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/induction",
        );
        const videoData = response.data.map((video) => ({
          ...video,
          videoUrl: `${baseUrl}${video.videoKey}`,
        }));
        setInductionVideos(videoData);
      } catch (error) {
        console.error("Error fetching induction videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInductionVideos();
  }, []);

  const handleButtonClick = (index) => {
    setCurrentIndex(index);
  };

  const handleDeleteClick = (id) => {
    const updatedVideos = inductionVideos.filter((video) => video._id !== id);
    setInductionVideos(updatedVideos);

    axios
      .delete(
        `https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/induction/${id}`,
      )
      .then(() => {
        console.log("Video deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });
  };

  return (
    <div className="induction-video-gallery">
      {loading ? (
        <div className="loader-container">
          <ThreeDots color="#00BFFF" height={100} width={100} />
          <p>Your videos are loading, please wait...</p>
        </div>
      ) : (
        <div className="induction-content">
          <div className="button-column">
            {inductionVideos.map((video, index) => (
              <button
                key={video._id}
                className={`video-button ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => handleButtonClick(index)}
              >
                {video.profession}
              </button>
            ))}
          </div>

          <div className="carousel">
            <div className="carousel-inner">
              {inductionVideos.map((video, index) => (
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
                    <p>{video.profession}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
