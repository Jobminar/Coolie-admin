import React, { useEffect, useState } from 'react';
import './loyalitycards.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Loyalitycards = () => {
   const navigate = useNavigate();
   const [data, setData] = useState({
      name: '',
      points: '',
      amount: '',
      minimumSpentValue: '',
      discount: '',
   });
   const [image, setImage] = useState(null);
   const [getData, setGetData] = useState([]);
   const [error, setError] = useState('');

  const { name, points, amount, minimumSpentValue, discount } = data;

  const [visible, setVisible] = useState(false);
  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("points", points);
      formData.append("amount", amount);
      formData.append("minimumSpentValue", minimumSpentValue);
      formData.append("discount", discount);
      formData.append("image", image);

      const response = await fetch(
        "http://13.126.118.3:3000/v1.0/admin/loyalty",
        {
          method: "POST",
          body: formData,
        },
      );
      if (response.ok) {
        alert("Loyalty card submitted");
        console.log("Loyalty card submitted");
        window.location.reload();
      } else {
        console.log("Error occurred");
      }
    } catch (err) {
      console.log("Error", err);
    }
    setVisible(false);
  };
  const visibleform = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    axios
      .get("http://13.126.118.3:3000/v1.0/admin/loyalty")
      .then((response) => setGetData(response.data))
      .catch((error) => setError(error));
  }, []);

  //  DElete
  const handleDelete = async (id) => {
    console.log(id);
    if (!id) {
      console.log("ID not provided");
      return;
    }
    try {
      const response = await axios.delete(
        `http://13.126.118.3:3000/v1.0/admin/loyalty/${id}`,
      );
      //   http://localhost:3000/v1.0/admin/loyalty/id
      if (response.status == 200) {
        alert("Deleted successfully");
        setGetData((prevData) =>
          prevData.filter((loyality) => loyality._id !== id),
        );
      }
    } catch (err) {
      console.error("Error", err);
      //   alert('An error occurred while deleting');
    }
  };

    const [editdata,seteditdata] = useState([])
    const handleEdit = (item) => {
      seteditdata(item);
      navigate('/editloyality', { state: { editdata: item } });
      console.log(item, 'data');
    };

   const handleButtonClick = (e) => {
      e.preventDefault(); // Prevent default form submission
      document.getElementById('hiddenFileInput').click();
   };

   return (
      <>
         <div className='loyality'>
            <div className='loyality-head'>
               <h1>Loyality Cards</h1>
               <div className='button'>
                  <button onClick={visibleform}>+Add Loyalty</button>
               </div>
            </div>
            {visible && (
               <div className='loyality-form'>
                  <form onSubmit={handlesubmit}>
                     <input
                        type='text'
                        name='name'
                        value={name}
                        className='name'
                        onChange={handlechange}
                        placeholder='Loyalty card name'
                     />
                     <input
                        type='tel'
                        name='points'
                        value={points}
                        className='points'
                        onChange={handlechange}
                        placeholder='Loyalty points'
                     />
                     <input
                        type='text'
                        name='amount'
                        value={amount}
                        className='amount'
                        onChange={handlechange}
                        placeholder='Amount per points'
                     />
                     <input
                        type='text'
                        name='minimumSpentValue'
                        value={minimumSpentValue}
                        className='minimumSpentValue'
                        onChange={handlechange}
                        placeholder='Minimum Spent Value'
                     />
                     <input
                        type='text'
                        name='discount'
                        value={discount}
                        className='discount'
                        onChange={handlechange}
                        placeholder='Discount'
                     />
                     <div>
                        <input
                        type='file'
                        id='hiddenFileInput'
                        className='file-input'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        />
                        <button type='button' className='custom-button' onClick={handleButtonClick}>
                        Upload Loyalty card image
                        </button>
                        {image && <p>Selected file: {image.name}</p>}
                     </div>
                     <button className='submit' type='submit'>Submit</button>
                  </form>
               </div>
            )}
            <div className='loyality-main'>
            {Array.isArray(getData) && getData.map(item => (
                  <div className='loyality-sub-con' key={item._id}>
                     <img src={`https://coolie1-dev.s3.ap-south-1.amazonaws.com/${item.image}`} alt={item.name} />
                     <div className='medal-brief'>
                        <h3>{item.name}</h3>
                        <p>Amount per points : {item.amount}</p>
                        <p>Loyalty points : {item.points}</p>
                     </div>
                     <div className='buttons'>
                        <EditOutlinedIcon style={{ fontSize: '30px' }}  onClick={() => {handleEdit(item)}} />
                        <DeleteOutlineOutlinedIcon onClick={() => handleDelete(item._id)} style={{ fontSize: '30px' }} />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}

export default Loyalitycards;
