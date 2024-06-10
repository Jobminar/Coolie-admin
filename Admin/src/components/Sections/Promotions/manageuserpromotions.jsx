
  import React, { useEffect, useState } from 'react';
  import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
  import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
  import { useNavigate } from "react-router-dom";
  import './managepromotion.css';
  
  const Manageuserpromotions = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://13.126.118.3:3000/v1.0/admin/user-promotions');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData = await response.json();
          setData(jsonData);
        } catch (err) {
          setError(err.message);
          console.error('Error fetching data:', err);
        }
      };
  
      fetchData();
    }, []);
  
    const handleEdit = (promotion) => {
      navigate("/edituserpromotion", { state: { promotion, apiEndpoint: 'provider-promotions' } });
    };
  
    const handleDelete = async (id) => {
      if (!id) {
        console.log("ID not provided");
        return;
      }
  
      try {
        const response = await fetch(`http://13.126.118.3:3000/v1.0/admin/user-promotions/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          alert("Deleted successfully");
          setData((prevData) => prevData.filter((promotion) => promotion._id !== id));
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
            <div className="manage-promotion-con" key={ele._id}>
              <div className="promotion-header">
                <h1>{ele.promoName}</h1>
                <div className="promotion-actions">
                  <EditOutlinedIcon onClick={() => handleEdit(ele)} />
                  <DeleteOutlineOutlinedIcon onClick={() => handleDelete(ele._id)} />
                </div>
              </div>
              <p><strong>Service Type:</strong> {ele.serviceType}</p>
              {/* <p><strong>Cities:</strong> {ele.cities.join(', ')}</p> */}
              <p><strong>Number of Jobs:</strong> {ele.noOfJobs}</p>
              <p><strong>Offer Amount:</strong> {ele.offerAmount}</p>
              <p><strong>Valid From:</strong> {new Date(ele.validFrom).toLocaleDateString()}</p>
              <p><strong>Valid Till:</strong> {new Date(ele.validTill).toLocaleDateString()}</p>
              <p><strong>Notify Providers:</strong> {ele.notifyProviders ? 'Yes' : 'No'}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default Manageuserpromotions;
  