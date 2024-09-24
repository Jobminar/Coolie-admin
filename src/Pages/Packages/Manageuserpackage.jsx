import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModaluser from "./EditModaluser"; // Import EditModal
import "./providerpackage.css"; // Your custom CSS

const ManageUserPackage = () => {
  const [packages, setPackages] = useState([]); // Store the packages
  const [loading, setLoading] = useState(false); // Handle loading state
  const [editingPackage, setEditingPackage] = useState(null); // Store the package being edited
  const [showModal, setShowModal] = useState(false); // Show/Hide the edit modal

  useEffect(() => {
    fetchPackages(); // Fetch packages on component mount
  }, []);

  // Fetch packages from the server
  const fetchPackages = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        "https://api.coolieno1.in/v1.0/admin/admin-user-package",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch packages");
      }
      const data = await response.json();
      setPackages(data); // Set the fetched packages to state
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch packages");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Package ID not found.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await fetch(
          `https://api.coolieno1.in/v1.0/admin/admin-user-package/${id}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          toast.success("Package deleted successfully.");
          setPackages((prevData) =>
            prevData.filter((packageItem) => packageItem._id !== id),
          );
        } else {
          toast.error("Failed to delete package.");
        }
      } catch (err) {
        console.error("Error deleting package", err);
        toast.error("An error occurred while deleting the package.");
      }
    }
  };

  // Handle edit functionality (open modal)
  const handleEdit = (packageItem) => {
    setEditingPackage(packageItem); // Set the package to edit
    setShowModal(true); // Show the modal
  };

  // Handle closing the modal
  const closeModal = () => {
    setShowModal(false); // Close the modal
    setEditingPackage(null); // Clear the selected package
  };

  // Handle updating the package in the modal
  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(
        `https://api.coolieno1.in/v1.0/admin/admin-user-package/${editingPackage._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (response.ok) {
        const updatedPackage = await response.json();
        // Update the state with the edited package
        setPackages((prevData) =>
          prevData.map((pkg) =>
            pkg._id === updatedPackage._id ? updatedPackage : pkg,
          ),
        );
        toast.success("Package updated successfully.");
        closeModal(); // Close the modal after successful update
      } else {
        toast.error("Failed to update package.");
      }
    } catch (error) {
      console.error("Error updating package", error);
      toast.error("An error occurred while updating the package.");
    }
  };

  return (
    <div className="u-manage-con">
      {loading ? (
        <p>Loading packages...</p>
      ) : (
        packages.map((packageItem, index) => (
          <div key={index} className="u-manage-sub-con">
            <div className="u-manage-buttons">
              <h3>{packageItem.packageName}</h3>
              {/* Edit button */}
              <EditOutlinedIcon
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={() => handleEdit(packageItem)}
              />
              {/* Delete button */}
              <DeleteOutlineOutlinedIcon
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={() => handleDelete(packageItem._id)}
              />
            </div>
            <p>Price in RS: {packageItem.priceRs}</p>
            <p>Validity: {packageItem.validity}</p>
            <p>Discount: {packageItem.discount}%</p>
            <p>Comments: {packageItem.comments}</p>
            <p>Description: {packageItem.description}</p>
          </div>
        ))
      )}

      {/* Edit Modal */}
      {showModal && editingPackage && (
        <EditModaluser
          packageData={editingPackage}
          onClose={closeModal}
          onSave={handleUpdate}
        />
      )}

      {/* Toastify container for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default ManageUserPackage;
