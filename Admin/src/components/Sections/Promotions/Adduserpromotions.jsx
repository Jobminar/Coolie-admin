import React, { useState } from 'react';

const Addpromotions = () => {
  const [addPromo, setAddPromo] = useState({
    promoName: '',
    serviceType:'',
    userType: '',
    offerPercentage:'',
    validFrom: '',
    validTill: '',
    notifyUsers: true
  });


  const { promoName, userType, offerPercentage, validFrom, validTill,serviceType, notifyUsers } = addPromo;
  const handleChange = (e) => {
      setAddPromo({...addPromo,[e.target.name]:e.target.value})
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
      <form  className='form-con' onSubmit={handleSubmit}>
        <input
          type='text'
          name='promoName'
          value={promoName}
          placeholder='Promotion Name'
          onChange={handleChange}
          required
        />
             <select 
          type='text' 
          name='serviceType' 
          value={serviceType} 
          onChange={handleChange} 
          placeholder='select service' >
                <option>Beautician</option>
                <option>Professional cleaning</option>
                <option>Bathroom cleaning</option>
                <option>Washing</option>
                <option>AC Repair & service</option>
                <option>Electrician</option>
                <option>Plumber</option>
                <option>Laundry services</option>
          </select>
        <input
          type='text'
          name='userType'
          value={userType}
          placeholder='User Type'
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='offerPercentage'
          value={offerPercentage}
          placeholder='Offer Percentage'
          onChange={handleChange}
          required
        />
        <input
          type='date'
          name='validFrom'
          value={validFrom}
          placeholder='Valid From'
          onChange={handleChange}
          required
        />
        <input
          type='date'
          name='validTill'
          value={validTill}
          placeholder='Valid Till'
          onChange={handleChange}
          required
        />
        <button type='submit' className='submit-button'>Submit</button>
      </form>
    </div>
  );
};

export default Addpromotions;
