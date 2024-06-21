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

// Function to fetch providers from mock-provider.json
export const fetchProviders = async () => {
  try {
    const response = await fetch("/mock-provider.json"); // Ensure the mock-provider.json file is available in the public directory
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch providers:", error);
    return null;
  }
};
