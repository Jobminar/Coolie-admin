import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const EditUserPromotion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { promotion, apiEndpoint } = location.state;
  
    const [editedPromotion, setEditedPromotion] = useState({
        promoName: promotion.promoName,
        serviceType: promotion.serviceType,
        userType: promotion.userType,
        offerPercentage: promotion.offerPercentage,
        validFrom: promotion.validFrom,
        validTill: promotion.validTill,
        notifyUsers: promotion.notifyUsers,
    });
      
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedPromotion((prevPromotion) => ({
          ...prevPromotion,
          [name]: type === "checkbox" ? checked : value,
        }));
    };
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        for (const key in editedPromotion) {
            formData.append(key, editedPromotion[key]);
        }
  
        const response = await fetch(
          `http://13.126.118.3:3000/v1.0/admin/user-promotions/${promotion._id}`,
          {
            method: "PATCH",
            body: formData,
          }
        );
        if (response.ok) {
          alert("Promotion updated successfully");
          navigate(-1);
        } else {
          alert("Error: Failed to update promotion.");
        }
      } catch (err) {
        console.error("Error", err);
        alert("An error occurred while updating promotion");
      }
    };
  
    return (
      <div className="edit-promotion-form">
        <h1>Edit user Promotion</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="promoName"
            value={editedPromotion.promoName}
            placeholder="Enter Promotion Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="serviceType"
            value={editedPromotion.serviceType}
            placeholder="Enter Service Type"
            onChange={handleChange}
          />
          <input
            type="text"
            name="userType"
            value={editedPromotion.userType}
            placeholder="Enter User Type"
            onChange={handleChange}
          />
          <input
            type="number"
            name="offerPercentage"
            value={editedPromotion.offerPercentage}
            placeholder="Enter Offer Percentage"
            onChange={handleChange}
          />
          <input
            type="date"
            name="validFrom"
            value={editedPromotion.validFrom}
            placeholder="Valid From"
            onChange={handleChange}
          />
          <input
            type="date"
            name="validTill"
            value={editedPromotion.validTill}
            placeholder="Valid Till"
            onChange={handleChange}
          />
          <label>
            Notify Users:
            <input
              type="checkbox"
              name="notifyUsers"
              checked={editedPromotion.notifyUsers}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    );
  };
  
  export default EditUserPromotion;
