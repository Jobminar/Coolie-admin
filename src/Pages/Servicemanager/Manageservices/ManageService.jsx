import React, { useState, useEffect } from "react";
import axios from "axios";
import SubCategories from "./SubCategories";
import Services from "./Services";
import EditCategoryForm from "./EditCategoryForm";
import EditSubCategoryForm from "./EditSubCategoryForm";
import EditServiceForm from "./EditServiceForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import "./styles/manageservice.css";

const API_BASE_URL = "https://api.coolieno1.in";
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
  const [loading, setLoading] = useState(false);
  const [subCategoriesError, setSubCategoriesError] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/v1.0/core/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories.");
      })
      .finally(() => setLoading(false));
  };

  const fetchSubcategories = (categoryId) => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/v1.0/core/sub-categories/category/${categoryId}`)
      .then((response) => {
        setSubCategories(response.data);
        setSubCategoriesError(false);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
        setSubCategoriesError(true);
        toast.error("Error fetching subcategories.");
      })
      .finally(() => setLoading(false));
  };

  const fetchServices = (categoryId, subCategoryId) => {
    setLoading(true);
    axios
      .get(
        `${API_BASE_URL}/v1.0/core/services/filter/${categoryId}/${subCategoryId}`,
      )
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        toast.error("Error fetching services.");
      })
      .finally(() => setLoading(false));
  };

  const updateSubCategoryInParent = (updatedSubCategory) => {
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
    setSelectedCategory(category);
    fetchSubcategories(category._id);
    setSubCategories([]);
    setServices([]);
    setSelectedSubCategory(null);
    setSelectedService(null);
    setShowEditSubCategoryForm(false);
    setShowServiceVariantsMenu(false);
  };

  const handleSaveService = async (updatedService, serviceId) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/v1.0/core/services/${serviceId}`,
        updatedService,
      );
      toast.success("Service updated successfully.");
      setSelectedService(null);
      if (selectedCategory && selectedSubCategory) {
        fetchServices(selectedCategory._id, selectedSubCategory._id);
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Error updating service.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setLoading(true);
            axios
              .delete(`${API_BASE_URL}/v1.0/core/categories/${categoryId}`)
              .then(() => {
                setCategories((prev) =>
                  prev.filter((cat) => cat._id !== categoryId),
                );
                toast.success("Category deleted successfully.");
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error deleting category:", error);
                toast.error("Error deleting category.");
              })
              .finally(() => setLoading(false));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="manageServiceContainer">
      <Toaster /> {/* Add Toaster component */}
      <h2>Manage Service</h2>
      {loading && <div className="loading">Loading...</div>}
      <div className="manageServiceCardContainer">
        <div className="manageServiceCard" id="categoryCard">
          <div className="manageServiceFormGroup">
            <div className="manageServiceCategoryHeader">
              <span>Select Category</span>
              <button
                className="manageServiceHamburgerIcon"
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
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
                        confirmAlert({
                          title: "Confirm",
                          message:
                            "Are you sure you want to edit this category?",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: () => {
                                setSelectedCategory(category);
                                fetchSubcategories(category._id);
                                setShowEditCategoryForm(true);
                              },
                            },
                            {
                              label: "No",
                            },
                          ],
                        });
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="manageServiceDeleteIcon"
                      onClick={() => handleDeleteCategory(category._id)}
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
            subCategoriesError={subCategoriesError}
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
            onSave={(updatedService) =>
              handleSaveService(updatedService, selectedService._id)
            }
            onClose={handleCloseServiceForm}
          />
        )}
      </div>
    </div>
  );
};

export default ManageService;
