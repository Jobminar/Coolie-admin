import React from "react";
import "./servermanager.css"; // Ensure the CSS file is correctly linked

const AddServiceForm = () => {
  return (
    <div className="card add-service-form fixed-card scaled-form">
      <h3>Add Service</h3>
      <div className="form-group">
        <label>Service Name:</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Service Type:</label>
        <select>
          <option>Normal</option>
          <option>Deep</option>
          <option>Male</option>
          <option>Female</option>
          <option>Hour</option>
          <option>Daily</option>
          <option>Monthly</option>
        </select>
      </div>
      <div className="form-group">
        <label>Service Price:</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Total Service Time:</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea></textarea>
      </div>
      <div className="form-group">
        <label>Locations:</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Pincode:</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Latitude:</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Longitude:</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Radius (kms):</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>TAX %:</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Provider commission:</label>
        <input type="text" />
      </div>
      <div className="form-group toggle-group">
        <label>Add to most booked service</label>
        <label className="switch">
          <input type="checkbox" className="toggle-button" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="form-group">
        <label>TAG:</label>
        <div className="tag-container">
          <input type="text" />
          <span className="tag-icon">📈</span>
        </div>
      </div>
      <div className="form-group toggle-group">
        <label>Cash After Service</label>
        <label className="switch">
          <input type="checkbox" className="toggle-button" />
          <span className="slider round"></span>
        </label>
      </div>
      <button className="submit-button">Update</button>
    </div>
  );
};

export default AddServiceForm;
