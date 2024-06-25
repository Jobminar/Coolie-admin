import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const InductionForm = () => {
  const [formdata, setFormdata] = useState({
    profession: "",
    title: "",
    skip: false,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleToggleChange = (e) => {
    setFormdata({ ...formdata, skip: e.target.checked });
  };

  const handleFileChange = (e) => {
    setFormdata({ ...formdata, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="induction-form">
      <div className="ITinputs">
        <TextField
          select
          name="profession"
          value={formdata.profession}
          onChange={handleChange}
          label="Profession"
          variant="outlined"
          fullWidth
          SelectProps={{
            native: true,
          }}
        >
          <option value="Beautician">Beautician</option>
          <option value="Professional cleaning">Professional cleaning</option>
          <option value="Bathroom cleaning">Bathroom cleaning</option>
          <option value="Washing">Washing</option>
          <option value="AC Repair & service">AC Repair & service</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Laundry services">Laundry services</option>
        </TextField>
      </div>
      <div className="ITinputs">
        <TextField
          type="text"
          name="title"
          value={formdata.title}
          onChange={handleChange}
          label="Title"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="ITinputs">
        <label className="toggle-label">
          Skip:
          <input
            className="skip"
            type="checkbox"
            checked={formdata.skip}
            onChange={handleToggleChange}
          />
        </label>
      </div>
      <div className="ITinputs">
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className="ITinputs">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default InductionForm;
