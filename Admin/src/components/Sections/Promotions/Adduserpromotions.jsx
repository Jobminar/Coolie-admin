import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import '../Packages/providerpackage.css';

const Addpromotions = () => {
  const [addPromo, setAddPromo] = useState({
    promoName: '',
    serviceType: '',
    userType: [],
    offerPercentage: '',
    validFrom: '',
    validTill: '',
    notifyUsers: true
  });

  const { promoName, userType, offerPercentage, validFrom, validTill, serviceType } = addPromo;

  const handleChange = (e) => {
    setAddPromo({ ...addPromo, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e) => {
    const { value, checked } = e.target;
    setAddPromo(prevState => {
      const userType = checked
        ? [...prevState.userType, value]
        : prevState.userType.filter(type => type !== value);
      return { ...prevState, userType };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addPromo)
    try {
      const response = await fetch('http://13.126.118.3:3000/v1.0/admin/user-promotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addPromo)
      });
      if (response.ok) {
        alert('Form data submitted successfully');
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <div className='add-package-con'>
      <form className='form-con' onSubmit={handleSubmit}>
        <FormControl component='fieldset' fullWidth>
          <FormGroup>
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
              variant='outlined'
              margin='normal'
              fullWidth
              className='textFieldCustom'
              SelectProps={{
                native: true,
              }}
              required
            >
              <option value=''>Select a service</option>
              <option value='Beautician'>Beautician</option>
              <option value='Professional cleaning'>Professional cleaning</option>
              <option value='Bathroom cleaning'>Bathroom cleaning</option>
              <option value='Washing'>Washing</option>
              <option value='AC Repair & service'>AC Repair & service</option>
              <option value='Electrician'>Electrician</option>
              <option value='Plumber'>Plumber</option>
              <option value='Laundry services'>Laundry services</option>
            </TextField>
            <TextField
              type='number'
              name='offerPercentage'
              value={offerPercentage}
              onChange={handleChange}
              label='Offer Percentage'
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
            <div>
              <label>User Type:</label>
              <div>
                <label>
                  <input
                    type='checkbox'
                    name='userType'
                    value='Gold'
                    checked={userType.includes('Gold')}
                    onChange={handleUserTypeChange}
                  />
                  User Type 1
                </label>
                <label>
                  <input
                    type='checkbox'
                    name='userType'
                    value='Silver'
                    checked={userType.includes('Silver')}
                    onChange={handleUserTypeChange}
                  />
                  User Type 2
                </label>
                <label>
                  <input
                    type='checkbox'
                    name='userType'
                    value='Bronze'
                    checked={userType.includes('Bronze')}
                    onChange={handleUserTypeChange}
                  />
                  User Type 3
                </label>
              </div>
            </div>

          </FormGroup>
        </FormControl>
        <button type='submit' className='submit-button'>Submit</button>
      </form>
    </div>
  );
};

export default Addpromotions;
