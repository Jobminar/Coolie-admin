import React, { useState, useEffect } from "react";
import axios from "axios";
import AddServiceForm from "./AddServiceForm";
import ServiceDetailCard from "./ServiceDetailCard";
import SubCategoryForm from "./SubCategoryForm";
import CategoryForm from "./CategoryForm";
import "./servicemanager.css";

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
  const [serviceTypes, setServiceTypes] = useState([]); // Ensure service types are managed
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coolieno1.in/v1.0/core/categories")
      .then((response) => {
        console.log("Categories fetched:", response.data);
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const fetchSubcategories = (categoryId) => {
    if (!categoryId) {
      console.error("Category ID is undefined");
      return;
    }
    axios
      .get(
        `http://13.126.118.3:3000/v1.0/core/sub-categories/category/${categoryId}`,
      )
      .then((response) => {
        console.log("Subcategories fetched:", response.data);
        setSubCategories(response.data);
        setSelectedCategory(categoryId);
        setServices([]);
      })
      .catch((error) => console.error("Error fetching subcategories:", error));
  };

  const fetchServices = (subCategoryId) => {
    if (!selectedCategory || !subCategoryId) {
      console.error("Category ID or Subcategory ID is undefined");
      return;
    }

    const url = `http://13.126.118.3:3000/v1.0/core/services/filter/${selectedCategory}/${subCategoryId}`;

    axios
      .get(url)
      .then((response) => {
        console.log("Services fetched:", response.data);

        const fetchedServices = response.data.data;
        setServices(fetchedServices);

        setShowServiceList(true);
        setSelectedService(null);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setShowServiceList(false);
      });
  };

  const handleCategorySelect = (categoryId) => {
    console.log("Category selected:", categoryId);
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
    console.log("Subcategory selected:", subCategoryId);
    if (subCategoryId === "Add new sub-category") {
      setShowAddSubCategoryForm(true);
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
    } else {
      fetchServices(subCategoryId);
      setSelectedSubCategory(subCategoryId);
      setShowAddSubCategoryForm(false);
      setShowServiceVariantsMenu(true);
      setShowServiceForm(false);
    }
  };

  const handleServiceSelect = (service) => {
    console.log("Selected service:", service);

    if (service.name === "Add New Service") {
      setShowServiceForm(true);
      setSelectedService(null);
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else {
      setSelectedService(service);
      setShowServiceForm(false);

      const categoryId = service.categoryId._id;
      const subCategoryId = service.subCategoryId._id;

      setSelectedCategory(categoryId);
      setSelectedSubCategory(subCategoryId);
    }
  };

  const toggleServiceForm = () => {
    setShowServiceForm((prev) => !prev);
    setSelectedService(null);
  };

  const handleCategoryIconChange = (e) => {
    if (e.target.files[0]) {
      setCategoryIcon(e.target.files[0]);
      console.log("Category icon selected:", e.target.files[0]);
    }
  };

  const handleSubCategoryIconChange = (e) => {
    if (e.target.files[0]) {
      setSubCategoryIcon(e.target.files[0]);
      console.log("Subcategory icon selected:", e.target.files[0]);
    }
  };

  const handleAddCategory = async () => {
    setCategoryError("");

    if (categoryName.trim() === "") {
      setCategoryError("Category name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("isActive", true);
    formData.append("isDeleted", false);
    if (categoryIcon) {
      formData.append("image", categoryIcon);
    }

    try {
      const response = await fetch(
        "http://13.126.118.3:3000/v1.0/core/categories",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const data = await response.json();
      console.log("Category added:", data);
      setShowAddSubCategoryForm(true);
      const newCategoryId = data._id;
      setCategoryId(newCategoryId);
      sessionStorage.setItem("categoryId", newCategoryId); // Store category ID in session storage
      setShowAddCategoryForm(false);
      setCategoryName("");
      setCategoryIcon(null);
    } catch (error) {
      console.error("Error during category addition:", error);
      setCategoryError(error.message || "An error occurred");
    }
  };

  const handleAddSubCategory = async () => {
    setSubCategoryError("");

    if (subCategoryName.trim() === "" || !subCategoryIcon || !categoryId) {
      setSubCategoryError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", subCategoryName);
    formData.append("image", subCategoryIcon);
    formData.append("categoryId", categoryId);
    formData.append("isActive", true);
    formData.append("isDeleted", false);

    try {
      const subCategoryResponse = await fetch(
        "http://13.126.118.3:3000/v1.0/core/sub-categories",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!subCategoryResponse.ok) {
        throw new Error("Failed to add sub-category");
      }

      const subCategoryDataResponse = await subCategoryResponse.json();
      console.log("Subcategory added:", subCategoryDataResponse);
      const newSubCategoryId = subCategoryDataResponse._id;
      setSubCategoryId(newSubCategoryId);
      sessionStorage.setItem("subCategoryId", newSubCategoryId); // Store subcategory ID in session storage
      setShowAddSubCategoryForm(false);
      setShowServiceForm(true); // Ensure the form is shown here
    } catch (error) {
      console.error("Error during the addition of sub-category:", error);
      setSubCategoryError(error.message || "An error occurred");
    }
  };

  const handleAddService = async (serviceData) => {
    const {
      name,
      description,
      locations,
      taxPercentage,
      platformCommission,
      selectedUserPackage,
      selectedProviderPackage,
      isMostBooked,
      tag,
      isCash,
      creditEligibility,
      serviceVariants,
    } = serviceData;

    const storedCategoryId = sessionStorage.getItem("categoryId");
    const storedSubCategoryId = sessionStorage.getItem("subCategoryId");

    const payload = {
      name,
      description,
      categoryId: storedCategoryId || selectedCategory,
      subCategoryId: storedSubCategoryId || selectedSubCategory,
      serviceVariants,
      locations,
      taxPercentage,
      platformCommission,
      selectedUserPackage,
      selectedProviderPackage,
      isMostBooked,
      tag,
      isCash,
      creditEligibility,
      isActive: true,
      isDeleted: false,
    };

    console.log("Payload to be sent:", JSON.stringify(payload, null, 2));

    try {
      const serviceResponse = await fetch(
        "http://13.126.118.3:3000/v1.0/core/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      console.log("Service response status:", serviceResponse.status);
      console.log("Service response OK:", serviceResponse.ok);

      if (!serviceResponse.ok) {
        const errorText = await serviceResponse.text();
        console.error("Error response text:", errorText);
        throw new Error(`Failed to add service: ${serviceResponse.status}`);
      }

      const serviceDataResponse = await serviceResponse.json();
      console.log("Service added:", serviceDataResponse);
      setShowServiceForm(false);
      setSelectedService(null);
      fetchServices(selectedSubCategory);
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
                      selectedCategory === category._id ? "selected" : ""
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
            setServiceTypes={setServiceTypes}
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

            {showSubCategoryMenu && (
              <div className="servermanager-menu">
                {subCategories.length > 0 ? (
                  subCategories.map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className={`servermanager-menu-item ${
                        selectedSubCategory === subCategory._id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleSubCategorySelect(subCategory._id)}
                    >
                      {subCategory.name}
                    </div>
                  ))
                ) : (
                  <div>No subcategories</div>
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
          onSubmit={handleAddService}
          serviceTypes={serviceTypes} // Pass service types to AddServiceForm
        />
      )}
      {selectedService && (
        <>
          <hr style={{ borderTop: "2px solid #ccc", height: "1px" }} />
          <ServiceDetailCard
            service={selectedService}
            category={selectedService.categoryId._id}
            subCategory={selectedService.subCategoryId._id}
            onClose={() => setSelectedService(null)}
          />
        </>
      )}
    </div>
  );
};

export default Servermanager;
