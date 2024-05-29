import React from 'react'
import './loyalitycards.css'
import Bronzee from '../../../assets/images/Bronze.png'
import gold from '../../../assets/images/gold.png'
import silver from '../../../assets/images/silver.png'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Loyalitycards = () => {
  return (
     <>
      <div className='loyality'>

      <h1 className='loyality-title'>Loyality Cards</h1>
          <div className='button'>

          <button>+Add Loyality</button>
          </div>
        
          <div className='loyality-main'>
             <div className='loyality-sub-con'>
                <img src={Bronzee} alt='bronzee'/> 
                <div className='medal-brief'>
                  <h3>Bronze</h3>
                  <p>Amount per points : 20%</p>
                  <p>Loyality points : 0</p>
               </div>
               <div className='buttons'>
                    <EditOutlinedIcon style={{fontSize:'30px'}}/>
                    <DeleteOutlineOutlinedIcon style={{fontSize:'30px'}}/>

               </div>
             </div>
             <div className='loyality-sub-con'>
             <img src={gold} alt='gold'/> 
             <div className='medal-brief'>
                  <h3>Gold</h3>
                  <p>Amount per points : 20%</p>
                  <p>Loyality points : 0</p>
               </div>
               <div className='buttons'>
                    <EditOutlinedIcon style={{fontSize:'30px'}}/>
                    <DeleteOutlineOutlinedIcon style={{fontSize:'30px'}}/>

               </div>
             </div>
             <div className='loyality-sub-con'>
             <img src={silver} alt='silver'/> \
             <div className='medal-brief'>
                  <h3>Silver</h3>
                  <p>Amount per points : 20%</p>
                  <p>Loyality points : 0</p>
               </div>
               <div className='buttons'>
                    <EditOutlinedIcon style={{fontSize:'30px'}}/>
                    <DeleteOutlineOutlinedIcon style={{fontSize:'30px'}}/>

               </div>
             </div>
        
          </div>
      </div>
         

     </>
  )
}

export default Loyalitycards