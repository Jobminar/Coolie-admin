// src/api/provider-form-api.js
export const fetchProviderDetails = async () => {
  console.log("Fetching provider details from the API...");
  try {
    const response = await fetch(
      "https://api.coolieno1.in/v1.0/providers/provider-details",
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
  console.log(
    "Fetching provider details from the API for providerId:",
    providerId,
  );
  try {
    const response = await fetch(
      `https://api.coolieno1.in/v1.0/providers/provider-details/${providerId}`, // Include providerId in the URL
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
