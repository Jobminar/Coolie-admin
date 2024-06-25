import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import './induction.css'
function InductionForm() {
  const [formdata, setFormdata] = useState({
    profession: "",
    title: "",
    skip: false,
  });

  const { profession, title, skip } = formdata;
  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleToggleChange = () => {
    setFormdata((prevState) => ({
      ...prevState,
      skip: !prevState.skip,
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
    formData.append('video', video);

    try {
      const response = await fetch('http://13.126.118.3:3000/v1.0/admin/induction', {
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
      <h1 className='IThead'>Induction</h1>
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
      <div className="ITinputs">
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

        <div>
          <input
            type='file'
            id='hiddenFileInput'
            className='file-input'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button type='button' className='custom-button' onClick={handleButtonClick}>
            Upload Induction video
          </button>
        </div>
      

      <div>
        <button type='submit' className='IT-button'>Submit</button>
      </div>
      </form>
    </>
   
  );
}

export default InductionForm;
