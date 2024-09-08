import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa"; // For edit icons
import "./Pricing.css"; // Import the relevant styles

const Pricing = ({ tierName, group }) => {
  const [locationsData, setLocationsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPriceOption, setSelectedPriceOption] = useState("");
  const [priceDetails, setPriceDetails] = useState({});

  // Editable states for price, min, max, etc.
  const [isEditable, setIsEditable] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [metric, setMetric] = useState("");
  const [creditEligibility, setCreditEligibility] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [miscFee, setMiscFee] = useState("");
  const [platformCommission, setPlatformCommission] = useState(0);
  const [isCash, setIsCash] = useState(false);

  // Prefilled state for tier name
  const [tierNameEditable, setTierNameEditable] = useState(tierName);
  const [isTierNameEditable, setIsTierNameEditable] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `https://api.coolieno1.in/v1.0/core/locations`,
        );
        const filteredData = response.data.filter(
          (item) => item.tierName === tierName && item.group === group,
        );
        setLocationsData(filteredData);
      } catch (error) {
        console.error("Failed to fetch locations data:", error);
      }
    };

    fetchLocations();
  }, [tierName, group]);

  const handleUpdatePricing = async () => {
    try {
      const updatedData = {
        service: selectedService,
        min,
        max,
        metric,
        creditEligibility,
        taxPercentage,
        miscFee,
        platformCommission,
        isCash,
        priceDetails,
      };

      await axios.post(
        `https://api.coolieno1.in/v1.0/core/pricing/update`,
        updatedData,
      );

      alert("Pricing updated successfully!");
    } catch (error) {
      console.error("Failed to update pricing:", error);
      alert("Failed to update pricing.");
    }
  };

  const handleEditPricingClick = () => {
    setIsEditable(!isEditable);
  };

  const handleEditTierNameClick = () => {
    setIsTierNameEditable(!isTierNameEditable);
  };

  const handleToggleCreditEligibility = () => {
    setCreditEligibility(!creditEligibility);
  };

  const handleToggleCash = () => {
    setIsCash(!isCash);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);

    const currentItem = locationsData.find(
      (item) =>
        item.servicename === service &&
        item.subcategory === selectedSubcategory,
    );

    if (currentItem) {
      setPriceDetails(currentItem.price || {});
      setMin(currentItem.min || "");
      setMax(currentItem.max || "");
      setMetric(currentItem.metric || "");
      setCreditEligibility(currentItem.creditEligibility || false);
      setTaxPercentage(currentItem.taxPercentage || 0);
      setMiscFee(currentItem.miscFee || "");
      setPlatformCommission(currentItem.platformCommission || 0);
      setIsCash(currentItem.isCash || false);
    }
  };

  const renderCategories = () => {
    const uniqueCategories = [
      ...new Set(locationsData.map((item) => item.category)),
    ];

    return (
      <div className="pricing-categories-group">
        {uniqueCategories.map((category, index) => (
          <div
            key={index}
            className={`pricing-checklist-item ${
              selectedCategory === category ? "selected-category" : ""
            }`}
          >
            <input
              type="radio"
              checked={selectedCategory === category}
              onChange={() => {
                setSelectedCategory(category);
                setSelectedSubcategory(null);
                setSelectedService(null);
              }}
            />
            <label>{category}</label>
          </div>
        ))}
      </div>
    );
  };

  const renderSubcategories = () => {
    const categoryItems = locationsData.filter(
      (item) => item.category === selectedCategory,
    );

    const uniqueSubcategories = [
      ...new Set(categoryItems.map((item) => item.subcategory)),
    ];

    return (
      <div className="pricing-subcategories-group">
        {uniqueSubcategories.map((subcategory, index) => (
          <div
            key={index}
            className={`pricing-checklist-item ${
              selectedSubcategory === subcategory ? "selected-subcategory" : ""
            }`}
          >
            <input
              type="radio"
              checked={selectedSubcategory === subcategory}
              onChange={() => {
                setSelectedSubcategory(subcategory);
                setSelectedService(null);
              }}
            />
            <label>{subcategory}</label>
          </div>
        ))}
      </div>
    );
  };

  const renderServices = () => {
    const subcategoryItems = locationsData.filter(
      (item) => item.subcategory === selectedSubcategory,
    );

    const uniqueServices = [
      ...new Set(subcategoryItems.map((item) => item.servicename)),
    ];

    return (
      <div className="pricing-services-group">
        {uniqueServices.map((service, index) => (
          <div
            key={index}
            className={`pricing-checklist-item ${
              selectedService === service ? "selected-service" : ""
            }`}
          >
            <input
              type="radio"
              checked={selectedService === service}
              onChange={() => handleServiceSelect(service)}
            />
            <label>{service}</label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pricing-container">
      <div className="pricing-tier-name-container">
        <h2>
          {isTierNameEditable ? (
            <input
              type="text"
              value={tierNameEditable}
              onChange={(e) => setTierNameEditable(e.target.value)}
            />
          ) : (
            tierNameEditable
          )}
          <FaEdit
            className="pricing-edit-icon"
            onClick={handleEditTierNameClick}
          />
        </h2>
      </div>

      <div className="pricing-sections-container">
        <div className="pricing-categories-column">
          <h4>Categories</h4>
          {renderCategories()}
        </div>
        {selectedCategory && (
          <div className="pricing-subcategories-column">
            <h4>Sub-categories</h4>
            {renderSubcategories()}
          </div>
        )}
        {selectedSubcategory && (
          <div className="pricing-services-column">
            <h4>Services</h4>
            {renderServices()}
          </div>
        )}
      </div>

      {selectedService && (
        <div className="pricing-card">
          <div className="pricing-card-header">
            <h4>Pricing Details for {selectedService}</h4>
            <FaEdit
              className="pricing-edit-icon"
              onClick={handleEditPricingClick}
              style={{ cursor: "pointer" }}
            />
          </div>

          <select
            value={selectedPriceOption || ""}
            onChange={(e) => setSelectedPriceOption(e.target.value)}
          >
            <option value="">Select Pricing Option</option>
            {Object.keys(priceDetails).map((priceOption) => (
              <option key={priceOption} value={priceOption}>
                {priceOption} ({priceDetails[priceOption]})
              </option>
            ))}
          </select>

          {selectedPriceOption && (
            <div className="pricing-field-container">
              <label>Price for {selectedPriceOption}:</label>
              {isEditable ? (
                <input
                  type="text"
                  value={priceDetails[selectedPriceOption] || ""}
                  onChange={(e) =>
                    setPriceDetails({
                      ...priceDetails,
                      [selectedPriceOption]: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{priceDetails[selectedPriceOption] || "N/A"}</p>
              )}
            </div>
          )}

          <div className="pricing-details">
            <div className="pricing-field-container">
              <label>Min:</label>
              {isEditable ? (
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              ) : (
                <p>{min || "N/A"}</p>
              )}
            </div>

            <div className="pricing-field-container">
              <label>Max:</label>
              {isEditable ? (
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              ) : (
                <p>{max || "N/A"}</p>
              )}
            </div>

            <div className="pricing-field-container">
              <label>Metrics:</label>
              {isEditable ? (
                <input
                  type="text"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                />
              ) : (
                <p>{metric || "N/A"}</p>
              )}
            </div>

            <div className="pricing-field-container">
              <label>Tax Percentage:</label>
              {isEditable ? (
                <input
                  type="number"
                  value={taxPercentage}
                  onChange={(e) => setTaxPercentage(e.target.value)}
                />
              ) : (
                <p>{taxPercentage || "N/A"}</p>
              )}
            </div>

            <div className="pricing-field-container">
              <label>Misc Fee:</label>
              {isEditable ? (
                <input
                  type="number"
                  value={miscFee}
                  onChange={(e) => setMiscFee(e.target.value)}
                />
              ) : (
                <p>{miscFee || "N/A"}</p>
              )}
            </div>

            <div className="pricing-field-container">
              <label>Platform Commission:</label>
              {isEditable ? (
                <input
                  type="number"
                  value={platformCommission}
                  onChange={(e) => setPlatformCommission(e.target.value)}
                />
              ) : (
                <p>{platformCommission || "N/A"}</p>
              )}
            </div>

            <div className="pricing-field-container toggle-container">
              <label>Credit Eligibility:</label>
              <div className="pricing-toggle-switch">
                <label className="pricing-switch">
                  <input
                    type="checkbox"
                    checked={creditEligibility}
                    onChange={handleToggleCreditEligibility}
                  />
                  <span className="pricing-slider round"></span>
                </label>
              </div>
            </div>

            <div className="pricing-field-container toggle-container">
              <label>Cash After Service:</label>
              <div className="pricing-toggle-switch">
                <label className="pricing-switch">
                  <input
                    type="checkbox"
                    checked={isCash}
                    onChange={handleToggleCash}
                  />
                  <span className="pricing-slider round"></span>
                </label>
              </div>
            </div>

            <button
              className="pricing-update-button"
              style={{ marginTop: "10px" }}
              onClick={handleUpdatePricing}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
