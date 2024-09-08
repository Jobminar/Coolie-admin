import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListofCategories.css"; // Import the updated styles

const ListofCategories = ({ tierName, group }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Track selected subcategory
  const [priceOptions, setPriceOptions] = useState([]); // Track price options
  const [activePriceOption, setActivePriceOption] = useState("none"); // Track active price option, default to "none"
  const [hasError, setHasError] = useState(false); // Track if there is an error

  useEffect(() => {
    // Fetch categories, subcategories, and services based on group (default/custom) and tierName
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://api.coolieno1.in/v1.0/core/locations/group/${group}`,
        );
        // Filter data by tierName and extract relevant information
        const filteredData = response.data.filter(
          (item) => item.tierName === tierName,
        );
        if (filteredData.length === 0) {
          setHasError(true); // Set error state if no data is found
        } else {
          setCategoriesData(filteredData);

          // Extract the price options from the price object
          const allPrices = filteredData.flatMap((item) =>
            Object.keys(item.price || {}),
          );
          const uniquePriceOptions = [...new Set(["none", ...allPrices])]; // Add "none" as the first option
          setPriceOptions(uniquePriceOptions); // Set the unique price options
          setActivePriceOption(uniquePriceOptions[0]); // Set the first price option as active
          setHasError(false); // Reset error state if data is successfully fetched
        }
      } catch (error) {
        console.error("Failed to fetch categories data:", error);
        setHasError(true); // Set error state on API failure
      }
    };

    fetchCategories();
  }, [tierName, group]);

  // Helper function to get unique items from strings
  const getUniqueItems = (items) => [...new Set(items)];

  // Handle when a category is clicked
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset the subcategory selection
  };

  // Handle when a subcategory is clicked
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  // Handle when a price option is clicked
  const handlePriceOptionClick = (priceOption) => {
    setActivePriceOption(priceOption);
    setSelectedSubcategory(null); // Reset subcategory when price changes
  };

  // Render the list of categories
  const renderCategories = () => {
    const uniqueCategories = getUniqueItems(
      categoriesData.map((item) => item.category), // Treat category as a string
    );

    return (
      <div className="category-cards small-scrollable">
        {uniqueCategories.map((category, index) => (
          <div
            key={index}
            className={`category-link ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
    );
  };

  // Render the subcategories and services
  const renderSubcategories = () => {
    const categoryItems = categoriesData.filter(
      (item) => item.category === selectedCategory, // Compare as string
    );

    // If priceOption is "none", do not filter by price
    const uniqueSubcategories =
      activePriceOption === "none"
        ? getUniqueItems(categoryItems.map((item) => item.subcategory))
        : getUniqueItems(
            categoryItems
              .filter((item) => {
                // Only return subcategories that have the selected price option
                return item.price && item.price[activePriceOption];
              })
              .map((item) => item.subcategory), // Treat subcategory as a string
          );

    return (
      <div className="subcategory-container">
        <h4>Subcategories in {selectedCategory}</h4>

        {/* Render price buttons */}
        <div className="price-buttons">
          {priceOptions.map((priceOption, index) => (
            <button
              key={index}
              className={`price-option ${
                activePriceOption === priceOption ? "active" : ""
              }`}
              onClick={() => handlePriceOptionClick(priceOption)}
            >
              {priceOption === "none" ? "Show All" : priceOption}
            </button>
          ))}
        </div>

        <div className="subcategory-list small-scrollable">
          {uniqueSubcategories.length > 0 ? (
            uniqueSubcategories.map((subcategory, index) => (
              <div
                key={index}
                className={`subcategory-link ${
                  selectedSubcategory === subcategory ? "active" : ""
                }`}
                onClick={() => handleSubcategoryClick(subcategory)}
              >
                {subcategory}
              </div>
            ))
          ) : (
            <p>No subcategories available for this price option.</p>
          )}
        </div>

        {selectedSubcategory && renderServices(categoryItems)}
      </div>
    );
  };

  // Render the services filtered based on the selected subcategory and price option
  const renderServices = (categoryItems) => {
    const servicesInSubcategory = categoryItems
      .filter(
        (item) =>
          item.subcategory === selectedSubcategory && // Compare as string
          (activePriceOption === "none" || item.price[activePriceOption]), // Skip filtering by price if "none"
      )
      .map((item) => item.servicename); // Treat servicename as a string

    const uniqueServices = getUniqueItems(servicesInSubcategory);

    return (
      <div className="services-container">
        <h4>Services in {selectedSubcategory}</h4>
        <div className="services-list small-scrollable">
          {uniqueServices.map((service, index) => (
            <div key={index} className="service-link">
              {service} {/* Display the price */}
              {activePriceOption !== "none" && (
                <span>
                  - {activePriceOption}:{" "}
                  {categoryItems
                    .filter(
                      (item) =>
                        item.servicename === service &&
                        item.subcategory === selectedSubcategory,
                    )
                    .map((item) => item.price[activePriceOption] || "N/A")}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="categories-container">
      <h3>
        Categories and Services (
        {group.charAt(0).toUpperCase() + group.slice(1)})
      </h3>

      {/* Display a message if no data is available */}
      {hasError ? (
        <p>No Category data available.</p>
      ) : (
        <>
          {renderCategories()}

          {selectedCategory && renderSubcategories()}
        </>
      )}
    </div>
  );
};

export default ListofCategories;
