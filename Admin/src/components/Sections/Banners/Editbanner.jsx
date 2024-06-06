import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const EditBanner = () => {
  const location = useLocation();
  const { editdata } = location.state || {};

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  // Handle changes in text input fields
  const handleChange = (e) => {
    setName(e.target.value);
  };

  // Handle changes in file input fields
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);

      const response = await fetch(`http://13.126.118.3:3000/v1.0/admin/banners/${editdata._id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        alert('Banner edited successfully');
        console.log('Banner edited successfully');
      } else {
        console.error('Error occurred');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h1>Edit Banner</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editdata.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        {editdata.image && (
          <img src={`https://coolie1-dev.s3.ap-south-1.amazonaws.com/${editdata.image}`} alt="Uploaded" style={{ maxWidth: '100px' }} />
        )}
      </div>
      <button onClick={handleUpdate}>Submit</button>
    </div>
  );
};

export default EditBanner;
