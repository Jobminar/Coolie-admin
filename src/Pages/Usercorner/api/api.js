// api.js
export const fetchOrderedUsers = async () => {
  const response = await fetch("https://api.coolieno1.in/v1.0/users/order");
  if (!response.ok) {
    throw new Error(`Orders API returned status: ${response.status}`);
  }
  return await response.json();
};

export const fetchUsers = async () => {
  const response = await fetch("https://api.coolieno1.in/v1.0/users/userAuth");
  if (!response.ok) {
    throw new Error(`Users API returned status: ${response.status}`);
  }
  return await response.json();
};

export const fetchLoyaltyCards = async () => {
  const response = await fetch("https://api.coolieno1.in/v1.0/admin/loyalty");
  if (!response.ok) {
    throw new Error("Failed to fetch loyalty cards");
  }
  return response.json();
};
