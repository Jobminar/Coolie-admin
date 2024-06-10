import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './providerpackage.css';

const ManageProviderPackages = () => {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await fetch('http://13.126.118.3:3000/v1.0/admin/provider-package');
            if (!response.ok) {
                throw new Error('Failed to fetch packages');
            }
            const data = await response.json();
            setPackages(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (packageItem) => {
        navigate('/editproviderpackage', { state: { package: packageItem } });
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.log("ID not provided");
            return;
        }
        console.log(id);

        try {
            const response = await fetch(`http://13.126.118.3:3000/v1.0/admin/provider-package/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Deleted successfully");
                setPackages((prevData) => prevData.filter((pkg) => pkg._id !== id));
            } else {
                alert("Error: Failed to delete package.");
            }
        } catch (err) {
            console.error("Error", err);
            alert("An error occurred while deleting");
        }
    };

    return (
        <>
            <div className='add-package-con'>
                {packages.map((packageItem, index) => (
                    <div key={index} className='package-item'>
                        <h3>{packageItem.packageName}</h3>
                        <p>No of Job Offers: {packageItem.noOfJobOffers}</p>
                        <p>Price in RS: {packageItem.priceRs}</p>
                        <p>Price in Cr: {packageItem.priceCr}</p>
                        <p>Discount in Platform Commission: {packageItem.discountPlatformCom}%</p>
                        <p>Comments: {packageItem.comments}</p>
                        <div className="buttons-container">
                            <button onClick={() => handleEdit(packageItem)}>Edit</button>
                            <button onClick={() => handleDelete(packageItem._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ManageProviderPackages;
