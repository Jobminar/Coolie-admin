import React, { useState } from 'react';

const Induction = () => {
  const [data, setData] = useState({ profession: "", title: "" });
  const { profession, title } = data;
  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profession", profession);
      formData.append("title", title);
      formData.append("video", video);

      const response = await fetch("http://13.126.118.3:3000/v1.0/admin/induction", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        alert("Success: Data added successfully!");
        console.log('Success');
      } else {
        alert("Error: Failed to add data.");
        console.log('Failed to add data');
      }
    } catch (error) {
      console.log('Error:', error);
      alert("Error: An error occurred.");
    }
    console.log(profession , title , video)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='induction-form'>
        <select 
        className='dropdown'
          type='text' 
          name='profession' 
          value={profession} 
          onChange={handleChange} 
          placeholder='Profession' >
                <option>Beautician</option>
                <option>Professional cleaning</option>
                <option>Bathroom cleaning</option>
                <option>Washing</option>
                <option>AC Repair & service</option>
                <option>Electrician</option>
                <option>Plumber</option>/
                <option>Laundry services</option>
          </select>
                 
        <input 
          type='text' 
          name='title' 
          value={title} 
          onChange={handleChange} 
          placeholder='Title' 
          className='title'
        />
        <input 
          className='file-input'
          type='file' 
          onChange={handleFileChange} 
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Induction;