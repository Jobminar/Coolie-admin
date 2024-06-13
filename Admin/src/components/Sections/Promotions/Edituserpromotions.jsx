import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../Packages/providerpackage.css'; // Ensure you import your CSS file

const EditUserPromotion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { promotion } = location.state;
  
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
      <div className="u-main-con">
        <h1>Edit User Promotion</h1>
        <form onSubmit={handleSubmit} className="universal-edit-con">
          <div className="universal-edit">
            <p>Promotion Name:</p>
            <input
              type="text"
              name="promoName"
              value={editedPromotion.promoName}
              placeholder="Enter Promotion Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="universal-edit">
            <p>Service Type:</p>
            <input
              type="text"
              name="serviceType"
              value={editedPromotion.serviceType}
              placeholder="Enter Service Type"
              onChange={handleChange}
              required
            />
          </div>
          <div className="universal-edit">
            <p>User Type:</p>
            <input
              type="text"
              name="userType"
              value={editedPromotion.userType}
              placeholder="Enter User Type"
              onChange={handleChange}
              required
            />
          </div>
          <div className="universal-edit">
            <p>Offer Percentage:</p>
            <input
              type="number"
              name="offerPercentage"
              value={editedPromotion.offerPercentage}
              placeholder="Enter Offer Percentage"
              onChange={handleChange}
              required
            />
          </div>
          <div className="universal-edit">
            <p>Valid From:</p>
            <input
              type="date"
              name="validFrom"
              value={editedPromotion.validFrom}
              placeholder="Valid From"
              onChange={handleChange}
              required
            />
          </div>
          <div className="universal-edit">
            <p>Valid Till:</p>
            <input
              type="date"
              name="validTill"
              value={editedPromotion.validTill}
              placeholder="Valid Till"
              onChange={handleChange}
              required
            />
          </div>
          <div className="universal-edit-notify">
            <p>Notify Users</p>
            <input
              type="checkbox"
              name="notifyUsers"
              checked={editedPromotion.notifyUsers}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="update-button">Update Promotion</button>
        </form>
      </div>
    );
};

export default EditUserPromotion;
