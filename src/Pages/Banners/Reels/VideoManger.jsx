import React, { useState } from "react";

const VideoManager = () => {
  const [videos, setVideos] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideos([...videos, { src: url, type: file.type, title: file.name }]);
    }
  };

  return (
    <div className="video-manager">
      <h2>Upload and Manage Videos</h2>
      <label className="custom-file-upload">
        <input type="file" accept="video/*" onChange={handleFileUpload} />
        Choose Video
      </label>

      <div className="media-gallery">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="video-item">
              <video controls preload="auto" width="320" height="240">
                <source src={video.src} type={video.type} />
                Your browser does not support the video tag.
              </video>
              <p>{video.title}</p>
            </div>
          ))
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default VideoManager;
