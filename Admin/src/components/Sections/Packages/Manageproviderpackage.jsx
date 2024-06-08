import React, { useState, useEffect } from 'react';
import './providerpackage.css';

const Manageproviderpackage = () => {
    const [formData, setFormData] = useState({
        packageName: '',
        noOfJobOffers: '',
        priceRs: '',
        priceCr: '',
        discountPlatformCom: '',
        comments: '',
    });

    const [apiData, setApiData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://13.126.118.3:3000/v1.0/core/package');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setApiData(data);
                setFormData(data); // Set formData with the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className='add-package-con'>
            <form className='form-con' onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='packageName'
                    value={formData.packageName}
                    placeholder='Package Name'
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='noOfJobOffers'
                    value={formData.noOfJobOffers}
                    placeholder='No of Job offers'
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='priceRs'
                    value={formData.priceRs}
                    placeholder='Price in RS'
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='priceCr'
                    value={formData.priceCr}
                    placeholder='Price in Cr'
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='discountPlatformCom'
                    value={formData.discountPlatformCom}
                    placeholder='Discount in Platform commission in %'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='comments'
                    value={formData.comments}
                    placeholder='Comments'
                    onChange={handleChange}
                />
                <button type='submit'>Submit</button>
            </form>
            {apiData && (
                <div className='api-data'>
                    <h2>Fetched API Data</h2>
                    <pre>{JSON.stringify(apiData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Manageproviderpackage;
