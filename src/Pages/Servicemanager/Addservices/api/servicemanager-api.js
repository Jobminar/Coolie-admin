import axios from "axios";

const API_BASE_URL = "https://api.coolieno1.in/v1.0/core";

export const fetchCategories = () => {
  return axios.get(`${API_BASE_URL}/categories`);
};

export const fetchSubcategories = (categoryId) => {
  return axios.get(`${API_BASE_URL}/sub-categories/category/${categoryId}`);
};

export const fetchServices = (categoryId, subCategoryId) => {
  return axios.get(
    `${API_BASE_URL}/services/filter/${categoryId}/${subCategoryId}`,
  );
};

export const addCategory = (formData) => {
  return axios.post(`${API_BASE_URL}/categories`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addSubCategory = (formData) => {
  return axios.post(`${API_BASE_URL}/sub-categories`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addService = (serviceData) => {
  return axios.post(`${API_BASE_URL}/services`, serviceData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateService = (serviceId, updatedService) => {
  return axios.put(`${API_BASE_URL}/services/${serviceId}`, updatedService);
};

export const deleteCategory = (categoryId) => {
  return axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
};