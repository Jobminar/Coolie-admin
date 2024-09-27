// src/api-services.js
import axios from "axios";
// Function to fetch categories from categories.json
export const fetchCategories = async () => {
  try {
    const response = await fetch("/categories.json"); // Ensure the categories.json file is available in the public directory
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return null;
  }
};

export const fetchProviderWorkDetails = async (providerId) => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  try {
    const response = await fetch(
      `${AZURE_BASE_URL}/v1.0/providers/work/${providerId}`,
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch provider work details:", error);
    return null;
  }
};

// Function to fetch provider certificates by providerId
export const fetchProviderCertificates = async (providerId) => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  try {
    const response = await fetch(
      `${AZURE_BASE_URL}/v1.0/providers/provider-certificate/${providerId}`,
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log("Fetched provider certificates:", data); // Log the data to inspect it
    return data;
  } catch (error) {
    console.error("Failed to fetch provider certificates:", error);
    return null;
  }
};

export const fetchProviders = async () => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  try {
    const response = await axios.get(
      `${AZURE_BASE_URL}/v1.0/providers/provider-details`,
    );
    console.log("Fetched providers:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching providers:", error.message);
    throw new Error("Failed to load providers");
  }
};
