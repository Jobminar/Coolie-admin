import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListofCategories.css"; // Import the updated styles

const ListofCategories = ({ tierName, group }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Track selected subcategory
  const [priceOptions, setPriceOptions] = useState([]); // Track price options
  const [activePriceOption, setActivePriceOption] = useState(null); // Track active price option

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
        setCategoriesData(filteredData);

        // Extract the price options from the price object
        const allPrices = filteredData.flatMap((item) =>
          Object.keys(item.price || {}),
        );
        const uniquePriceOptions = [...new Set(allPrices)];
        setPriceOptions(uniquePriceOptions); // Set the unique price options (like "normal", "deep")
      } catch (error) {
        console.error("Failed to fetch categories data:", error);
      }
    };

    fetchCategories();
  }, [tierName, group]);

  // Merge duplicate categories, subcategories, and services
  const getUniqueItems = (array) => Array.from(new Set(array));

  // Handle when a category is clicked
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset the subcategory selection
    setActivePriceOption(null); // Reset price option on category change
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
      categoriesData.flatMap((item) => item.category),
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
    const categoryItems = categoriesData.filter((item) =>
      item.category.includes(selectedCategory),
    );

    // Filter subcategories based on selected price option
    const uniqueSubcategories = getUniqueItems(
      categoryItems
        .filter((item) => {
          // Only return subcategories that have the selected price option
          return item.price && item.price[activePriceOption];
        })
        .flatMap((item) => item.subcategory),
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
              {priceOption}
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
          item.subcategory.includes(selectedSubcategory) &&
          item.price[activePriceOption],
      )
      .flatMap((item) => item.servicename);

    const uniqueServices = getUniqueItems(servicesInSubcategory);

    return (
      <div className="services-container">
        <h4>Services in {selectedSubcategory}</h4>
        <div className="services-list small-scrollable">
          {uniqueServices.map((service, index) => (
            <div key={index} className="service-link">
              {service} {/* Display the price */}
              {activePriceOption && (
                <span>
                  - {activePriceOption}:{" "}
                  {categoryItems
                    .filter(
                      (item) =>
                        item.servicename.includes(service) &&
                        item.subcategory.includes(selectedSubcategory),
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

      {renderCategories()}

      {selectedCategory && renderSubcategories()}
    </div>
  );
};

export default ListofCategories;
