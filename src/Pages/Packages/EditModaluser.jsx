import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import "./providerpackage.css"; // Custom CSS with tiger-package styles

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

const EditModal = ({ packageData, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: packageData,
    resolver: yupResolver(validationSchema), // Use Yup schema for validation
  });

  const onSubmit = (data) => {
    onSave(data); // Call the save function with the updated data
  };

  const fieldStyle = { marginBottom: "20px" }; // Common margin-bottom style

  return (
    <div className="tiger-package-modal-backdrop">
      <div className="tiger-package-modal-content">
        <h2>Edit Package</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Package Name"
            {...register("packageName")}
            variant="outlined"
            fullWidth
            className="tiger-package-textFieldCustom"
            error={!!errors.packageName}
            helperText={errors.packageName?.message}
            style={fieldStyle} // Adding margin-bottom to field
          />
          <TextField
            label="Price in Rs"
            type="number"
            {...register("priceRs")}
            variant="outlined"
            fullWidth
            className="tiger-package-textFieldCustom"
            error={!!errors.priceRs}
            helperText={errors.priceRs?.message}
            style={fieldStyle} // Adding margin-bottom to field
          />
          <TextField
            label="Validity"
            {...register("validity")}
            variant="outlined"
            fullWidth
            className="tiger-package-textFieldCustom"
            error={!!errors.validity}
            helperText={errors.validity?.message}
            style={fieldStyle} // Adding margin-bottom to field
          />
          <TextField
            label="Discount (%)"
            type="number"
            {...register("discount")}
            variant="outlined"
            fullWidth
            className="tiger-package-textFieldCustom"
            error={!!errors.discount}
            helperText={errors.discount?.message}
            style={fieldStyle} // Adding margin-bottom to field
          />
          <TextField
            label="Comments"
            {...register("comments")}
            multiline
            maxRows={4}
            variant="outlined"
            fullWidth
            className="tiger-package-textFieldCustom"
            error={!!errors.comments}
            helperText={errors.comments?.message}
            style={fieldStyle} // Adding margin-bottom to field
          />
          <TextField
            label="Description"
            {...register("description")}
            multiline
            maxRows={4}
            variant="outlined"
            fullWidth
            className="tiger-package-textFieldCustom"
            error={!!errors.description}
            helperText={errors.description?.message}
            style={fieldStyle} // Adding margin-bottom to field
          />

          <div className="tiger-package-modal-actions">
            <button type="submit" className="tiger-package-submit-button">
              Save
            </button>
            <button
              type="button"
              className="tiger-package-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
