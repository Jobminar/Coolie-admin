import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
  "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core";

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

export const addCategory = async (formData) => {
  const loadingToast = toast.loading("Adding category...");
  try {
    const response = await axios.post(`${API_BASE_URL}/categories`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.dismiss(loadingToast);
    toast.success("Category added successfully!");
    return response;
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error("Failed to add category");
    throw error;
  }
};

export const addSubCategory = async (formData) => {
  console.log("API addSubCategory FormData:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const loadingToast = toast.loading("Adding subcategory...");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/sub-categories`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    toast.dismiss(loadingToast);
    toast.success("Subcategory added successfully!");
    return response;
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error("Failed to add subcategory");
    throw error;
  }
};

export const addService = (formData) => {
  const loadingToast = toast.loading("Adding service...");

  // Ensure that the formData is an instance of FormData
  if (!(formData instanceof FormData)) {
    console.error("Provided formData is not an instance of FormData");
    toast.dismiss(loadingToast);
    toast.error("Invalid data provided");
    return;
  }

  return axios
    .post(`${API_BASE_URL}/services`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Adjust header for FormData
      },
    })
    .then((response) => {
      toast.dismiss(loadingToast);
      toast.success("Service added successfully!");
      return response;
    })
    .catch((error) => {
      toast.dismiss(loadingToast);
      toast.error("Failed to add service");
      throw error;
    });
};

export const updateService = async (serviceId, updatedService) => {
  const loadingToast = toast.loading("Updating service...");
  try {
    const response = await axios.put(
      `${API_BASE_URL}/services/${serviceId}`,
      updatedService,
    );
    toast.dismiss(loadingToast);
    toast.success("Service updated successfully!");
    return response;
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error("Failed to update service");
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  const loadingToast = toast.loading("Deleting category...");
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/categories/${categoryId}`,
    );
    toast.dismiss(loadingToast);
    toast.success("Category deleted successfully!");
    return response;
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error("Failed to delete category");
    throw error;
  }
};
// get categories by id
export const fetchCategoryById = (categoryId) => {
  return axios.get(`${API_BASE_URL}/categories/${categoryId}`);
};

export const fetchSubcategoryDetails = (subCategoryId) => {
  return axios.get(`${API_BASE_URL}/sub-categories/details/${subCategoryId}`);
};
