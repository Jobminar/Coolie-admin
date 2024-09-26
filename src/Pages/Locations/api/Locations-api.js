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
        "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/locations/post",
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
    handleError(error);
  }
};

/**
 * Function to add a pincode using the Mapbox API
 * @param {string} pincode - The pincode to search for
 */
export const fetchPincodeLocation = async (pincode) => {
  const mapboxToken =
    "pk.eyJ1IjoiY29vbGllbm8xLWFkbWluIiwiYSI6ImNsdWZjZGR1ZzBtZHcybnJvaHBiYTd2NzMifQ.TQ6FrqUIUUWv7J7n75A3tQ"; // Replace with your token
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pincode}.json?access_token=${mapboxToken}`;

  try {
    const response = await axios.get(mapboxUrl);
    if (!response.data.features || response.data.features.length === 0) {
      throw new Error("No location found for the given pincode.");
    }
    return response.data.features[0]; // Return the first result
  } catch (error) {
    handleError(error);
  }
};

/**
 * Function to upload CSV file to the server
 * @param {File} file - The CSV file to upload
 * @param {string} group - The selected group for the file
 */
export const uploadCsvFile = async (file, group) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("group", group);

  try {
    const response = await axios.post(
      "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/locations/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Utility function to handle API errors
 * @param {Error} error - The error thrown by the API
 */
const handleError = (error) => {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    console.error("Status Code:", error.response.status);
    console.error("Headers:", error.response.headers);
    throw new Error(
      `Failed to complete the request. Status: ${error.response.status} - ${
        error.response.data.message || "Unknown error"
      }`,
    );
  } else if (error.request) {
    console.error("No Response received:", error.request);
    throw new Error("No response received from server.");
  } else {
    console.error("Error in setting up the request:", error.message);
    throw new Error("Request setup error.");
  }
};

/**
 * Function to delete a location by its ID
 * @param {string} id - The ID of the location to delete
 */
export const deleteLocation = async (id) => {
  try {
    const response = await axios.delete(
      `https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/locations/delete/${id}`,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error deleting location:", error.response.data);
      throw new Error(
        `Failed to delete location. Status: ${error.response.status} - ${
          error.response.data.message || "Unknown error"
        }`,
      );
    } else if (error.request) {
      console.error(
        "No response received while deleting location:",
        error.request,
      );
      throw new Error("No response received from server.");
    } else {
      console.error("Error in deleting request:", error.message);
      throw new Error("Request setup error.");
    }
  }
};
