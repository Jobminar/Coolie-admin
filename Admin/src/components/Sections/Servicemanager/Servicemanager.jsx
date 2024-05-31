import { useState } from "react";
import AddServiceForm from "./AddServiceForm";
import ServiceDetailCard from "./ServiceDetailCard";
import SubCategoryForm from "./SubCategoryForm";
import CategoryForm from "./CategoryForm";

import "./servicemanager.css"; // Ensure the CSS file is correctly linked

const Servermanager = () => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSubCategoryMenu, setShowSubCategoryMenu] = useState(false);
  const [showServiceVariantsMenu, setShowServiceVariantsMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
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
  const [serviceVariant, setServiceVariant] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [serviceVariantId, setServiceVariantId] = useState(null);

  const categories = ["Cleaning service", "Salon At Home", "Add new category"];
  const subCategories = [
    "Kitchen cleaning",
    "House cleaning",
    "Swimming pool",
    "Salon At Home",
    "Add new sub-category",
  ];

  const servicesMap = {
    "Kitchen cleaning": [
      {
        name: "Sink cleaning",
        type: "Normal cleaning",
        price: "100",
        time: "30 mins",
        description: "Cleaning of sink area",
        locations: "All",
        city: "City A",
        tax: "5",
        commission: "10",
        mostBooked: true,
        tag: true,
        cashAfterService: false,
      },
      {
        name: "Platform cleaning",
        type: "Deep cleaning",
        price: "200",
        time: "45 mins",
        description: "Deep cleaning of kitchen platform",
        locations: "All",
        city: "City A",
        tax: "5",
        commission: "10",
        mostBooked: false,
        tag: false,
        cashAfterService: true,
      },
      { name: "Add New Service" },
    ],
    "House cleaning": [
      {
        name: "Room cleaning",
        type: "Normal cleaning",
        price: "150",
        time: "1 hour",
        description: "Cleaning of room area",
        locations: "All",
        city: "City B",
        tax: "5",
        commission: "10",
        mostBooked: true,
        tag: true,
        cashAfterService: false,
      },
      {
        name: "Window cleaning",
        type: "Deep cleaning",
        price: "250",
        time: "1 hour 30 mins",
        description: "Deep cleaning of windows",
        locations: "All",
        city: "City B",
        tax: "5",
        commission: "10",
        mostBooked: false,
        tag: false,
        cashAfterService: true,
      },
      { name: "Add New Service" },
    ],
    "Swimming pool": [
      {
        name: "Pool cleaning",
        type: "Normal cleaning",
        price: "300",
        time: "2 hours",
        description: "Cleaning of pool area",
        locations: "All",
        city: "City C",
        tax: "5",
        commission: "10",
        mostBooked: true,
        tag: true,
        cashAfterService: false,
      },
      {
        name: "Water testing",
        type: "Deep cleaning",
        price: "400",
        time: "2 hours 30 mins",
        description: "Testing of pool water",
        locations: "All",
        city: "City C",
        tax: "5",
        commission: "10",
        mostBooked: false,
        tag: false,
        cashAfterService: true,
      },
      { name: "Add New Service" },
    ],
    "Salon At Home": [
      {
        name: "Haircut",
        type: "Normal cleaning",
        price: "50",
        time: "30 mins",
        description: "Basic haircut",
        locations: "All",
        city: "City D",
        tax: "5",
        commission: "10",
        mostBooked: true,
        tag: true,
        cashAfterService: false,
      },
      {
        name: "Facial",
        type: "Deep cleaning",
        price: "100",
        time: "1 hour",
        description: "Facial treatment",
        locations: "All",
        city: "City D",
        tax: "5",
        commission: "10",
        mostBooked: false,
        tag: false,
        cashAfterService: true,
      },
      { name: "Add New Service" },
    ],
  };

  const handleCategorySelect = (category) => {
    if (category === "Add new category") {
      setShowAddCategoryForm(true);
    } else {
      setSelectedCategory(category);
      setShowCategoryMenu(false);
      setShowAddCategoryForm(false);
      setShowSubCategoryMenu(true);
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    if (subCategory === "Add new sub-category") {
      setShowAddSubCategoryForm(true);
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
    } else {
      setSelectedSubCategory(subCategory);
      setShowSubCategoryMenu(false);
      setShowAddSubCategoryForm(false);
      setShowServiceVariantsMenu(true);
      setShowServiceForm(false);
    }
  };

  const handleServiceSelect = (service) => {
    if (service.name === "Add New Service") {
      setShowServiceForm(true);
      setSelectedService(null); // Hide ServiceDetailCard
    } else {
      setSelectedService(service);
      setShowServiceForm(false); // Hide AddServiceForm
    }
  };

  const toggleServiceForm = () => {
    setShowServiceForm((prev) => !prev);
    setSelectedService(null); // Hide ServiceDetailCard
  };

  const handleCategoryIconChange = (e) => {
    if (e.target.files[0]) {
      setCategoryIcon(e.target.files[0]); // Store the file object directly
    }
  };

  const handleSubCategoryIconChange = (e) => {
    if (e.target.files[0]) {
      setSubCategoryIcon(e.target.files[0]); // Store the file object directly
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

    // Debugging: Log FormData entries
    for (let pair of formData.entries()) {
      console.log(
        `${pair[0]}: ${
          pair[1] instanceof Blob ? `File: ${pair[1].name}` : pair[1]
        }`,
      );
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

      const data = await response.json(); // Assuming server sends back JSON
      console.log("Response data:", data); // Log response data for debugging
      setShowAddSubCategoryForm(true);
      // Store category ID in component state and localStorage
      const categoryId = data._id; // Ensure your API returns _id
      setCategoryId(categoryId); // This setter function should be defined in your component using useState
      localStorage.setItem("categoryId", categoryId);

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

    if (
      subCategoryName.trim() === "" ||
      !subCategoryIcon ||
      !categoryId ||
      !serviceVariant
    ) {
      setSubCategoryError("All fields are required.");
      console.error("Validation failed: Missing inputs in subcategory form.");
      return;
    }

    const serviceVariantData = {
      name: serviceVariant,
      description: "Add a description for the service variant",
      isActive: true,
      isDeleted: false,
    };

    console.log("Service Variant Data being sent:", serviceVariantData);

    try {
      console.log("Posting service variant...");
      const variantResponse = await fetch(
        "http://13.126.118.3:3000/v1.0/core/service-variants",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceVariantData),
        },
      );

      if (!variantResponse.ok) {
        const errorText = await variantResponse.text();
        console.error(
          "Failed to post service variant, server responded with:",
          errorText,
        );
        throw new Error("Failed to add service variant");
      }

      const variantData = await variantResponse.json();
      console.log(
        "Service variant posted successfully, received data:",
        variantData,
      );

      const serviceVariantId = variantData._id;
      setServiceVariantId(serviceVariantId);
      console.log("Service Variant ID:", serviceVariantId);

      const formData = new FormData();
      formData.append("name", subCategoryName);
      formData.append("image", subCategoryIcon); // Assuming this is a File object
      formData.append("categoryId", categoryId);
      formData.append("isActive", true);
      formData.append("isDeleted", false);
      formData.append(
        "serviceVariants",
        JSON.stringify([{ serviceVariantId, isActive: true }]),
      );

      // Debugging: Log FormData entries
      for (let pair of formData.entries()) {
        console.log(
          `${pair[0]}: ${
            pair[1] instanceof Blob ? `File: ${pair[1].name}` : pair[1]
          }`,
        );
      }

      console.log("Posting subcategory...");
      const subCategoryResponse = await fetch(
        "http://13.126.118.3:3000/v1.0/core/sub-categories",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!subCategoryResponse.ok) {
        const errorText = await subCategoryResponse.text();
        console.error(
          "Failed to post subcategory, server responded with:",
          errorText,
        );
        throw new Error("Failed to add sub-category");
      }

      const subCategoryDataResponse = await subCategoryResponse.json();
      console.log(
        "Subcategory created successfully, received data:",
        subCategoryDataResponse,
      );

      const subCategoryId = subCategoryDataResponse._id;
      setSubCategoryId(subCategoryId);
      setShowAddSubCategoryForm(false);
      setShowServiceForm(true);
    } catch (error) {
      console.error(
        "Error during the addition of service variant or sub-category:",
        error,
      );
      setSubCategoryError(error.message || "An error occurred");
    }
  };

  const handleAddService = async (serviceData) => {
    const {
      serviceName,
      price,
      serviceTime,
      description,
      locations,
      taxPercentage,
      providerCommission,
      isMostBooked,
      tag,
      isCash, // Updated from iscash to isCash
    } = serviceData;

    const payload = {
      name: serviceName,
      description: description,
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      serviceVariants: [
        {
          serviceVariantId: serviceVariantId,
          price: price,
          serviceTime: serviceTime,
        },
      ],
      locations: locations,
      taxPercentage: taxPercentage,
      providerCommission: providerCommission,
      isMostBooked: isMostBooked,
      tag: tag,
      isCash: isCash,
      isActive: true,
      isDeleted: false,
    };

    // Console log each value to verify
    console.log("Service Name:", serviceName);
    console.log("Price:", price);
    console.log("Service Time:", serviceTime);
    console.log("Description:", description);
    console.log("Locations:", locations);
    console.log("Tax Percentage:", taxPercentage);
    console.log("Provider Commission:", providerCommission);
    console.log("Is Most Booked:", isMostBooked);
    console.log("Tag:", tag);
    console.log("Is Cash:", isCash);
    console.log("Category ID:", categoryId);
    console.log("Sub Category ID:", subCategoryId);
    console.log("Service Variant ID:", serviceVariantId);
    console.log("Payload:", payload);

    try {
      console.log("Posting service...");
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

      if (!serviceResponse.ok) {
        const errorText = await serviceResponse.text();
        console.error(
          "Failed to post service, server responded with:",
          errorText,
        );
        throw new Error("Failed to add service");
      }

      const serviceDataResponse = await serviceResponse.json();
      console.log(
        "Service created successfully, received data:",
        serviceDataResponse,
      );

      // Reset form fields and UI states upon successful completion
      setShowServiceForm(false);
      setSelectedService(null);
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
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`servermanager-menu-item ${
                    selectedCategory === category ? "selected" : ""
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        {showAddCategoryForm && (
          <CategoryForm
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
                {subCategories.map((subCategory, index) => (
                  <div
                    key={index}
                    className={`servermanager-menu-item ${
                      selectedSubCategory === subCategory ? "selected" : ""
                    }`}
                    onClick={() => handleSubCategorySelect(subCategory)}
                  >
                    {subCategory}
                  </div>
                ))}
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
            serviceVariant={serviceVariant}
            setServiceVariant={setServiceVariant}
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

            {showServiceVariantsMenu && (
              <div className="servermanager-menu">
                {(servicesMap[selectedSubCategory] || []).map(
                  (service, index) => (
                    <div
                      key={index}
                      className={`servermanager-menu-item ${
                        selectedService === service ? "selected" : ""
                      }`}
                      onClick={() => handleServiceSelect(service)}
                    >
                      {service.name}
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {showServiceForm && <AddServiceForm onSubmit={handleAddService} />}
      {selectedService && (
        <>
          <hr style={{ borderTop: "2px solid #D70D09", height: "1px" }} />
          <ServiceDetailCard
            service={selectedService}
            category={selectedCategory}
            subCategory={selectedSubCategory}
            onClose={closeServiceDetailCard}
          />
        </>
      )}
    </div>
  );
};

export default Servermanager;
