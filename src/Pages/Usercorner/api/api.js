// api.js
export const fetchOrderedUsers = async () => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  const response = await fetch(`${AZURE_BASE_URL}/v1.0/users/order`);
  if (!response.ok) {
    throw new Error(`Orders API returned status: ${response.status}`);
  }
  return await response.json();
};

export const fetchUsers = async () => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  const response = await fetch(`${AZURE_BASE_URL}/v1.0/users/userAuth`);
  if (!response.ok) {
    throw new Error(`Users API returned status: ${response.status}`);
  }
  return await response.json();
};

export const fetchLoyaltyCards = async () => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  const response = await fetch(`${AZURE_BASE_URL}/v1.0/admin/loyalty`);
  if (!response.ok) {
    throw new Error("Failed to fetch loyalty cards");
  }
  return response.json();
};
