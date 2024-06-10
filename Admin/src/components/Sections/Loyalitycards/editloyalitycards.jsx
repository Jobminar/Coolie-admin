import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditLoyaltyCards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { editdata, apiEndpoint } = location.state || {};

  const [formData, setFormData] = useState({
    name: editdata.name || '',
    points: editdata.points || '',
    amount: editdata.amount || '',
    minimumSpentValue: editdata.minimumSpentValue || '',
    discount: editdata.discount || '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch(`http://13.126.118.3:3000/v1.0/admin/loyalty/${editdata._id}`, {
        method: 'PATCH',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Loyalty Card updated successfully');
        navigate(-1); // Navigate back to the previous page
      } else {
        alert('Error: Failed to update Loyalty Card');
      }
    } catch (err) {
      console.log('Error:', err);
      alert('An error occurred while updating Loyalty Card');
    }
  };

  return (
    <div className="edit-loyalty-cards-form">
      <h1>Edit Loyalty Cards</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="points">Points:</label>
          <input
            type="text"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="minimumSpentValue">Minimum Spent Value:</label>
          <input
            type="text"
            id="minimumSpentValue"
            name="minimumSpentValue"
            value={formData.minimumSpentValue}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="discount">Discount:</label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditLoyaltyCards;
