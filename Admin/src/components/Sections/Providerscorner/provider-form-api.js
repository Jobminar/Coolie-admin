// src/api/provider-form-api.js
export const fetchProviderDetails = async () => {
  console.log("Fetching provider details from the API...");
  try {
    const response = await fetch(
      "http://13.126.118.3:3000/v1.0/providers/provider-details",
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
