import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Banners.css";

const Banners = () => {
  return (
    <div className="banners-container">
      <header className="banners-header">
        <h2>Banners</h2>
        <div className="banners-actions">
          <IconButton className="btn delete-btn">
            <DeleteIcon /> Delete
          </IconButton>
          <IconButton className="btn">
            <EditIcon />
          </IconButton>
        </div>
      </header>
      <div className="banners-grid">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="banners-row">
            <div className="banner">
              <img src="/path/to/cleaning-banner.jpg" alt="Cleaning Banner" />
              <div className="banner-overlay">
                <span>Cleaning Banner</span>
                <IconButton className="edit-icon">
                  <EditIcon />
                </IconButton>
              </div>
            </div>
            <div className="banner">
              <img src="/path/to/kitchen-banner.jpg" alt="Kitchen Banner" />
              <div className="banner-overlay">
                <span>Kitchen Banner</span>
                <IconButton className="edit-icon">
                  <EditIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;
