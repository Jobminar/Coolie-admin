import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Services from "./Services";
import EditCategoryForm from "./EditCategoryForm";
import EditSubCategoryForm from "./EditSubCategoryForm";
import EditServiceForm from "./EditServiceForm";
import "./manageservice.css";

const ManageService = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
  const [showEditSubCategoryForm, setShowEditSubCategoryForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);

  const API_BASE_URL = "http://13.126.118.3:3000";
  const AWS_BASE_URL = "https://coolie1-dev.s3.amazonaws.com";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/v1.0/core/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const fetchSubcategories = (categoryId) => {
    axios
      .get(`${API_BASE_URL}/v1.0/core/sub-categories/category/${categoryId}`)
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch((error) => console.error("Error fetching subcategories:", error));
  };

  const fetchServices = (categoryId, subCategoryId) => {
    axios
      .get(
        `${API_BASE_URL}/v1.0/core/services/filter/${categoryId}/${subCategoryId}`,
      )
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((error) => console.error("Error fetching services:", error));
  };

  return (
    <div className="manageservice-container">
      <h2>Manage Service</h2>
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setShowEditCategoryForm={setShowEditCategoryForm}
        fetchSubcategories={fetchSubcategories}
        setSubCategories={setSubCategories}
        setServices={setServices}
        API_BASE_URL={API_BASE_URL}
      />
      {showEditCategoryForm && (
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
          fetchServices={fetchServices}
          API_BASE_URL={API_BASE_URL}
          selectedCategory={selectedCategory}
        />
      )}
      {showEditSubCategoryForm && (
        <EditSubCategoryForm
          selectedSubCategory={selectedSubCategory}
          setShowEditSubCategoryForm={setShowEditSubCategoryForm}
          API_BASE_URL={API_BASE_URL}
          AWS_BASE_URL={AWS_BASE_URL}
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
          onSave={(updatedService) => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default ManageService;
