import React from "react";
import "./servermanager.css"; // Ensure the CSS file is correctly linked

const AddServiceForm = () => {
  return (
    <form className="add-service-form">
      <h3>Add Service</h3>
      <div className="form-group">
        <label>Service Name:</label>
        <input type="text" className="bottom-border-input" />
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
        <textarea className="textarea-input"></textarea>
      </div>
      <div className="form-group">
        <label>Locations:</label>
        <input type="text" className="bottom-border-input" />
      </div>
      <div className="form-group">
        <label>City:</label>
        <input type="text" className="bottom-border-input" />
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
