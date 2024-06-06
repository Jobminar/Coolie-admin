import React from "react";
import "./ProvidersCorner.css";

const ProvidersCorner = () => {
  return (
    <div className="providers-container">
      <div className="providers-main-content">
        <div className="providers-content">
          <div className="providers-toolbar">
            <button className="providers-btn active">Bird Eye View</button>
            <button className="providers-btn">Add a Provider</button>
            <button className="providers-btn">Authenticate</button>
          </div>
          <div className="providers-categories">
            <button className="providers-category active">Cleaning</button>
            <button className="providers-category">Plumbing</button>
            <button className="providers-category">Electrical</button>
            <button className="providers-category">Carpentry</button>
            <button className="providers-category">Beauty & salon</button>
            <button className="providers-category">Labour supply</button>
          </div>
          <div className="providers-table-container">
            <table className="providers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Provider name</th>
                  <th>Email Address</th>
                  <th>Phone</th>
                  <th>Join date</th>
                  <th>Loyalty Points</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td>401</td>
                    <td>Varma</td>
                    <td>Example@gmail.com</td>
                    <td>123456789</td>
                    <td>Jan 29, 2021</td>
                    <td>0</td>
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
    </div>
  );
};

export default ProvidersCorner;
