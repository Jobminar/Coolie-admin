import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "./styles/ProvidersCorner.css";
import ProviderForm from "./ProviderForm";
import AddProvider from "./AddProviderForm";
import AuthenticateProvider from "./AuthenticateProvider";
import ProviderList from "./ProviderList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import { FilterBarContext } from "../../FilterBarContext";
import { fetchCategories } from "./api/api-services";
import { fetchProviders } from "./api/provider-form-api";
import MapboxView from "./MapboxView";

const ProvidersCorner = () => {
  const { setFilterBarProps } = useContext(FilterBarContext);
  const [activeComponent, setActiveComponent] = useState("view");
  const [activeCategory, setActiveCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [providerIdForAuth, setProviderIdForAuth] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const categoriesData = await fetchCategories();
        if (categoriesData) {
          setCategories(categoriesData.map((cat) => cat.name));
          setSelectedCategory(categoriesData[0]?.name || "");
        }

        const providersData = await fetchProviders();
        if (providersData) {
          setProviders(providersData);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        alert("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();

    setFilterBarProps({
      activeComponent: "Providers Corner",
      activeComponentState: activeComponent,
      setActiveComponentState: setActiveComponent,
    });

    console.log("Active Component State:", activeComponent);
  }, [activeComponent, setFilterBarProps]);

  const getVisibleCategories = () => {
    const startIndex = activeCategory;
    const endIndex = (startIndex + 6) % categories.length;
    return endIndex > startIndex
      ? categories.slice(startIndex, endIndex)
      : [...categories.slice(startIndex), ...categories.slice(0, endIndex)];
  };

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
    if (window.confirm("Are you sure you want to edit this provider?")) {
      console.log("Edit provider:", provider.id);
      alert("Provider edited successfully.");
    }
  };

  const handleDelete = (providerId) => {
    if (window.confirm("Are you sure you want to delete this provider?")) {
      console.log("Delete provider:", providerId);
      alert("Provider deleted successfully.");
    }
  };

  const handleVerifyProvider = (providerId) => {
    console.log("Verifying provider with ID:", providerId);
    setProviderIdForAuth(providerId);
    setActiveComponent("authenticate"); // Switch to the AuthenticateProvider component
  };

  return (
    <div className="birdviewProvidersContainer">
      {loading && <div className="loading">Loading...</div>}

      {activeComponent === "view" && (
        <>
          <div className="birdviewProvidersSidebar">
            <button className="birdviewProvidersArrow" onClick={handlePrev}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="birdviewProvidersCategories">
              {getVisibleCategories().map((category, index) => (
                <button
                  key={index}
                  className={`birdviewProvidersCategory ${
                    category === selectedCategory ? "birdviewActive" : ""
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
          providers={providers.filter((provider) => provider.isVerified)}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {activeComponent === "add" && <AddProvider />}
      {activeComponent === "manage" && (
        <ProviderForm
          onVerifyProvider={handleVerifyProvider} // Pass the handler to ProviderForm
        />
      )}
      {activeComponent === "authenticate" && (
        <AuthenticateProvider providerId={providerIdForAuth} />
      )}
    </div>
  );
};

ProvidersCorner.propTypes = {
  setFilterBarProps: PropTypes.func,
};

export default ProvidersCorner;
