// Servermanager.js
import React, { useState, useEffect } from "react";
import * as api from "./api/servicemanager-api";
import AddServiceForm from "./AddServiceForm";
import ServiceDetailCard from "./ServiceDetailCard";
import SubCategoryForm from "./SubCategoryForm";
import CategoryForm from "./CategoryForm";
import "./styles/servicemanager.css";

const Servermanager = () => {
  const [showServiceList, setShowServiceList] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(true);
  const [showSubCategoryMenu, setShowSubCategoryMenu] = useState(true);
  const [showServiceVariantsMenu, setShowServiceVariantsMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddSubCategoryForm, setShowAddSubCategoryForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [subCategoryIcon, setSubCategoryIcon] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [uiVariants, setUiVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [reload, setReload] = useState(false);
  const [subCategoryErrorStatus, setSubCategoryErrorStatus] = useState(false);

  useEffect(() => {
    api
      .fetchCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, [reload]);

  const fetchSubcategories = (categoryId) => {
    if (!categoryId) return;
    api
      .fetchSubcategories(categoryId)
      .then((response) => {
        setSubCategories(response.data);
        setSubCategoryErrorStatus(false);
        setSelectedCategory(categories.find((cat) => cat._id === categoryId));
        setServices([]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setSubCategoryErrorStatus(true);
          setSubCategories([]);
          setSelectedCategory(categories.find((cat) => cat._id === categoryId));
          setServices([]);
        }
      });
  };

  const fetchServices = (subCategoryId) => {
    if (!selectedCategory || !subCategoryId) return;
    api
      .fetchServices(selectedCategory._id, subCategoryId)
      .then((response) => {
        setServices(response.data.data);
        setShowServiceList(true);
        setSelectedService(null);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setShowServiceList(false);
      });
  };

  const handleCategorySelect = (categoryId) => {
    if (categoryId === "Add new category") {
      setShowAddCategoryForm(true);
    } else {
      fetchSubcategories(categoryId);
      setShowAddCategoryForm(false);
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
    }
  };

  const handleSubCategorySelect = (subCategoryId) => {
    if (subCategoryId === "Add new sub-category") {
      setShowAddSubCategoryForm(true);
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
    } else {
      fetchServices(subCategoryId);
      setSelectedSubCategory(
        subCategories.find((subCat) => subCat._id === subCategoryId)
      );
      setShowAddSubCategoryForm(false);
      setShowServiceVariantsMenu(true);
      setShowServiceForm(false);
    }
  };

  const handleServiceSelect = (service) => {
    if (service.name === "Add New Service") {
      setShowServiceForm(true);
      setSelectedService(null);
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else {
      setSelectedService(service);
      setShowServiceForm(false);
      setSelectedCategory(categories.find((cat) => cat._id === service.categoryId._id));
      setSelectedSubCategory(
        subCategories.find((subCat) => subCat._id === service.subCategoryId._id)
      );
    }
  };

  const toggleServiceForm = () => {
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
      setShowAddSubCategoryForm(true);
      setCategoryId(response.data._id);
      sessionStorage.setItem("categoryId", response.data._id);
      setShowAddCategoryForm(false);
      setCategoryName("");
      setCategoryIcon(null);
      setReload(!reload);
    } catch (error) {
      setCategoryError(error.response?.data?.message || error.message || "An error occurred");
    }
  };

  const handleAddSubCategory = async () => {
    
    setSubCategoryError("");
    if (subCategoryName.trim() === "" || !subCategoryIcon || !selectedCategory._id) {
      setSubCategoryError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", subCategoryName);
    formData.append("image", subCategoryIcon);
    formData.append("categoryId", selectedCategory._id);
    formData.append("isActive", true);
    formData.append("isDeleted", false);

    try {
      const response = await api.addSubCategory(formData);
      setSubCategoryId(response.data._id);
      sessionStorage.setItem("subCategoryId", response.data._id);
      setShowAddSubCategoryForm(false);
      setShowServiceForm(true);
      setReload(!reload);
    } catch (error) {
      setSubCategoryError(error.message || "An error occurred");
    }
  };

  const handleAddService = async (formData) => {
    // Log FormData before modification
    console.log("Before modification:", formData);
  
    // Ensure `formData` is an instance of FormData
    if (!(formData instanceof FormData)) {
      console.error("Provided formData is not an instance of FormData");
      return;
    }
  
    // Append selectedCategory and selectedSubCategory IDs if available
    if (selectedCategory) {
      formData.append("categoryId", selectedCategory._id);
    } else {
      console.warn("No selectedCategory available to append.");
    }
  
    if (selectedSubCategory) {
      formData.append("subCategoryId", selectedSubCategory._id);
    } else {
      console.warn("No selectedSubCategory available to append.");
    }
  
    // Log the FormData to check if data was added
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    console.log("FormData object after modification:", obj);
  
    try {
      // Call API to add the service
      const response = await api.addService(formData);
      console.log("Response:", response);
  
      // Reset form state and fetch updated data
      setShowServiceForm(false);
      setSelectedService(null);
      fetchServices(selectedSubCategory._id);
      setReload(!reload);
    } catch (error) {
      console.error("Error during the addition of service:", error);
    }
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
                className="servermanager-add-button"
                onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
              >
                +
              </button>
              <button
                className="servermanager-hamburger-icon"
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              >
                &#9776;
              </button>
            </div>
          </div>
          {showCategoryMenu && (
            <div className="servermanager-menu">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div
                    key={category._id}
                    className={`servermanager-menu-item ${
                      selectedCategory && selectedCategory._id === category._id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleCategorySelect(category._id)}
                  >
                    {category.name}
                  </div>
                ))
              ) : (
                <div>No data</div>
              )}
            </div>
          )}
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
        {selectedCategory && (
          <div className="servermanager-card" id="subcategory-card">
            <div className="servermanager-form-group">
              <div className="servermanager-category-header">
                <span>Select Sub-Category</span>
                <button
                  className="servermanager-add-button"
                  onClick={() =>
                    setShowAddSubCategoryForm(!showAddSubCategoryForm)
                  }
                >
                  +
                </button>
                <button
                  className="servermanager-hamburger-icon"
                  onClick={() => setShowSubCategoryMenu(!showSubCategoryMenu)}
                >
                  &#9776;
                </button>
              </div>
            </div>

            <div className="servermanager-menu">
              {subCategories.length > 0 ? (
                subCategories.map((subCategory) => (
                  <div
                    key={subCategory._id}
                    className={`servermanager-menu-item ${
                      selectedSubCategory &&
                      selectedSubCategory._id === subCategory._id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleSubCategorySelect(subCategory._id)}
                  >
                    {subCategory.name}
                  </div>
                ))
              ) : subCategoryErrorStatus ? (
                <div className="servermanager-menu-item">
                  No subcategories available
                </div>
              ) : (
                <div className="servermanager-menu-item">
                  Loading subcategories...
                </div>
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
          />
        )}

        {selectedSubCategory && (
          <div className="servermanager-card" id="service-card">
            <div className="servermanager-form-group">
              <div className="servermanager-category-header">
                <span>Select Service</span>
                <button
                  className="servermanager-add-button"
                  onClick={toggleServiceForm}
                >
                  +
                </button>
                <button
                  className="servermanager-hamburger-icon"
                  onClick={() =>
                    setShowServiceVariantsMenu(!showServiceVariantsMenu)
                  }
                >
                  &#9776;
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
          </div>
        )}
      </div>

      {showServiceForm && (
  <AddServiceForm
    category={selectedCategory}
    subCategory={selectedSubCategory}
    onSubmit={handleAddService}
  />
)}

      {selectedService && (
        <>
          <hr style={{ borderTop: "2px solid #ccc", height: "1px" }} />
          <ServiceDetailCard
            service={selectedService}
            category={selectedCategory}
            subCategory={selectedSubCategory}
            onClose={() => setSelectedService(null)}
          />
        </>
      )}
    </div>
  );
};

export default Servermanager;