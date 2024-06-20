import React, { useState, useEffect } from "react";
import axios from "axios";
import SubCategories from "./SubCategories";
import Services from "./Services";
import EditCategoryForm from "./EditCategoryForm";
import EditSubCategoryForm from "./EditSubCategoryForm";
import EditServiceForm from "./EditServiceForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./manageservice.css";

const API_BASE_URL = "http://13.126.118.3:3000";
const AWS_BASE_URL = "https://coolie1-dev.s3.ap-south-1.amazonaws.com";

const ManageService = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
  const [showEditSubCategoryForm, setShowEditSubCategoryForm] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(true);
  const [showSubCategoryMenu, setShowSubCategoryMenu] = useState(true);
  const [showServiceVariantsMenu, setShowServiceVariantsMenu] = useState(true);

  useEffect(() => {
    console.log("Fetching categories from API...");
    axios
      .get(`${API_BASE_URL}/v1.0/core/categories`)
      .then((response) => {
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const fetchSubcategories = (categoryId) => {
    console.log(`Fetching subcategories for category ID: ${categoryId}`);
    axios
      .get(`${API_BASE_URL}/v1.0/core/sub-categories/category/${categoryId}`)
      .then((response) => {
        console.log("Fetched subcategories:", response.data);
        setSubCategories(response.data);
      })
      .catch((error) => console.error("Error fetching subcategories:", error));
  };

  const fetchServices = (categoryId, subCategoryId) => {
    console.log(
      `Fetching services for category ID: ${categoryId}, sub-category ID: ${subCategoryId}`,
    );
    axios
      .get(
        `${API_BASE_URL}/v1.0/core/services/filter/${categoryId}/${subCategoryId}`,
      )
      .then((response) => {
        console.log("Fetched services:", response.data.data);
        setServices(response.data.data);
      })
      .catch((error) => console.error("Error fetching services:", error));
  };

  const updateSubCategoryInParent = (updatedSubCategory) => {
    console.log("Updating subcategory in parent state:", updatedSubCategory);
    setSubCategories((prevSubCategories) =>
      prevSubCategories.map((subCategory) =>
        subCategory._id === updatedSubCategory._id
          ? updatedSubCategory
          : subCategory,
      ),
    );
  };

  useEffect(() => {
    if (showEditSubCategoryForm && selectedSubCategory) {
      fetchServices(selectedCategory._id, selectedSubCategory._id);
    }
  }, [showEditSubCategoryForm, selectedSubCategory]);

  const handleCloseServiceForm = () => {
    setSelectedService(null);
  };

  const handleCategorySelection = (category) => {
    console.log("Category selected:", category);
    setSelectedCategory(category);
    fetchSubcategories(category._id);
    setSubCategories([]);
    setServices([]);
    setSelectedSubCategory(null);
    setSelectedService(null);
    setShowEditSubCategoryForm(false);
    setShowServiceVariantsMenu(false);
  };

  return (
    <div className="manageServiceContainer">
      <h2>Manage Service</h2>
      <div className="manageServiceCardContainer">
        <div className="manageServiceCard" id="categoryCard">
          <div className="manageServiceFormGroup">
            <div className="manageServiceCategoryHeader">
              <span>Select Category</span>
              <button
                className="manageServiceHamburgerIcon"
                onClick={() => {
                  console.log("Toggling category menu visibility");
                  setShowCategoryMenu(!showCategoryMenu);
                }}
              >
                &#9776;
              </button>
            </div>
          </div>
          {showCategoryMenu && (
            <div className="manageServiceMenu">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className={`manageServiceMenuItem ${
                    selectedCategory?._id === category._id ? "selected" : ""
                  }`}
                >
                  <span onClick={() => handleCategorySelection(category)}>
                    {category.name}
                  </span>
                  <div className="manageServiceIconGroup">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="manageServiceEditIcon"
                      onClick={() => {
                        console.log("Editing category:", category);
                        setSelectedCategory(category);
                        fetchSubcategories(category._id);
                        setShowEditCategoryForm(true);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="manageServiceDeleteIcon"
                      onClick={() => {
                        console.log("Deleting category:", category);
                        axios
                          .delete(
                            `${API_BASE_URL}/v1.0/core/categories/${category._id}`,
                          )
                          .then(() =>
                            setCategories((prev) =>
                              prev.filter((cat) => cat._id !== category._id),
                            ),
                          )
                          .catch((error) =>
                            console.error("Error deleting category:", error),
                          );
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {showEditCategoryForm && selectedCategory && (
          <EditCategoryForm
            selectedCategory={selectedCategory}
            setShowEditCategoryForm={setShowEditCategoryForm}
            API_BASE_URL={API_BASE_URL}
            AWS_BASE_URL={AWS_BASE_URL}
          />
        )}
        {selectedCategory && (
          <SubCategories
            subCategories={subCategories}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            setShowEditSubCategoryForm={setShowEditSubCategoryForm}
            setShowSubCategoryMenu={setShowSubCategoryMenu}
            showSubCategoryMenu={showSubCategoryMenu}
            setSubCategories={setSubCategories}
            fetchServices={fetchServices}
            API_BASE_URL={API_BASE_URL}
            selectedCategory={selectedCategory._id}
          />
        )}
        {showEditSubCategoryForm && selectedSubCategory && (
          <EditSubCategoryForm
            selectedSubCategory={selectedSubCategory}
            setShowEditSubCategoryForm={setShowEditSubCategoryForm}
            API_BASE_URL={API_BASE_URL}
            AWS_BASE_URL={AWS_BASE_URL}
            updateSubCategoryInParent={updateSubCategoryInParent}
            fetchServices={fetchServices}
            selectedCategory={selectedCategory._id}
          />
        )}
        {selectedSubCategory && (
          <Services
            services={services}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            setServices={setServices}
            setShowServiceVariantsMenu={setShowServiceVariantsMenu}
            showServiceVariantsMenu={showServiceVariantsMenu}
            API_BASE_URL={API_BASE_URL}
          />
        )}
        {selectedService && (
          <EditServiceForm
            service={selectedService}
            category={selectedCategory._id}
            subCategory={selectedSubCategory._id}
            onSave={(updatedService) => {
              console.log("Service save callback", updatedService);
              setSelectedService(null);
            }}
            onClose={handleCloseServiceForm}
          />
        )}
      </div>
    </div>
  );
};

export default ManageService;
