import React, { useState } from 'react';
import './providerpackage.css';

const Addproviderpackage = () => {
    const [propackage, setPropackage] = useState({
        packageName: '',
        noOfJobOffers: '',
        priceRs: '',
        priceCr: '',
        discountPlatformCom: '',
        comments: '',
    });

    

    const handleChange = (e) => {
        setPropackage({...propackage,[e.target.name]: e.target.value})
        console.log(propackage, 'handle change triggered');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(propackage);
        try {
            const response = await fetch('http://13.126.118.3:3000/v1.0/admin/package', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propackage),
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
        <div className='add-package-con'>
            <form className='form-con' onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='packageName'
                    value={propackage.packageName}
                    placeholder='Package Name'
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='noOfJobOffers'
                    value={propackage.noOfJobOffers}
                    placeholder='No of Job Offers'
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='priceCr'
                    value={propackage.priceCr}
                    placeholder='Price in Cr'
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='priceRs'
                    value={propackage.priceRs}
                    placeholder='Price in Rs'
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='discountPlatformCom'
                    value={propackage.discountPlatformCom}
                    placeholder='Discount in Platform Commission in %'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='comments'
                    value={propackage.comments}
                    placeholder='Comments'
                    onChange={handleChange}
                />
                <button type='submit' className='submit-button'>Submit</button>
            </form>
        </div>
    );
};

export default Addproviderpackage;
