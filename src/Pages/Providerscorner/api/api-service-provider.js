import axios from "axios";

const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
const BASE_URL = `${AZURE_BASE_URL}/v1.0/providers`;

// Function to generate OTP
export const generateOtp = async (phone) => {
  try {
    console.log("Generating OTP for phone:", phone);
    const response = await axios.post(`${BASE_URL}/provider-auth/signup`, {
      phone,
    });
    console.log("OTP generated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error generating OTP:", error);
    throw new Error("Error generating OTP");
  }
};

// Function to verify OTP
export const verifyOtp = async (otp) => {
  try {
    console.log("Verifying OTP:", otp);
    const response = await axios.post(`${BASE_URL}/provider-auth/verify-otp`, {
      otp,
    });
    console.log("OTP verified:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Error verifying OTP");
  }
};

// Function to validate provider details
const validateProviderDetails = (formData) => {
  const errors = {};
  if (!formData.get("providerName"))
    errors.providerName = "Provider name is required";
  if (!formData.get("image")) errors.image = "Image is required";
  if (!formData.get("age")) errors.age = "Age is required";
  if (!formData.get("phone")) errors.phone = "Phone number is required";
  if (!formData.get("pincode")) errors.pincode = "Pincode is required";
  if (!formData.get("radius")) errors.radius = "Radius is required";
  if (!formData.get("work")) errors.work = "Work is required";
  return errors;
};

// Function to submit provider details
export const submitProviderDetails = async (formData) => {
  const errors = validateProviderDetails(formData);
  if (Object.keys(errors).length > 0) {
    console.error("Validation errors:", errors);
    throw errors;
  }
  try {
    console.log("Submitting provider details:", formData);
    const response = await axios.post(`${BASE_URL}/provider-details`, formData);
    console.log("Provider details submitted:", response.data);
    sessionStorage.setItem("providerDetails", JSON.stringify(response.data));
    sessionStorage.setItem("providerDetailsSubmitted", true);
    alert("Provider details submitted successfully!");
    return response.data;
  } catch (error) {
    console.error("Error submitting provider details:", error);
    throw new Error("Error submitting provider details");
  }
};

// Function to validate finance details
const validateFinanceDetails = (formData) => {
  const errors = {};
  const requiredFields = [
    "accountName",
    "accountNumber",
    "bankName",
    "ifscCode",
    "branch",
    "branchAddress",
  ];
  requiredFields.forEach((field) => {
    if (!formData.get(field)) {
      errors[field] = `${field} is required`;
    }
  });
  if (!formData.has("documents")) {
    errors.documents = "Documents are required";
  }
  return errors;
};

// Function to submit finance details
export const submitFinanceDetails = async (formData) => {
  const errors = validateFinanceDetails(formData);
  if (Object.keys(errors).length > 0) {
    console.error("Validation errors:", errors);
    throw errors;
  }
  try {
    console.log("Submitting finance details:", formData);
    const response = await axios.post(`${BASE_URL}/provider-finance`, formData);
    console.log("Finance details submitted:", response.data);
    sessionStorage.setItem("financeDetails", JSON.stringify(response.data));
    alert("Finance details submitted successfully!");
    return response.data;
  } catch (error) {
    console.error("Error submitting finance details:", error);
    throw new Error("Error submitting finance details");
  }
};
