import React, { useState } from "react";
import { TextField, MenuItem, Select, FormControlLabel, Checkbox } from '@mui/material';

function AddTraining() {
  const [formData, setFormData] = useState({
    profession: "",
    title: "",
    skip: false,
    quickLinks: false,
  });
  const { profession, title, skip, quickLinks } = formData;

  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleButtonClick = () => {
    document.getElementById('hiddenFileInput').click();
  };

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profession', profession);
    formData.append('title', title);
    formData.append('skip', skip);
    formData.append('quickLinks', quickLinks);
    formData.append('video', video);

    try {
      const response = await fetch('https://api.coolieno1.in/v1.0/admin/induction', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Form submitted');
      }
      console.log(formData);
    } catch (err) {
      alert('Error occurred');
      console.log(err, 'error');
    }
  };

  return (
    <>
      <h1 className='IThead'>Training</h1>
      <form onSubmit={handleSubmit} className='induction-form'>
        <div className="ITinputs">
          <Select
            label="Profession"
            name='profession'
            value={profession}
            onChange={handleChange}
            className='profession-select'
          >
            <MenuItem value=''>Select a service</MenuItem>
            <MenuItem value='Beautician'>Beautician</MenuItem>
            <MenuItem value='Professional cleaning'>Professional cleaning</MenuItem>
            <MenuItem value='Bathroom cleaning'>Bathroom cleaning</MenuItem>
            <MenuItem value='Washing'>Washing</MenuItem>
            <MenuItem value='AC Repair & service'>AC Repair & service</MenuItem>
            <MenuItem value='Electrician'>Electrician</MenuItem>
            <MenuItem value='Plumber'>Plumber</MenuItem>
            <MenuItem value='Laundry services'>Laundry services</MenuItem>
          </Select>
        </div>
        <div className='ITinputs'>
          <TextField
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
            label='Title'
            variant='outlined'
            margin='normal'
            fullWidth
          />
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={skip}
              onChange={handleToggleChange}
              name="skip"
              color="primary"
            />
          }
          label="Skip"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={quickLinks}
              onChange={handleToggleChange}
              name="quickLinks"
              color="primary"
            />
          }
          label="Quick links"
        />
        <div>
          <input
            type='file'
            id='hiddenFileInput'
            className='file-input'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button type='button' className='custom-button' onClick={handleButtonClick}>
            Upload Training video
          </button>
        </div>
        <div>
          <button type='submit' className='IT-button'>Submit</button>
        </div>
      </form>
    </>
  );
};

export default AddTraining;
