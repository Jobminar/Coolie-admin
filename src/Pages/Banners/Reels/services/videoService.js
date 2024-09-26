import axios from "axios";

const API_URL =
  "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/reels/video";

export const uploadMedia = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to upload media.");
  }
};

export const getMedia = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch media.");
  }
};

export const deleteMedia = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete media.");
  }
};
