import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Editloyalitycards = () => {
  // Use useLocation hook to access location state
  const location = useLocation();
  const { editdata } = location.state || {};

  // Define state to hold form data
  const [formData, setFormData] = useState(editdata || {});
  const { name, image } = formData;

  // Handle changes in text input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes in file input fields
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // You may want to handle file upload or manipulation here
    console.log('File uploaded:', file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);

      const response = await fetch('your-api-endpoint', {
        method: 'PATCH', // Or 'PUT' depending on your API endpoint
        body: formData,
      });

      if (response.ok) {
        alert('Loyalty Cards Edited');
        console.log('Loyalty Cards Edited');
      } else {
        console.log('Error occurred');
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <>
      {/* Display the received data */}
      <h1>Edit Loyalty Cards</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={image || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image Preview:</label>
          {image && (
            <img
              src={`https://coolie1-dev.s3.ap-south-1.amazonaws.com/${image}`}
              alt="Loyalty Card"
              style={{ maxWidth: '200px' }}
            />
          )}
        </div>
        {/* Add more fields as needed */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Editloyalitycards;
