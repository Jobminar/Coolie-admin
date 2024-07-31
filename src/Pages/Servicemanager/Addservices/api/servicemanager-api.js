import axios from "axios";

const API_BASE_URL = "http://13.126.118.3:3000/v1.0/core";

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

export const addService = (formData) => {
  console.log("the formData sent to api", formData);

  // Ensure that the formData is an instance of FormData
  if (!(formData instanceof FormData)) {
    console.error("Provided formData is not an instance of FormData");
    return;
  }

  return axios.post(`${API_BASE_URL}/services`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Adjust header for FormData
    },
  });
};

export const updateService = (serviceId, updatedService) => {
  return axios.put(`${API_BASE_URL}/services/${serviceId}`, updatedService);
};

export const deleteCategory = (categoryId) => {
  return axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
};
