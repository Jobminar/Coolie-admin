import React, { useState, useEffect, useRef, useMemo } from "react";
import * as api from "./api/servicemanager-api";
import AddServiceForm from "./AddServiceForm";
import ServiceDetailCard from "./ServiceDetailCard";
import SubCategoryForm from "./SubCategoryForm";
import CategoryForm from "./CategoryForm";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
import "./styles/servicemanager.css";

const Servermanager = () => {
  const [showServiceList, setShowServiceList] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(true);
  const [showSubCategoryMenu, setShowSubCategoryMenu] = useState(true);
  const [showServiceVariantsMenu, setShowServiceVariantsMenu] = useState(false);
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
  const [subCategoryErrorStatus, setSubCategoryErrorStatus] = useState(false);
  const [subcategoryClicked, setSubcategoryClicked] = useState(false);

  const selectedCategoryRef = useRef(null);
  const selectedSubCategoryRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    api
      .fetchCategories()
      .then((response) => {
        setCategories(response.data);
        const lastCategoryId = sessionStorage.getItem("categoryId");
        if (lastCategoryId) {
          const lastCategory = response.data.find(
            (cat) => cat._id === lastCategoryId,
          );
          if (lastCategory) {
            selectedCategoryRef.current = lastCategory;
            fetchSubcategories(lastCategoryId);
          }
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

  const fetchSubcategories = useMemo(
    () => (categoryId) => {
      if (!categoryId) return;
      api
        .fetchSubcategories(categoryId)
        .then((response) => {
          setSubCategories(response.data);
          setSubCategoryErrorStatus(false);
          const selectedCategory = categories.find(
            (cat) => cat._id === categoryId,
          );
          selectedCategoryRef.current = selectedCategory;
          sessionStorage.setItem("categoryId", categoryId);

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
            const selectedCategory = categories.find(
              (cat) => cat._id === categoryId,
            );
            selectedCategoryRef.current = selectedCategory;
            sessionStorage.setItem("categoryId", categoryId);
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
          setServices(response.data.data);
          setShowServiceList(true);
          setSelectedService(null);
          sessionStorage.setItem("subCategoryId", subCategoryId);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          setShowServiceList(false);
        });
    },
    [],
  );

  const handleCategorySelect = (categoryId) => {
    if (categoryId === "Add new category") {
      setShowAddCategoryForm(true);
    } else {
      fetchSubcategories(categoryId);
      setShowAddCategoryForm(false);
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
      setSubcategoryClicked(false); // Reset the subcategory click state
    }
  };

  const handleSubCategorySelect = (subCategoryId) => {
    if (subCategoryId === "Add new sub-category") {
      setShowAddSubCategoryForm(true);
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
    } else {
      fetchServices(subCategoryId);
      const selectedSubCategory = subCategories.find(
        (subCat) => subCat._id === subCategoryId,
      );
      selectedSubCategoryRef.current = selectedSubCategory;
      setShowAddSubCategoryForm(false);
      setShowServiceVariantsMenu(true);
      setShowServiceForm(false);
      setSubcategoryClicked(true); // Set the subcategory click state
    }
  };

  const handleServiceSelect = (service) => {
    if (service.name === "Add New Service") {
      if (!selectedCategoryRef.current || !selectedSubCategoryRef.current) {
        toast.error("Please select a category and subcategory first.");
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
      selectedCategoryRef.current = selectedCategory;
      selectedSubCategoryRef.current = selectedSubCategory;
    }
  };

  const toggleServiceForm = () => {
    if (!selectedCategoryRef.current || !selectedSubCategoryRef.current) {
      toast.error("Please select a category and subcategory first.");
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
      setShowAddSubCategoryForm(true);
      setShowAddCategoryForm(false);
      setCategoryName("");
      setCategoryIcon(null);
      setReload(!reload);
      selectedCategoryRef.current = newCategory;
      sessionStorage.setItem("categoryId", newCategory._id);

      // Automatically select the new category
      handleCategorySelect(newCategory._id);
    } catch (error) {
      setCategoryError(
        error.response?.data?.message || error.message || "An error occurred",
      );
    }
  };

  const handleAddSubCategory = async () => {
    setSubCategoryError("");
    if (
      subCategoryName.trim() === "" ||
      !subCategoryIcon ||
      !selectedCategoryRef.current ||
      !selectedCategoryRef.current._id
    ) {
      setSubCategoryError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", subCategoryName);
    formData.append("image", subCategoryIcon);
    formData.append("categoryId", selectedCategoryRef.current._id);
    formData.append("isActive", true);
    formData.append("isDeleted", false);

    try {
      const response = await api.addSubCategory(formData);
      const newSubCategory = response.data;
      setShowAddSubCategoryForm(false);
      setShowServiceForm(true);
      setReload(!reload);
      selectedSubCategoryRef.current = newSubCategory;
      sessionStorage.setItem("subCategoryId", newSubCategory._id);
      fetchServices(newSubCategory._id); // Fetch services for the new subcategory
    } catch (error) {
      setSubCategoryError(error.message || "An error occurred");
    }
  };

  const handleAddService = async (formData) => {
    if (!(formData instanceof FormData)) {
      console.error("Provided formData is not an instance of FormData");
      return;
    }

    if (selectedCategoryRef.current) {
      formData.append("categoryId", selectedCategoryRef.current._id);
    }

    if (selectedSubCategoryRef.current) {
      formData.append("subCategoryId", selectedSubCategoryRef.current._id);
    }

    try {
      const response = await api.addService(formData);
      setShowServiceForm(false);
      setSelectedService(null);
      fetchServices(selectedSubCategoryRef.current._id);
      setReload(!reload);
      toast.success("Service added successfully!");
    } catch (error) {
      console.error("Error during the addition of service:", error);
      toast.error("Error adding service.");
    }
  };

  const handleSubCategoryClick = () => {
    setShowServiceList(true);
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
                      selectedCategoryRef.current &&
                      selectedCategoryRef.current._id === category._id
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
        {selectedCategoryRef.current && (
          <div className="servermanager-card" id="subcategory-card">
            <div className="servermanager-form-group">
              <div className="servermanager-category-header">
                <span>Select Sub-Category</span>
                <button
                  className="servermanager-main-add-button"
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
            {showSubCategoryMenu && (
              <div className="servermanager-menu">
                {subCategories.length > 0 ? (
                  subCategories.map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className={`servermanager-menu-item ${
                        selectedSubCategoryRef.current &&
                        selectedSubCategoryRef.current._id === subCategory._id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => {
                        handleSubCategorySelect(subCategory._id);
                        handleSubCategoryClick(); // Set the service list to show when clicking a sub-category
                      }}
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
            )}
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
          category={selectedCategoryRef.current}
          subCategory={selectedSubCategoryRef.current}
          onSubmit={handleAddService}
        />
      )}
      {selectedService && (
        <>
          <hr style={{ borderTop: "2px solid #ccc", height: "1px" }} />
          <ServiceDetailCard
            service={selectedService}
            category={selectedCategoryRef.current}
            subCategory={selectedSubCategoryRef.current}
            onClose={() => setSelectedService(null)}
          />
        </>
      )}
    </div>
  );
};

export default Servermanager;
