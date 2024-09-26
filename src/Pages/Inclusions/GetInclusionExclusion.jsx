import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip, Spin, Button } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import UpdateInclusionExclusion from "./UpdateInclusionExclusion";
import "./GetInclusionExclusion.css";

const GetInclusionExclusion = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });
  const [selectedService, setSelectedService] = useState("");
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [inclusionExclusionResponse, servicesResponse] =
          await Promise.all([
            axios.get(
              "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/inclusion-exclusion",
            ),
            axios.get(
              "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/services",
            ),
          ]);
        setData(inclusionExclusionResponse.data);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (selectedService) {
      sortableItems = sortableItems.filter(
        (item) => getNestedValue(item, "serviceId._id") === selectedService,
      );
    }
    sortableItems.sort((a, b) => {
      if (
        getNestedValue(a, sortConfig.key) < getNestedValue(b, sortConfig.key)
      ) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (
        getNestedValue(a, sortConfig.key) > getNestedValue(b, sortConfig.key)
      ) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [data, sortConfig, selectedService]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedItem(null);
  };

  const handleUpdate = (updatedItem) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === updatedItem._id ? updatedItem : item,
      ),
    );
    handleCloseEditPopup();
  };

  return (
    <div className="get-inclusion-exclusion-container">
      <div className="IEheader">
        <h2>Inclusions & Exclusions</h2>
        <select
          className="service-dropdown"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">All Services</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="ie-table-container">
          <table className="ie-table">
            <thead>
              <tr>
                {[
                  { label: "Title", key: "title" },
                  { label: "Banner Image", key: "" },
                  { label: "Feature Title", key: "featureTitle" },
                  { label: "Service Name", key: "serviceId.name" },
                  { label: "Description", key: "description" },
                  { label: "Items", key: "" },
                  { label: "Exclusions", key: "" },
                  { label: "Actions", key: "" },
                ].map((header) => (
                  <th
                    key={header.label}
                    onClick={() => header.key && requestSort(header.key)}
                    className={header.key ? "sortable" : ""}
                  >
                    {header.label}{" "}
                    {sortConfig.key === header.key &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUpOutlined />
                      ) : (
                        <ArrowDownOutlined />
                      ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Tooltip title={item.title}>
                      {item.title.length > 20
                        ? `${item.title.slice(0, 20)}...`
                        : item.title}
                    </Tooltip>
                  </td>
                  <td>
                    <img
                      src={item.bannerImage}
                      alt={item.title}
                      className="ie-banner-image"
                    />
                  </td>
                  <td>{item.featureTitle}</td>
                  <td>{getNestedValue(item, "serviceId.name") || "N/A"}</td>
                  <td>
                    <Tooltip title={item.description}>
                      {item.description.length > 30
                        ? `${item.description.slice(0, 30)}...`
                        : item.description}
                    </Tooltip>
                  </td>
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
                  <td>
                    <Button
                      type="link"
                      onClick={() => handleEditClick(item)}
                      className="edit-ie-button"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isEditPopupOpen && selectedItem && (
        <UpdateInclusionExclusion
          item={selectedItem}
          isOpen={isEditPopupOpen}
          onClose={handleCloseEditPopup}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default GetInclusionExclusion;
