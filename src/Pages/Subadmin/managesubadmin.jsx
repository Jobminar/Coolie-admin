import React, { useState, useEffect } from "react";
import "./managesubadmin.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Managesubadmin = () => {
  const [subAdmins, setSubAdmins] = useState([]);

  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const response = await fetch("${AZURE_BASE_URL}/v1.0/admin/sub-admin");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSubAdmins(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSubAdmins();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      console.log("ID not provided");
      return;
    }
    console.log(id);

    try {
      const response = await fetch(
        `${AZURE_BASE_URL}/v1.0/admin/sub-admin/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        alert("Deleted successfully");
        setPackages((prevData) =>
          prevData.filter((promotion) => promotion._id !== id),
        );
      } else {
        alert("Error: Failed to delete promotion.");
      }
    } catch (err) {
      console.error("Error", err);
      alert("An error occurred while deleting");
    }
  };

  const handleEdit = (packageItem) => {
    navigate("/edituserpackage", { state: { package: packageItem } });
  };

  return (
    <>
      <h1>Manage Subadmins</h1>
      <div className="manage-sa-main-con">
        {subAdmins.map((subAdmin) => (
          <div className="manage-sa-sub-con">
            <div className="sd-img-con"></div>
            <p>{subAdmin.fullName}</p>
            <div className="sa-button-con">
              <EditOutlinedIcon
                style={{ fontSize: "30px" }}
                onClick={() => {
                  handleEdit(packageItem);
                }}
              />
              <DeleteOutlineOutlinedIcon
                onClick={() => handleDelete(subAdmin._id)}
                style={{ fontSize: "30px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Managesubadmin;
