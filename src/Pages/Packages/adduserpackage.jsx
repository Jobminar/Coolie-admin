import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./providerpackage.css";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  packageName: Yup.string()
    .required("Package name is required")
    .min(3, "Package name must be at least 3 characters long"),
  priceRs: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive value"),
  validity: Yup.string()
    .required("Validity is required")
    .matches(
      /^[0-9]+ (months|years|days)$/,
      "Validity must be in the format '12 months', '1 year', or '5 days'",
    ),
  discount: Yup.number()
    .typeError("Discount must be a number")
    .required("Discount is required")
    .min(0, "Discount must be at least 0%")
    .max(100, "Discount cannot be more than 100%"),
  comments: Yup.string().max(200, "Comments cannot exceed 200 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
});

const AddUserPackage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Use Yup schema for validation
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    console.log("Data to be sent to API:", data); // Log the data before sending to API

    try {
      const response = await axios.post(
        "https://api.coolieno1.in/v1.0/admin/admin-user-package",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Checking if the response was successful
      if (response.status >= 200 && response.status < 300) {
        toast.success("Package added successfully!"); // Success notification
        reset(); // Reset the form
      } else {
        toast.error("Failed to add the package."); // Error notification for non-2xx responses
        console.error("Response error:", response.data); // Log the server response error
      }
    } catch (err) {
      // Handling errors more gracefully
      if (err.response) {
        // The request was made and the server responded with a status code outside 2xx range
        console.error("Server responded with an error:", err.response.data);
        toast.error(
          `Server error: ${err.response.data.message || "Unknown error"}`,
        );
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received from the server:", err.request);
        toast.error("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", err.message);
        toast.error(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="add-package-con">
      <form className="form-con" onSubmit={handleSubmit(onSubmit)}>
        {/* Package Name */}
        <TextField
          label="Package Name"
          {...register("packageName")}
          variant="outlined"
          fullWidth
          className="textFieldCustom"
          error={!!errors.packageName}
          helperText={errors.packageName?.message}
        />

        {/* Price in Rs */}
        <TextField
          label="Price in Rs"
          type="number"
          {...register("priceRs")}
          variant="outlined"
          fullWidth
          className="textFieldCustom"
          error={!!errors.priceRs}
          helperText={errors.priceRs?.message}
        />

        {/* Validity */}
        <TextField
          label="Validity"
          {...register("validity")}
          variant="outlined"
          fullWidth
          className="textFieldCustom"
          error={!!errors.validity}
          helperText={errors.validity?.message}
        />

        {/* Discount */}
        <TextField
          label="Discount (%)"
          type="number"
          {...register("discount")}
          variant="outlined"
          fullWidth
          className="textFieldCustom"
          error={!!errors.discount}
          helperText={errors.discount?.message}
        />

        {/* Comments */}
        <TextField
          label="Comments"
          {...register("comments")}
          multiline
          maxRows={4}
          variant="outlined"
          fullWidth
          className="textFieldCustom"
          error={!!errors.comments}
          helperText={errors.comments?.message}
        />

        {/* Description */}
        <TextField
          label="Description"
          {...register("description")}
          multiline
          maxRows={4}
          variant="outlined"
          fullWidth
          className="textFieldCustom"
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        {/* Submit Button */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddUserPackage;
