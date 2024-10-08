import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import "./managepromotion.css";

const Manageuserpromotions = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
      try {
        const response = await fetch(
          `${AZURE_BASE_URL}/v1.0/admin/user-promotions`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (promotion) => {
    navigate("/edit-user-promotion", {
      state: { promotion, apiEndpoint: "provider-promotions" },
    });
  };

  const handleDelete = async (id) => {
    const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
    if (!id) {
      console.log("ID not provided");
      return;
    }

    try {
      const response = await fetch(
        `${AZURE_BASE_URL}/v1.0/admin/user-promotions/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        alert("Deleted successfully");
        setData((prevData) =>
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

  return (
    <div className="manage-promotion-main-con">
      {error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        data.map((ele) => (
          <div className="u-manage-sub-con" key={ele._id}>
            <div className="u-manage-buttons">
              <h3>{ele.promoName}</h3>
              <EditOutlinedIcon
                style={{ fontSize: "30px" }}
                onClick={() => {
                  handleEdit(ele);
                }}
              />
              <DeleteOutlineOutlinedIcon
                onClick={() => handleDelete(ele._id)}
                style={{ fontSize: "30px" }}
              />
            </div>

            <p>
              <strong>Service Type:</strong> {ele.serviceType}
            </p>
            {/* <p><strong>Cities:</strong> {ele.cities.join(', ')}</p> */}
            <p>
              <strong>Number of Jobs:</strong> {ele.noOfJobs}
            </p>
            <p>
              <strong>Offer Amount:</strong> {ele.offerAmount}
            </p>
            <p>
              <strong>Valid From:</strong>{" "}
              {new Date(ele.validFrom).toLocaleDateString()}
            </p>
            <p>
              <strong>Valid Till:</strong>{" "}
              {new Date(ele.validTill).toLocaleDateString()}
            </p>
            <p>
              <strong>Notify Providers:</strong>{" "}
              {ele.notifyProviders ? "Yes" : "No"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Manageuserpromotions;
