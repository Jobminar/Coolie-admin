import React, { useState } from 'react';

const Addpropromotions = () => {
  const [addPromo, setAddPromo] = useState({
    promoName: '',
    serviceType:'',
    cities:'',
    noOfJobs:'',
    offerAmount:'',
    validFrom: '',
    validTill: '',
    notifyProviders: true
  });


  const { promoName, serviceType,cities, noOfJobs,offerAmount, validFrom, validTill, notifyProviders } = addPromo;
  const handleChange = (e) => {
      setAddPromo({...addPromo,[e.target.name]:e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addPromo)
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
          name='cities'
          value={cities}
          placeholder='Cities'
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='noOfJobs'
          value={noOfJobs}
          placeholder='Number of Jobs'
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='offerAmount'
          value={offerAmount}
          placeholder='Offer Amount'
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

export default Addpropromotions;
