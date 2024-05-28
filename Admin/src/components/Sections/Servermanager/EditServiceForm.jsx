import React, { useState } from "react";
import "./servermanager.css"; // Ensure the CSS file is correctly linked

const EditServiceForm = ({ service, onSave }) => {
  const [serviceName, setServiceName] = useState(service.name);
  const [serviceType, setServiceType] = useState(service.type);
  const [servicePrice, setServicePrice] = useState(service.price);
  const [serviceTime, setServiceTime] = useState(service.time);
  const [description, setDescription] = useState(service.description);
  const [locations, setLocations] = useState(service.locations);
  const [city, setCity] = useState(service.city);
  const [tax, setTax] = useState(service.tax);
  const [commission, setCommission] = useState(service.commission);
  const [mostBooked, setMostBooked] = useState(service.mostBooked);
  const [tag, setTag] = useState(service.tag);
  const [cashAfterService, setCashAfterService] = useState(
    service.cashAfterService,
  );

  const handleSave = () => {
    const updatedService = {
      name: serviceName,
      type: serviceType,
      price: servicePrice,
      time: serviceTime,
      description,
      locations,
      city,
      tax,
      commission,
      mostBooked,
      tag,
      cashAfterService,
    };
    onSave(updatedService);
  };

  return (
    <form className="add-service-form">
      <div className="form-group">
        <label>Service Name:</label>
        <input
          type="text"
          className="bottom-border-input"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Service Type:</label>
        <select
          className="bottom-border-input"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          <option value="Normal cleaning">Normal cleaning</option>
          <option value="Deep cleaning">Deep cleaning</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Hour">Hour</option>
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <div className="form-group">
        <label>Service Price:</label>
        <input
          type="text"
          className="bottom-border-input"
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Total Service Time:</label>
        <input
          type="text"
          className="bottom-border-input"
          value={serviceTime}
          onChange={(e) => setServiceTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="textarea-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Locations:</label>
        <input
          type="text"
          className="bottom-border-input"
          value={locations}
          onChange={(e) => setLocations(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>City:</label>
        <input
          type="text"
          className="bottom-border-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>TAX %:</label>
        <input
          type="text"
          className="bottom-border-input"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Provider commission:</label>
        <input
          type="text"
          className="bottom-border-input"
          value={commission}
          onChange={(e) => setCommission(e.target.value)}
        />
      </div>
      <div className="form-group toggle-group">
        <label>Add to most booked service</label>
        <input
          type="checkbox"
          className="toggle-input"
          checked={mostBooked}
          onChange={(e) => setMostBooked(e.target.checked)}
        />
      </div>
      <div className="form-group toggle-group">
        <label>TAG</label>
        <input
          type="checkbox"
          className="toggle-input"
          checked={tag}
          onChange={(e) => setTag(e.target.checked)}
        />
      </div>
      <div className="form-group toggle-group">
        <label>Cash After Service</label>
        <input
          type="checkbox"
          className="toggle-input"
          checked={cashAfterService}
          onChange={(e) => setCashAfterService(e.target.checked)}
        />
      </div>
      <button type="button" className="submit-button" onClick={handleSave}>
        Update
      </button>
    </form>
  );
};

export default EditServiceForm;
