import React, { useState } from "react";

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
      const responce = await fetch(
        "https://api.coolieno1.in/v1.0/admin/induction",
        {
          method: "POST",
          body: formData,
        },
      );
      if (responce.ok) {
        alert("Form submitted");
      }
      console.log(formData);
    } catch (err) {
      alert("error occured");
      console.log(err, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="induction-form">
      <select
        className="dropdown"
        name="profession"
        value={formData.profession}
        onChange={handleChange}
        placeholder="Profession"
      >
        <option value="">Select a service</option>
        <option value="Beautician">Beautician</option>
        <option value="Professional cleaning">Professional cleaning</option>
        <option value="Bathroom cleaning">Bathroom cleaning</option>
        <option value="Washing">Washing</option>
        <option value="AC Repair & service">AC Repair & service</option>
        <option value="Electrician">Electrician</option>
        <option value="Plumber">Plumber</option>
        <option value="Laundry services">Laundry services</option>
      </select>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <label className="toggle-label">
        Skip:
        <input
          name="skip"
          type="checkbox"
          checked={formData.skip}
          onChange={handleToggleChange}
        />
      </label>

      <label className="toggle-label">
        Quick links:
        <input
          name="quickLinks"
          type="checkbox"
          checked={formData.quickLinks}
          onChange={handleToggleChange}
        />
      </label>

      <input type="file" onChange={handleFileChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTraining;
