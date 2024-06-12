import React, { useState } from 'react';
import './Subadmin.css'

const initialAdminState = {
  fullName: '',
  mobileNo: '',
  emailforCommunication: '',
  loginEmailId: '',
  password: '',
  dob: '',
  aadharNumber: '',
  pan: '',
  designation: '',
  experience: '',
  addressWithPincode: '',
  servingLocations: '',
  accountName: '',
  accountNumber: '',
  bankName: '',
  ifscCode: '',
  branchName: '',
  branchAddress: '',
  profileImage:null,
  documents:[''],
};

const Addadmin = () => {
  const [addAdmin, setAddAdmin] = useState(initialAdminState);

  const handleChange = (e) => {
    setAddAdmin({...addAdmin,[e.target.name]:e.target.value})
  };

  const {
    fullName,
    mobileNo,
    emailforCommunication,
    loginEmailId,
    password,
    dob,
    aadharNumber,
    pan,
    designation,
    experience,
    addressWithPincode,
    servingLocations,
    accountName,
    accountNumber,
    bankName,
    ifscCode,
    branchName,
    branchAddress
  } = addAdmin;

  
const handleSubmit=async(e)=>{
  // console.log(addAdmin)
  e.preventDefault()
   try{
        const response = await fetch('http://13.126.118.3:3000/v1.0/admin/sub-admin/signup',{
              method :'POST',
              headers:{
                'content-Type':'application/json'
              },
              body:JSON.stringify(addAdmin)
        })
        if(response.ok){
          alert('form submitted')
          
        }
        
   }
   catch(err){
    console.log(err,err)
   }
} 

  return (
    <div className='form-con'>
      <h1>Add Sub Admin</h1>
      <input 
        type='text'
        name='fullName'
        value={fullName}
        placeholder='Full Name'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='mobileNo'
        value={mobileNo}
        placeholder='Mobile No'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='emailforCommunication'
        value={emailforCommunication}
        placeholder='Email for Communication'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='loginEmailId'
        value={loginEmailId}
        placeholder='Login Email Id'
        onChange={handleChange}
      />
      <input 
        type='password'
        name='password'
        value={password}
        placeholder='Password'
        onChange={handleChange}
      />
      <input 
        type='date'
        name='dob'
        value={dob}
        placeholder='Date of Birth'
        onChange={handleChange}
      />
      <input 
        type='number'
        name='aadharNumber'
        value={aadharNumber}
        placeholder='Aadhar Number'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='pan'
        value={pan}
        placeholder='PAN'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='designation'
        value={designation}
        placeholder='Designation'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='experience'
        value={experience}
        placeholder='Experience'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='addressWithPincode'
        value={addressWithPincode}
        placeholder='Address with Pincode'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='servingLocations'
        value={servingLocations}
        placeholder='Serving Locations'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='accountName'
        value={accountName}
        placeholder='Account Name'
        onChange={handleChange}
      />
      <input 
        type='number'
        name='accountNumber'
        value={accountNumber}
        placeholder='Account Number'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='bankName'
        value={bankName}
        placeholder='Bank Name'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='ifscCode'
        value={ifscCode}
        placeholder='IFSC Code'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='branchName'
        value={branchName}
        placeholder='Branch Name'
        onChange={handleChange}
      />
      <input 
        type='text'
        name='branchAddress'
        value={branchAddress}
        placeholder='Branch Address'
        onChange={handleChange}
      />
      {/* <input
        type='file'
        name='image'
        value={profileImage}

      /> */}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Addadmin;
