import axios from "axios";

// Fetch providers list
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

// Fetch provider certificates
export const fetchProviderCertificates = async (providerId) => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  try {
    const response = await axios.get(
      `${AZURE_BASE_URL}/v1.0/providers/provider-certificate/${providerId}`,
    );
    console.log("Fetched provider certificates:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching provider certificates:", error.message);
    throw new Error("Failed to load provider documents");
  }
};

// Fetch provider details
export const fetchProviderDetails = async (providerId) => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  try {
    const response = await axios.get(
      `${AZURE_BASE_URL}/v1.0/providers/provider-details/${providerId}`,
    );
    console.log("Fetched provider details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching provider details:", error.message);
    throw new Error("Failed to load provider details");
  }
};

// Update provider certificate status
export const updateProviderCertificate = async (documentId, updateData) => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  try {
    const response = await axios.patch(
      `${AZURE_BASE_URL}/v1.0/providers/provider-certificate/${documentId}`,
      updateData,
    );
    console.log("Updated provider certificate:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating provider certificate:", error.message);
    throw new Error("Failed to update provider certificate");
  }
};

// Update provider details
export const updateProviderDetails = async (providerId, updateData) => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  try {
    console.log("Updating provider with ID:", providerId);
    console.log("Update data:", updateData);
    const response = await axios.patch(
      `${AZURE_BASE_URL}/v1.0/providers/provider-details/${providerId}`,
      updateData,
    );
    console.log("Updated provider details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating provider details:", error.message);
    throw new Error("Failed to update provider details");
  }
};
