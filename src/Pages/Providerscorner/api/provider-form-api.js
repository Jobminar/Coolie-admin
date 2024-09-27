// src/api/provider-form-api.js
export const fetchProviderDetails = async () => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  console.log("Fetching provider details from the API...");
  try {
    const response = await fetch(
      `${AZURE_BASE_URL}/v1.0/providers/provider-details`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Provider details fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch provider details:", error);
    return [];
  }
};

// src/api/provider-form-api.js
export const fetchProviderDetailsId = async (providerId) => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  console.log(
    "Fetching provider details from the API for providerId:",
    providerId,
  );
  try {
    const response = await fetch(
      `${AZURE_BASE_URL}/v1.0/providers/provider-details/${providerId}`, // Include providerId in the URL
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Provider details fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch provider details:", error);
    return null;
  }
};

// Function to fetch providers from mock-provider.json

// Function to fetch provider details from the API
export const fetchProviders = async () => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  console.log("Fetching provider details from the API...");
  try {
    const response = await fetch(
      `${AZURE_BASE_URL}/v1.0/providers/provider-details`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Provider details fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch provider details:", error);
    return [];
  }
};
// src/api-services.js
