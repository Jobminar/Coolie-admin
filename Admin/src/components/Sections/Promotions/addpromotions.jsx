import React, { useState } from 'react';

const Addpromotions = () => {
  const [addPromo, setAddPromo] = useState({
    promoName: '',
    userType: '',
    offerPercentage:'',
    validFrom: '',
    validTill: '',
    notifyUsers: false
  });


  const { promoName, userType, offerPercentage, validFrom, validTill, notifyUsers } = addPromo;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddPromo({
      ...addPromo,
      [name]: name === 'offerPercentage' ? Number(value) : value
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
      } else {
        alert('Error while submitting');
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <div className='addpromotion-form'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='promoName'
          value={promoName}
          placeholder='Promotion Name'
          onChange={handleChange}
          required
        />
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
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Addpromotions;
