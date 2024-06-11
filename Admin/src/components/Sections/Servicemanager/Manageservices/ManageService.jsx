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

const ManageService = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
  const [showEditSubCategoryForm, setShowEditSubCategoryForm] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const API_BASE_URL = "http://13.126.118.3:3000";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/v1.0/core/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const fetchSubcategories = (categoryId) => {
    axios
      .get(`${API_BASE_URL}/v1.0/core/sub-categories/category/${categoryId}`)
      .then((response) => setSubCategories(response.data))
      .catch((error) => console.error("Error fetching subcategories:", error));
  };

  const fetchServices = (categoryId, subCategoryId) => {
    axios
      .get(
        `${API_BASE_URL}/v1.0/core/services/filter/${categoryId}/${subCategoryId}`,
      )
      .then((response) => setServices(response.data.data))
      .catch((error) => console.error("Error fetching services:", error));
  };

  return (
    <div className="manageservice-container">
      <h2>Manage Service</h2>
      <div className="manageservice-card" id="category-card">
        <div className="manageservice-form-group">
          <div className="manageservice-category-header">
            <span>Select Category</span>
            <button
              className="manageservice-hamburger-icon"
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            >
              &#9776;
            </button>
          </div>
        </div>
        {showCategoryMenu && (
          <div className="manageservice-menu">
            {categories.map((category) => (
              <div
                key={category._id}
                className={`manageservice-menu-item ${
                  selectedCategory === category._id ? "selected" : ""
                }`}
              >
                <span
                  onClick={() => {
                    setSelectedCategory(category._id);
                    setSubCategories([]);
                    setServices([]);
                    fetchSubcategories(category._id);
                  }}
                >
                  {category.name}
                </span>
                <div className="manageservice-icon-group">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="manageservice-edit-icon"
                    onClick={() => {
                      setSelectedCategory(category._id);
                      setShowEditCategoryForm(true);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="manageservice-delete-icon"
                    onClick={() => {
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
      {showEditCategoryForm && (
        <EditCategoryForm
          selectedCategory={selectedCategory}
          setShowEditCategoryForm={setShowEditCategoryForm}
          API_BASE_URL={API_BASE_URL}
        />
      )}
      {selectedCategory && (
        <SubCategories
          subCategories={subCategories}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          setShowEditSubCategoryForm={setShowEditSubCategoryForm}
          fetchServices={fetchServices}
          API_BASE_URL={API_BASE_URL}
        />
      )}
      {showEditSubCategoryForm && (
        <EditSubCategoryForm
          selectedSubCategory={selectedSubCategory}
          setShowEditSubCategoryForm={setShowEditSubCategoryForm}
          API_BASE_URL={API_BASE_URL}
        />
      )}
      {selectedSubCategory && (
        <Services
          services={services}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          API_BASE_URL={API_BASE_URL}
        />
      )}
      {selectedService && (
        <EditServiceForm
          service={selectedService}
          onSave={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default ManageService;
