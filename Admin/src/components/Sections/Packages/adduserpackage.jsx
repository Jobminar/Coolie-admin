import React, { useState } from 'react'
import './providerpackage.css'
import { json } from 'react-router-dom'

const Adduserpackage = () => {

    const [userPackage,setUserPackage]=useState({
        packageName:'',
        priceRs:'',
        priceCr:'',
        discountPlatformCom:'',
        comments:'',
    })
    const {packageName,priceRs,priceCr,discountPlatformCom,comments}=userPackage

    const handleChange = (e) => {
        setUserPackage({...userPackage,[e.target.name]:e.target.value})
        console.log(packageName)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://13.126.118.3:3000/v1.0/admin/user-package', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userPackage),
            });

            if (response.ok) {
                alert('Success');
            } else {
                alert('Failed to submit');
                console.error('Response error:', response.statusText);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred while submitting the form');
        }
    };

  return (
      <>
         <div className='add-package-con'>
              <form className='form-con' onSubmit={handleSubmit}>
                  <input
                     type='text'
                     name='packageName'
                     value={packageName}
                     placeholder='Package Name'
                     onChange={handleChange}
                  />
                  <input
                     type='number'
                     name='priceRs'
                     value={priceRs}
                     placeholder='Price in RS'
                     onChange={handleChange}
                  />
                   <input
                     type='number'
                     name='priceCr'
                     value={priceCr}
                     placeholder='Price in Cr'
                     onChange={handleChange}
                  />
                    <input
                     type='number'
                     name='discountPlatformCom'
                     value={discountPlatformCom}
                     placeholder='Discount in Platform comission in %'
                     onChange={handleChange}
                  />
                  <input
                     type='text'
                     name='comments'
                     value={comments}
                     placeholder='Comments'
                     onChange={handleChange}
                  />
                  
                 <button type='submit'>Submit</button>
              </form>
         </div> 
      </>
  )
}

export default Adduserpackage