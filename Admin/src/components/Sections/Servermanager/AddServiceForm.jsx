import React from "react";
import "./servermanager.css"; // Ensure the CSS file is correctly linked

const AddServiceForm = () => {
  return (
    <form className="add-service-form">
      <div className="form-group">
        <label>Service Name:</label>
        <input type="text" className="bottom-border-input" />
      </div>
      <div className="form-group">
        <label>Service Type:</label>
        <select className="bottom-border-input">
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
        <input type="text" className="bottom-border-input" />
      </div>
      <div className="form-group">
        <label>Total Service Time:</label>
        <input type="text" className="bottom-border-input" />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea className="bottom-border-input"></textarea>
      </div>
      <div className="form-group">
        <label>Locations:</label>
        <input type="text" className="bottom-border-input" />
      </div>
      <div className="form-group">
        <label>Latitude:</label>
        <input type="text" className="bottom-border-input" />
      </div>
      <div className="form-group">
        <label>Longitude:</label>
        <input type="text" className="bottom-border-input" />
      </div>
      <div className="form-group">
        <label>Radius:</label>
        <select className="bottom-border-input">
          {[...Array(50).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} km
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>TAX %:</label>
        <input type="text" className="bottom-border-input" />
      </div>
      <div className="form-group">
        <label>Provider commission:</label>
        <input type="text" className="bottom-border-input" />
      </div>
      <div className="form-group toggle-group">
        <label>Add to most booked service</label>
        <input type="checkbox" className="toggle-input" />
      </div>
      <div className="form-group toggle-group">
        <label>TAG</label>
        <input type="checkbox" className="toggle-input" />
      </div>
      <div className="form-group toggle-group">
        <label>Cash After Service</label>
        <input type="checkbox" className="toggle-input" />
      </div>
      <button type="submit" className="submit-button">
        Update
      </button>
    </form>
  );
};

export default AddServiceForm;
