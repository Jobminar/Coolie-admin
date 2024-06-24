import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "./ProvidersCorner.css";
import ProviderForm from "./ProviderForm";
import AddProvider from "./AddProviderForm";
import AuthenticateProvider from "./AuthenticateProvider";
import ProviderList from "./ProviderList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FilterBarContext } from "../../../FilterBarContext";
import { fetchCategories, fetchProviders } from "./api/api-services"; // Import the fetchCategories and fetchProviders functions
import MapboxView from "./MapboxView"; // Import MapboxView

const ProvidersCorner = () => {
  const { setFilterBarProps } = useContext(FilterBarContext);
  const [activeComponent, setActiveComponent] = useState("view");
  const [activeCategory, setActiveCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await fetchCategories();
        if (categoriesData) {
          setCategories(categoriesData.map((cat) => cat.name)); // Assuming the API returns an array of objects with 'name'
          setSelectedCategory(categoriesData[0].name); // Set initial selected category
        }

        const providersData = await fetchProviders();
        if (providersData) {
          setProviders(providersData);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    loadData();

    setFilterBarProps({
      activeComponent: "Providers Corner",
      activeComponentState: activeComponent,
      setActiveComponentState: setActiveComponent,
    });
  }, [activeComponent, setFilterBarProps]);

  const getVisibleCategories = () => {
    const startIndex = activeCategory;
    const endIndex = (startIndex + 6) % categories.length;
    return endIndex > startIndex
      ? categories.slice(startIndex, endIndex)
      : [...categories.slice(startIndex), ...categories.slice(0, endIndex)];
  };

  const visibleCategories = getVisibleCategories();

  const handlePrev = () => {
    setActiveCategory(
      (prev) => (prev - 1 + categories.length) % categories.length,
    );
  };

  const handleNext = () => {
    setActiveCategory((prev) => (prev + 1) % categories.length);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveCategory(categories.indexOf(category));
  };

  const handleEdit = (provider) => {
    console.log("Edit provider:", provider.id);
  };

  const handleDelete = (providerId) => {
    console.log("Delete provider:", providerId);
  };

  return (
    <div className="birdviewProvidersContainer">
      {activeComponent === "view" && (
        <>
          <div className="birdviewProvidersSidebar">
            <button className="birdviewProvidersArrow" onClick={handlePrev}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="birdviewProvidersCategories">
              {visibleCategories.map((category, index) => (
                <button
                  key={index}
                  className={`birdviewProvidersCategory ${
                    category === categories[activeCategory]
                      ? "birdviewActive"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <button className="birdviewProvidersArrow" onClick={handleNext}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          <div className="providersMainContent" style={{ width: "100%" }}>
            <MapboxView
              providers={providers}
              selectedCategory={selectedCategory}
            />
          </div>
        </>
      )}

      {activeComponent === "list" && (
        <ProviderList
          providers={providers}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {activeComponent === "add" && <AddProvider />}
      {activeComponent === "manage" && <ProviderForm providers={providers} />}
      {activeComponent === "authenticate" && (
        <AuthenticateProvider providers={providers} />
      )}
    </div>
  );
};

ProvidersCorner.propTypes = {
  setFilterBarProps: PropTypes.func.isRequired,
};

export default ProvidersCorner;
