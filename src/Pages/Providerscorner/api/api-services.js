// src/api-services.js

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
  try {
    const response = await fetch(
      `https://api.coolieno1.in/v1.0/providers/work/${providerId}`,
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
  try {
    const response = await fetch(
      `https://api.coolieno1.in/v1.0/providers/provider-certificate/${providerId}`,
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
