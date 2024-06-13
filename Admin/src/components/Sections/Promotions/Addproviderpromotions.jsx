import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import '../Packages/providerpackage.css';

const Addpropromotions = () => {
  const [addPromo, setAddPromo] = useState({
    promoName: '',
    serviceType: '',
    cities: '',
    noOfJobs: '',
    offerAmount: '',
    validFrom: '',
    validTill: '',
    notifyProviders: true
  });

  const { promoName, serviceType, cities, noOfJobs, offerAmount, validFrom, validTill, notifyProviders } = addPromo;

  const handleChange = (e) => {
    setAddPromo({ ...addPromo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addPromo);
    try {
      const response = await fetch('http://13.126.118.3:3000/v1.0/admin/provider-promotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addPromo)
      });
      if (response.ok) {
        alert('Form data submitted successfully');
      } else {
        alert('Error while submitting');
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <div className='add-package-con'>
      <form onSubmit={handleSubmit} className='form-con'>
        <TextField
          type='text'
          name='promoName'
          value={promoName}
          onChange={handleChange}
          label='Promotion Name'
          variant='outlined'
          margin='normal'
          fullWidth
          className='textFieldCustom'
          required
        />
        <TextField
          select
          name='serviceType'
          value={serviceType}
          onChange={handleChange}
          label='Service Type'
          variant='outlined'
          margin='normal'
          fullWidth
          className='textFieldCustom'
          SelectProps={{
            native: true,
          }}
          required
        >
          <option>Beautician</option>
          <option>Professional cleaning</option>
          <option>Bathroom cleaning</option>
          <option>Washing</option>
          <option>AC Repair & service</option>
          <option>Electrician</option>
          <option>Plumber</option>
          <option>Laundry services</option>
        </TextField>
        <TextField
          type='text'
          name='cities'
          value={cities}
          onChange={handleChange}
          label='Cities'
          variant='outlined'
          margin='normal'
          fullWidth
          className='textFieldCustom'
          required
        />
        <TextField
          type='number'
          name='noOfJobs'
          value={noOfJobs}
          onChange={handleChange}
          label='Number of Jobs'
          variant='outlined'
          margin='normal'
          fullWidth
          className='textFieldCustom'
          required
        />
        <TextField
          type='number'
          name='offerAmount'
          value={offerAmount}
          onChange={handleChange}
          label='Offer Amount'
          variant='outlined'
          margin='normal'
          fullWidth
          className='textFieldCustom'
          required
        />
        <TextField
          type='date'
          name='validFrom'
          value={validFrom}
          onChange={handleChange}
          label='Valid From'
          variant='outlined'
          margin='normal'
          fullWidth
          className='textFieldCustom'
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type='date'
          name='validTill'
          value={validTill}
          onChange={handleChange}
          label='Valid Till'
          variant='outlined'
          margin='normal'
          fullWidth
          className='textFieldCustom'
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <button type='submit' className='submit-button'>Submit</button>
      </form>
    </div>
  );
};

export default Addpropromotions;
