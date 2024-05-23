import React from "react";
import "./ProvidersCorner.css";

const ProvidersCorner = () => {
  return (
    <div className="container">
      <div className="main-content">
        <div className="content">
          <div className="toolbar">
            <button className="btn active">Bird Eye View</button>
            <button className="btn">Add a Provider</button>
            <button className="btn">Authenticate</button>
          </div>
          <div className="categories">
            <button className="category active">Cleaning</button>
            <button className="category">Plumbing</button>
            <button className="category">Electrical</button>
            <button className="category">Carpentry</button>
            <button className="category">Beauty & salon</button>
            <button className="category">Labour supply</button>
          </div>
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
  );
};

export default ProvidersCorner;
