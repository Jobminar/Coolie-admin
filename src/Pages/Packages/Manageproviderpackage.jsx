import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./providerpackage.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ManageProviderPackages = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch(
        "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/provider-package",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch packages");
      }
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (packageItem) => {
    navigate("/edit-provider-package", { state: { package: packageItem } });
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.log("ID not provided");
      return;
    }
    console.log(id);

    try {
      const response = await fetch(
        `https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/provider-package/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        alert("Deleted successfully");
        setPackages((prevData) => prevData.filter((pkg) => pkg._id !== id));
      } else {
        alert("Error: Failed to delete package.");
      }
    } catch (err) {
      console.error("Error", err);
      alert("An error occurred while deleting");
    }
  };

  return (
    <>
      <div className="u-manage-con">
        {packages.map((packageItem, index) => (
          <div key={index} className="u-manage-sub-con">
            <div className="u-manage-buttons">
              <h3>{packageItem.packageName}</h3>
              <EditOutlinedIcon
                style={{ fontSize: "30px" }}
                onClick={() => {
                  handleEdit(packageItem);
                }}
              />
              <DeleteOutlineOutlinedIcon
                onClick={() => handleDelete(packageItem._id)}
                style={{ fontSize: "30px" }}
              />
            </div>
            <p>No of Job Offers: {packageItem.noOfJobOffers}</p>
            <p>Price in RS: {packageItem.priceRs}</p>
            <p>Price in Cr: {packageItem.priceCr}</p>
            <p>
              Discount in Platform Commission: {packageItem.discountPlatformCom}
              %
            </p>
            <p>Comments: {packageItem.comments}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageProviderPackages;
