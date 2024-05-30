import React, { useState } from 'react';

const Addsubadmin = () => {
  const [addadmin, setAddadmin] = useState({
    fullname: '',
    mobileno: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddadmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', addadmin);
  };

  return (
    <>
      <h2>Add Subadmin</h2>
      <div className='add-sub-admin'>
        <form onSubmit={handleSubmit}>
          <input
            placeholder='Enter your Name'
            value={addadmin.fullname}
            onChange={handleChange}
            name='fullname'
            type='text'
          />
          <input
            placeholder='Enter your Mobile No'
            value={addadmin.mobileno}
            onChange={handleChange}
            name='mobileno'
            type='text'
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Addsubadmin;
