import axios from "axios";

/**
 * Function to send each formatted location to the API individually
 * @param {Array} locations - Array of formatted location objects
 */
export const saveLocations = async (locations) => {
  console.log("Locations sent to API:", JSON.stringify(locations, null, 2)); // Log the locations being sent

  try {
    // Send each location individually to the API
    for (const location of locations) {
      const response = await axios.post(
        "https://api.coolieno1.in/v1.0/core/locations/post",
        location, // Send each location object
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(
        "API Response for location:",
        location.pincode,
        response.data,
      ); // Log successful response for each location
    }

    return { message: "All locations saved successfully." };
  } catch (error) {
    if (error.response) {
      // The request was made, and the server responded with a status code outside the range of 2xx
      console.error("API Error Response:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
      throw new Error(
        `Failed to save location. Status: ${error.response.status} - ${
          error.response.data.message || "Unknown error"
        }`,
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No Response received:", error.request);
      throw new Error(
        "Failed to save location. No response received from server.",
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error in setting up the request:", error.message);
      throw new Error("Failed to save location. Request setup error.");
    }
  }
};
