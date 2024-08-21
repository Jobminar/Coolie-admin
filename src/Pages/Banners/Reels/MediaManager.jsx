import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS

const MediaManager = ({ media, handleDelete }) => {
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this media?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="reels-media-gallery">
      {media.length > 0 ? (
        media.map((item) => (
          <div key={item._id} className="reels-media-item">
            {item.image && <img src={item.image} alt="Media Thumbnail" />}
            {item.video && <video src={item.video} controls />}
            <button
              onClick={() => confirmDelete(item._id)}
              className="reels-delete-button"
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        ))
      ) : (
        <p>No media available.</p>
      )}
    </div>
  );
};

MediaManager.propTypes = {
  media: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default MediaManager;
