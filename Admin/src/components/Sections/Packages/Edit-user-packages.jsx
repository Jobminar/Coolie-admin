import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditUserPackage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { package: initialPackageData } = location.state;
    const [packageData, setPackageData] = useState({
        _id: initialPackageData._id || '',
        packageName: initialPackageData.packageName || '',
        priceRs: initialPackageData.priceRs || '',
        priceCr: initialPackageData.priceCr || '',
        discountPlatformCom: initialPackageData.discountPlatformCom || '',
        comments: initialPackageData.comments || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageData({
            ...packageData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting package data:", packageData);
        try {
            const response = await fetch(`http://13.126.118.3:3000/v1.0/admin/user-package/${packageData._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(packageData)
            });

            if (response.ok) {
                alert('Package updated successfully');
                navigate('/userpackages');
            } else {
                const errorData = await response.json();
                console.error('Failed to update package:', errorData);
                alert('Failed to update package');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the package');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit user package</h1>
            <label>
                Package Name:
                <input type="text" name="packageName" value={packageData.packageName} onChange={handleChange} required />
            </label>
            <label>
                Price in RS:
                <input type="number" name="priceRs" value={packageData.priceRs} onChange={handleChange} required />
            </label>
            <label>
                Price in Cr:
                <input type="number" name="priceCr" value={packageData.priceCr} onChange={handleChange} required />
            </label>
            <label>
                Discount:
                <input type="number" name="discountPlatformCom" value={packageData.discountPlatformCom} onChange={handleChange} required />
            </label>
            <label>
                Comments:
                <textarea name="comments" value={packageData.comments} onChange={handleChange} required />
            </label>
            <button type="submit">Update Package</button>
        </form>
    );
};

export default EditUserPackage;
