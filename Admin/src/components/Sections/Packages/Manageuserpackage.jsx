import React, { useState } from 'react'
import './providerpackage.css'

const Manageuserpackage = () => {

    const [propackage,setpropackage]=useState({
        packageName:'',
        priceRs:'',
        priceCr:'',
        discountPlatformCom:'',
        comments:'',
    })
    const {packageName,priceRs,priceCr,discountPlatformCom,comments}=propackage

    const handleChange = (e) => {
        const { name, value } = e.target;
        setpropackage(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(packageName)
    };

    const handleSubmit = (e) => {
        console.log(propackage);
    };
     


  return (
      <>
         <div className='add-package-con'>
              <form className='form-con'>
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
                  
                 <button onClick={handleSubmit()}>Submit</button>
              </form>
         </div> 
      </>
  )
}

export default Manageuserpackage  