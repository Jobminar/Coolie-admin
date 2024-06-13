import React, { useState } from 'react';
import './induction.css';

const AddInduction = () => {
  const [data, setData] = useState({ selectedProfessions: [], title: '' });
  const [video, setVideo] = useState(null);

  const professions = [
    'Beautician',
    'Professional cleaning',
    'Bathroom cleaning',
    'Washing',
    'AC Repair & service',
    'Electrician',
    'Plumber',
    'Laundry services'
  ];

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setData(prevState => {
      const { selectedProfessions } = prevState;
      if (checked) {
        return { ...prevState, selectedProfessions: [...selectedProfessions, name] };
      } else {
        return { ...prevState, selectedProfessions: selectedProfessions.filter(profession => profession !== name) };
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Change - Name: ${name}, Value: ${value}`); // Debug log
    setData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Commented out API call for debugging purposes
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('video', video);
      data.selectedProfessions.forEach((profession, index) => {
        formData.append(`profession[${index}]`, profession);
      });

      const response = await fetch('http://13.126.118.3:3000/v1.0/admin/induction', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Success: Data added successfully!');
        console.log('Success');
      } else {
        alert('Error: Failed to add data.');
        console.log('Failed to add data');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Error: An error occurred.');
    }
    console.log('Form Data:', data);
    console.log('Title:', data.title);
    console.log('Selected Professions:', data.selectedProfessions);
    console.log('Video:', video);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='add-induction-form'>
        <div className="checkbox-group">
          {professions.map((profession, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={profession}
                checked={data.selectedProfessions.includes(profession)}
                onChange={handleCheckboxChange}
              />
              <label>{profession}</label>
            </div>
          ))}
        </div>
        
        <input
          type='text'
          name='title'
          value={data.title}
          onChange={handleInputChange}
          placeholder='Title'
        />
        

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default AddInduction;
