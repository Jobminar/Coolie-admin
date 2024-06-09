import React, { useState } from "react";
import "./ProvidersCorner.css";

const ProvidersCorner = () => {
  const [visibleCategories, setVisibleCategories] = useState([
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Carpentry",
  ]);
  const [activeCategory, setActiveCategory] = useState(0);

  const allCategories = [
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Beauty & salon",
    "Labour supply",
    "Painting",
    "Gardening",
    "HVAC",
    "Pest Control",
    "Moving",
    "General Maintenance",
  ];

  const handlePrev = () => {
    setActiveCategory((prev) =>
      prev > 0 ? prev - 1 : allCategories.length - 1,
    );
    setVisibleCategories((prev) => [
      ...prev.slice(1),
      allCategories[
        (activeCategory + allCategories.length - 1) % allCategories.length
      ],
    ]);
  };

  const handleNext = () => {
    setActiveCategory((prev) => (prev + 1) % allCategories.length);
    setVisibleCategories((prev) => [
      allCategories[(activeCategory + 1) % allCategories.length],
      ...prev.slice(0, -1),
    ]);
  };

  return (
    <div className="providers-container">
      <h3>Service Providers Corner</h3>
      <div className="providers-sidebar">
        <button className="providers-arrow" onClick={handlePrev}>
          &lt;
        </button>
        <div className="providers-categories">
          {visibleCategories.map((category, index) => (
            <button
              key={index}
              className={`providers-category ${
                index === activeCategory ? "active" : ""
              }`}
              onClick={() => setActiveCategory(index)}
            >
              {category}
            </button>
          ))}
        </div>
        <button className="providers-arrow" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="providers-main-content">
        <div className="providers-toolbar">
          <button className="providers-btn active">Bird Eye View</button>
          <button className="providers-btn">Add a Provider</button>
          <button className="providers-btn">Authenticate</button>
          <button className="providers-btn">Manage Providers</button>
        </div>
        <div className="providers-table-container">
          <table className="providers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Provider name</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Join date</th>
                <th>Loyalty Points</th>
                <th>Package</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td>401</td>
                  <td>Varma</td>
                  <td>example@gmail.com</td>
                  <td>123456789</td>
                  <td>City XYZ</td>
                  <td>Jan 29, 2021</td>
                  <td>0</td>
                  <td>Basic</td>
                  <td>
                    <div
                      className={`status-toggle ${
                        index === 2 ? "inactive" : "active"
                      }`}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProvidersCorner;
