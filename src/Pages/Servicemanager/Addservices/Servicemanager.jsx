import React, { useState, useEffect, useRef, useMemo } from "react";
import * as api from "./api/servicemanager-api";
import AddServiceForm from "./AddServiceForm";
import ServiceDetailCard from "./ServiceDetailCard";
import SubCategoryForm from "./SubCategoryForm";
import CategoryForm from "./CategoryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./styles/servicemanager.css";

const ServiceManager = () => {
  const [showServiceList, setShowServiceList] = useState(false);
  const [showSubCategoryMenu, setShowSubCategoryMenu] = useState(true);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddSubCategoryForm, setShowAddSubCategoryForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [subCategoryIcon, setSubCategoryIcon] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [uiVariants, setUiVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedVariantName, setSelectedVariantName] = useState("");

  // const [subCategoryErrorStatus, setSubCategoryErrorStatus] = useState(false);
  const [subcategoryClicked, setSubcategoryClicked] = useState(false);

  const selectedCategoryRef = useRef(null);
  const selectedSubCategoryRef = useRef(null);
  const lastCategoryIdRef = useRef(null);

  const [selectedService, setSelectedService] = useState(null);
  //variant names for subcategory
  const variantNames = [
    ...new Set(subCategories.map((subCategory) => subCategory.variantName)),
  ].sort();

  useEffect(() => {
    api
      .fetchCategories()
      .then((response) => {
        const categories = response.data;
        setCategories(categories);

        if (categories.length > 0) {
          lastCategoryIdRef.current = categories[categories.length - 1]._id;
        } else {
          console.warn("No categories found");
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [reload]);

  useEffect(() => {
    const storedSubCategoryId = sessionStorage.getItem("subCategoryId");

    if (storedSubCategoryId) {
      fetchServices(storedSubCategoryId);
    }
  }, [reload]);

  useEffect(() => {
    if (!selectedCategoryRef.current && lastCategoryIdRef.current) {
      api
        .fetchCategoryById(lastCategoryIdRef.current)
        .then((response) => {
          selectedCategoryRef.current = response.data;
          setReload(!reload); // Trigger a re-render
          // Now fetch the subcategories for this category
          fetchSubcategories(lastCategoryIdRef.current);
          setShowSubCategoryMenu(true); // Ensure the subcategory menu is shown
        })
        .catch((error) =>
          console.error("Error fetching last category:", error),
        );
    }
  }, [lastCategoryIdRef.current]);

  const fetchSubcategories = useMemo(
    () => (categoryId) => {
      if (!categoryId) return;
      api
        .fetchSubcategories(categoryId)
        .then((response) => {
          setSubCategories(response.data);
          setSubCategoryErrorStatus(false);

          if (selectedCategoryRef.current?._id !== categoryId) {
            selectedCategoryRef.current = categories.find(
              (cat) => cat._id === categoryId,
            );
            sessionStorage.setItem("categoryId", categoryId);
          }

          const lastSubCategoryId = sessionStorage.getItem("subCategoryId");
          if (lastSubCategoryId) {
            const lastSubCategory = response.data.find(
              (subCat) => subCat._id === lastSubCategoryId,
            );
            if (lastSubCategory) {
              selectedSubCategoryRef.current = lastSubCategory;
              fetchServices(lastSubCategoryId);
            }
          } else {
            setServices([]);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setSubCategoryErrorStatus(true);
            setSubCategories([]);
            setServices([]);
          }
        });
    },
    [categories],
  );

  const fetchServices = useMemo(
    () => (subCategoryId) => {
      if (!selectedCategoryRef.current || !subCategoryId) return;
      api
        .fetchServices(selectedCategoryRef.current._id, subCategoryId)
        .then((response) => {
          setServices(response.data); // Services should be set here
          setShowServiceList(true); // Ensure this is set to true to show the services
          setSelectedService(null); // Clear the selected service
          sessionStorage.setItem("subCategoryId", subCategoryId);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          setShowServiceList(false); // Hide the service list if fetching fails
        });
    },
    [],
  );

  const handleCategorySelect = (categoryId) => {
    if (categoryId === "Add new category") {
      setShowAddCategoryForm(true);
      setShowSubCategoryMenu(false); // Hide subcategory list
      return;
    }

    const selectedCategory = categories.find((cat) => cat._id === categoryId);

    if (selectedCategory) {
      selectedCategoryRef.current = selectedCategory;
      lastCategoryIdRef.current = categoryId;
      sessionStorage.setItem("categoryId", categoryId);
      fetchSubcategories(categoryId);
      setShowSubCategoryMenu(true);
    } else {
      selectedCategoryRef.current = null;
      sessionStorage.removeItem("categoryId");
      setShowSubCategoryMenu(false);
    }

    setShowAddCategoryForm(false);
    setShowServiceForm(false);
    setSubcategoryClicked(false);
  };

  const handleSubCategorySelect = (subCategoryId) => {
    if (subCategoryId === "Add new sub-category") {
      setShowAddSubCategoryForm(true);
      setShowServiceForm(false);
      return;
    }

    fetchServices(subCategoryId); // Ensure this is called correctly
    const selectedSubCategory = subCategories.find(
      (subCat) => subCat._id === subCategoryId,
    );

    if (selectedSubCategory) {
      selectedSubCategoryRef.current = selectedSubCategory;
      sessionStorage.setItem("subCategoryId", subCategoryId);
      setShowServiceForm(false);
      setSubcategoryClicked(true); // Set this to true to show the services
    } else {
      selectedSubCategoryRef.current = null;
      sessionStorage.removeItem("subCategoryId");
    }

    setShowAddSubCategoryForm(false);
  };

  const handleServiceSelect = (service) => {
    if (service.name === "Add New Service") {
      if (!selectedCategoryRef.current || !selectedSubCategoryRef.current) {
        console.error("Please select a category and subcategory first.");
        return;
      }
      setShowServiceForm(true);
      setSelectedService(null);
    } else {
      setSelectedService(service);
      setShowServiceForm(false);
      const selectedCategory = categories.find(
        (cat) => cat._id === service.categoryId._id,
      );
      const selectedSubCategory = subCategories.find(
        (subCat) => subCat._id === service.subCategoryId._id,
      );

      if (selectedCategory) selectedCategoryRef.current = selectedCategory;
      if (selectedSubCategory)
        selectedSubCategoryRef.current = selectedSubCategory;
    }
  };

  const toggleServiceForm = () => {
    if (!selectedCategoryRef.current || !selectedSubCategoryRef.current) {
      console.error("Please select a category and subcategory first.");
      return;
    }
    setShowServiceForm((prev) => !prev);
    setSelectedService(null);
  };

  const handleCategoryIconChange = (e) => {
    if (e.target.files[0]) setCategoryIcon(e.target.files[0]);
  };

  const handleSubCategoryIconChange = (e) => {
    if (e.target.files[0]) setSubCategoryIcon(e.target.files[0]);
  };

  const handleAddCategory = async (UiVariant) => {
    setCategoryError("");
    if (categoryName.trim() === "") {
      setCategoryError("Category name is required.");
      return;
    }
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("isActive", true);
    formData.append("isDeleted", false);
    if (categoryIcon) formData.append("image", categoryIcon);
    UiVariant.forEach((variant) => formData.append("uiVariant", variant));

    try {
      const response = await api.addCategory(formData);
      const newCategory = response.data;

      selectedCategoryRef.current = newCategory;
      lastCategoryIdRef.current = newCategory._id;
      sessionStorage.setItem("categoryId", newCategory._id);
      handleCategorySelect(newCategory._id);

      setShowAddSubCategoryForm(true);
      setShowAddCategoryForm(false);
      setCategoryName("");
      setCategoryIcon(null);
      setReload(!reload);
    } catch (error) {
      setCategoryError(
        error.response?.data?.message || error.message || "An error occurred",
      );
    }
  };

  const handleAddSubCategory = async (selectedVariant) => {
    console.log("handleAddSubcategory");
    setSubCategoryError("");

    if (subCategoryName.trim() === "") {
      setSubCategoryError("Sub-category name is required.");
      return;
    }

    if (!subCategoryIcon) {
      setSubCategoryError("Sub-category icon is required.");
      return;
    }

    if (!selectedCategoryRef.current || !selectedCategoryRef.current._id) {
      setSubCategoryError("No category selected.");
      return;
    }

    if (!selectedVariant) {
      setSubCategoryError("Variant name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", subCategoryName);
    formData.append("image", subCategoryIcon);
    formData.append("categoryId", selectedCategoryRef.current._id);
    formData.append("variantName", selectedVariant);
    formData.append("isActive", true);
    formData.append("isDeleted", false);

    console.log("Sub-Category FormData:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await api.addSubCategory(formData);
      const newSubCategory = response.data;
      setShowAddSubCategoryForm(false);
      setShowServiceForm(true);
      setReload(!reload);
      selectedSubCategoryRef.current = newSubCategory;
      sessionStorage.setItem("subCategoryId", newSubCategory._id);

      // Immediately fetch subcategories after adding the subcategory
      fetchSubcategories(selectedCategoryRef.current._id);
    } catch (error) {
      setSubCategoryError(error.message || "An error occurred");
    }
  };

  const handleAddService = async (formData) => {
    if (!(formData instanceof FormData)) {
      console.error("Provided formData is not an instance of FormData");
      return;
    }

    // Append categoryId and subCategoryId if not already present in formData
    if (!formData.has("categoryId") && selectedCategoryRef.current) {
      formData.append("categoryId", selectedCategoryRef.current._id);
    }

    if (!formData.has("subCategoryId") && selectedSubCategoryRef.current) {
      formData.append("subCategoryId", selectedSubCategoryRef.current._id);
    }

    try {
      const response = await api.addService(formData);
      console.log("Service added successfully:", response.data);

      setShowServiceForm(false);
      setSelectedService(null);
      fetchServices(selectedSubCategoryRef.current._id);
      setReload(!reload);
      console.success("Service added successfully!");
    } catch (error) {
      console.error("Error during the addition of service:", error);

      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something else happened in setting up the request
        console.error("Error message:", error.message);
      }

      console.error("Error adding service.");
    }
  };

  const handleSubCategoryClick = () => {
    setShowServiceList(true);
  };

  const handleCloseSubCategoryForm = () => {
    setShowAddSubCategoryForm(false);
  };

  return (
    <div className="servermanager-container">
      <h2>Add Service</h2>
      <div className="servermanager-card-container">
        <div className="servermanager-card" id="category-card">
          <div className="servermanager-form-group">
            <div className="servermanager-category-header">
              <span>Select Category</span>
              <button
                className="servermanager-main-add-button"
                onClick={() => {
                  setShowAddCategoryForm(!showAddCategoryForm);
                  setShowSubCategoryMenu(false); // Hide subcategory list
                }}
              >
                +
              </button>
            </div>
          </div>

          <div className="servermanager-menu">
            {categories.length > 0 ? (
              <>
                {/* Display the last category first */}
                <div
                  key={categories[categories.length - 1]._id}
                  className={`servermanager-menu-item ${
                    selectedCategoryRef.current &&
                    selectedCategoryRef.current._id ===
                      categories[categories.length - 1]._id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    handleCategorySelect(categories[categories.length - 1]._id)
                  }
                >
                  {categories[categories.length - 1].name}
                </div>

                {/* Display the rest of the categories */}
                {categories.slice(0, categories.length - 1).map((category) => (
                  <div
                    key={category._id}
                    className={`servermanager-menu-item ${
                      selectedCategoryRef.current &&
                      selectedCategoryRef.current._id === category._id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleCategorySelect(category._id)}
                  >
                    {category.name}
                  </div>
                ))}
              </>
            ) : (
              <div>No data</div>
            )}
          </div>
        </div>
        {showAddCategoryForm && (
          <CategoryForm
            setUiVariants={setUiVariants}
            {...{
              categoryName,
              setCategoryName,
              categoryError,
              handleCategoryIconChange,
              categoryIcon,
              handleAddCategory,
            }}
          />
        )}
        {selectedCategoryRef.current &&
          selectedCategoryRef.current._id &&
          showSubCategoryMenu && (
            <div className="servermanager-card" id="subcategory-card">
              <div className="servermanager-form-group">
                <div className="servermanager-category-header">
                  <span>Select Sub-Category</span>
                  <button
                    className="servermanager-main-add-button"
                    onClick={() =>
                      setShowAddSubCategoryForm(!showAddSubCategoryForm)
                    }
                    aria-label="Add Sub-Category"
                  >
                    +
                  </button>
                  <button
                    className="servermanager-close-icon"
                    onClick={() => setShowSubCategoryMenu(false)}
                    aria-label="Close Menu"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>

                {/* Dropdown for filtering */}
                <div className="servermanager-filter-group">
                  <label htmlFor="variant-filter">Filter by Variant:</label>
                  <select
                    id="variant-filter"
                    value={selectedVariantName}
                    onChange={(e) => setSelectedVariantName(e.target.value)}
                  >
                    <option value="">All Variants</option>
                    {variantNames.map((variant) => (
                      <option key={variant} value={variant}>
                        {variant}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subcategories List */}
              <div className="servermanager-menu">
                {subCategories.length > 0 ? (
                  subCategories
                    .filter((subCategory) =>
                      selectedVariantName
                        ? subCategory.variantName === selectedVariantName
                        : true,
                    )
                    .map((subCategory, index) => {
                      const subCategoryId =
                        subCategory._id?.$oid || subCategory._id; // Adjust access here

                      return (
                        <div
                          key={subCategoryId || index} // Use subCategoryId or fallback to index
                          className={`servermanager-menu-item ${
                            selectedSubCategoryRef.current &&
                            selectedSubCategoryRef.current._id?.$oid ===
                              subCategoryId
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            console.log("Subcategory ID:", subCategoryId); // Log for debugging
                            handleSubCategorySelect(subCategoryId);
                            handleSubCategoryClick();
                          }}
                        >
                          {subCategory.name} ({subCategory.variantName})
                        </div>
                      );
                    })
                ) : (
                  <div>No subcategories available</div>
                )}
              </div>
            </div>
          )}

        {showAddSubCategoryForm && (
          <SubCategoryForm
            subCategoryName={subCategoryName}
            setSubCategoryName={setSubCategoryName}
            subCategoryError={subCategoryError}
            handleSubCategoryIconChange={handleSubCategoryIconChange}
            subCategoryIcon={subCategoryIcon}
            handleAddSubCategory={handleAddSubCategory}
            lastCategoryId={lastCategoryIdRef.current}
            onClose={handleCloseSubCategoryForm} // Passing the close handler
          />
        )}
        {selectedSubCategoryRef.current &&
          showSubCategoryMenu &&
          subcategoryClicked && (
            <div className="servermanager-card" id="service-card">
              <div className="servermanager-form-group">
                <div className="servermanager-category-header">
                  <span>Select Service</span>
                  <button
                    className="servermanager-main-add-button"
                    onClick={toggleServiceForm}
                  >
                    +
                  </button>
                  <button
                    className="servermanager-close-icon"
                    onClick={() => setShowServiceList(false)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
              {showServiceList && (
                <div className="servermanager-menu">
                  {services.length > 0 ? (
                    services.map((service) => (
                      <div
                        key={service._id}
                        className={`servermanager-menu-item ${
                          selectedService && selectedService._id === service._id
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleServiceSelect(service)}
                      >
                        {service.name}
                        {service.serviceVariants &&
                          service.serviceVariants.length > 0 && (
                            <span> (₹{service.serviceVariants[0].price})</span>
                          )}
                      </div>
                    ))
                  ) : (
                    <div>No services found</div>
                  )}
                </div>
              )}
              {services.length === 0 && (
                <p>There is no service for this subcategory.</p>
              )}
            </div>
          )}
      </div>
      {selectedCategoryRef.current && selectedSubCategoryRef.current && (
        <div className="selected-category-info">
          <h6>
            Category: {selectedCategoryRef.current.name} | Sub-Category:{" "}
            {selectedSubCategoryRef.current.name}
          </h6>
        </div>
      )}
      {showServiceForm && (
        <AddServiceForm
          category={
            selectedCategoryRef.current || { _id: lastCategoryIdRef.current }
          }
          subCategory={selectedSubCategoryRef.current}
          subCategoryId={
            selectedSubCategoryRef.current
              ? selectedSubCategoryRef.current._id
              : null
          }
          onSubmit={handleAddService}
        />
      )}
      {selectedService && (
        <>
          <hr style={{ borderTop: "2px solid #ccc", height: "1px" }} />
          <ServiceDetailCard
            service={{
              ...selectedService,
              variantName: selectedService.variantName || "N/A", // Provide a fallback if variantName is undefined
            }}
            category={selectedCategoryRef.current}
            subCategory={selectedSubCategoryRef.current}
            onClose={() => setSelectedService(null)}
          />
        </>
      )}
    </div>
  );
};

export default ServiceManager;
