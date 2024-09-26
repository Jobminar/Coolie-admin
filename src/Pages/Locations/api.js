import axios from "axios";

const API_BASE_URL =
  "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core";

// Fetch categories
export const fetchCategories = () => {
  console.log("Fetching categories...");
  return axios.get(`${API_BASE_URL}/categories`).then((response) => {
    console.log("Categories response:", response.data); // Log categories response
    return response;
  });
};

// Fetch subcategories based on categoryId
export const fetchSubcategories = (categoryId) => {
  console.log("Fetching subcategories for categoryId:", categoryId);
  return axios
    .get(`${API_BASE_URL}/sub-categories/category/${categoryId}`)
    .then((response) => {
      console.log(
        "Subcategories response for categoryId:",
        categoryId,
        response.data,
      ); // Log subcategories response
      return response;
    });
};

// Fetch services based on categoryId and subCategoryId
export const fetchServices = (categoryId, subCategoryId) => {
  console.log(
    "Fetching services for categoryId:",
    categoryId,
    "and subCategoryId:",
    subCategoryId,
  );
  return axios
    .get(`${API_BASE_URL}/services/filter/${categoryId}/${subCategoryId}`)
    .then((response) => {
      console.log(
        "Services response for categoryId:",
        categoryId,
        "and subCategoryId:",
        subCategoryId,
        response.data,
      ); // Log services response
      return response;
    });
};
