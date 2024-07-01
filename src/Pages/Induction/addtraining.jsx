import React, { useState } from "react";
import { TextField, MenuItem, Select, FormControlLabel, Checkbox } from '@mui/material';
import './induction.css';

const AddTraining = () => {
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

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profession", profession),
      formData.append("title", title),
      formData.append("skip", skip),
      formData.append("quickLinks", quickLinks),
      formData.append("video", video);

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
      alert("error occured");
      console.log(err, "error");
    }
  };

  return (
    <>
      <h1 className='IThead'>Training</h1>
      <form onSubmit={handleSubmit} className="induction-form">
        <div className="ITinputs">
          <Select
            className="dropdown"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value=""><em>Select a service</em></MenuItem>
            <MenuItem value="Beautician">Beautician</MenuItem>
            <MenuItem value="Professional cleaning">Professional cleaning</MenuItem>
            <MenuItem value="Bathroom cleaning">Bathroom cleaning</MenuItem>
            <MenuItem value="Washing">Washing</MenuItem>
            <MenuItem value="AC Repair & service">AC Repair & service</MenuItem>
            <MenuItem value="Electrician">Electrician</MenuItem>
            <MenuItem value="Plumber">Plumber</MenuItem>
            <MenuItem value="Laundry services">Laundry services</MenuItem>
          </Select>
        </div>
        <div className="ITinputs">
          <TextField
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            label="Title"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="ITinputs">
          <FormControlLabel
            control={
              <Checkbox
                name="skip"
                checked={formData.skip}
                onChange={handleToggleChange}
              />
            }
            label="Skip"
          />
        </div>
        <div className="ITinputs">
          <FormControlLabel
            control={
              <Checkbox
                name="quickLinks"
                checked={formData.quickLinks}
                onChange={handleToggleChange}
              />
            }
            label="Quick links"
          />
        </div>
        <div className="ITinputs">
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="ITinputs">
          <button type="submit" className="custom-button">Submit</button>
        </div>
      </form>
    </>
  );
};

export default AddTraining;
