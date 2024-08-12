import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GetInclusionExclusion.css";

const GetInclusionExclusion = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.coolieno1.in/v1.0/core/inclusion-exclusion")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Inclusion/Exclusion data:", error);
        setError("Failed to load data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  return (
    <div className="get-inclusion-exclusion-container">
      <div className="IEheader">
        <h2>Inclusions & Exclusions</h2>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {data.length > 0 ? (
        <table className="ie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Banner Image</th>
              <th>Feature Title</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Items</th>
              <th>Exclusions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>
                  <img
                    src={item.bannerImage}
                    alt={item.title}
                    className="ie-banner-image"
                  />
                </td>
                <td>{item.featureTitle}</td>
                <td>{item.serviceId ? item.serviceId.name : "N/A"}</td>
                <td>{item.description || "N/A"}</td>
                <td>
                  <ul>
                    {item.listOfItems.map((listItem, index) => (
                      <li key={index}>
                        {listItem.title}
                        {listItem.iconImage && (
                          <img
                            src={listItem.iconImage}
                            alt={listItem.title}
                            className="ie-item-image"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {item.exclusions.length > 0 ? (
                      item.exclusions.map((exclusion, exIndex) => (
                        <li key={exIndex}>{exclusion}</li>
                      ))
                    ) : (
                      <li>No Exclusions</li>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Inclusions/Exclusions found.</p>
      )}
    </div>
  );
};

export default GetInclusionExclusion;
