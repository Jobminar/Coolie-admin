import React from 'react'
import './banners.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import kitchen from '../../../assets/images/kitchen.png'
import cleaning from '../../../assets/images/cleaning.png'

const Banners = () => {
  return (
     <>
      
     <div className='banners'>
         <h1>Banners</h1>
         <div className='banner-buttos'>
              <div className='delete-button'>
                  Delete 
                  <DeleteOutlineOutlinedIcon/>
              </div>
              <div className='edit-button'>
                   <EditOutlinedIcon/>
              </div>
         </div>
         <div className='main-banners'>
            <div className='Kitchen-cleaning'> 
               <img src={kitchen} alt='kitchen'/>

               <p>Kitchen cleaning
               </p>
               <div className='edit'>
                     <EditOutlinedIcon/>
               </div>
            </div>
            <div className='cleaning'>
               <img src={cleaning} alt='cleaning'/>
               <p>cleaning</p>
            </div>
            <div className='clean-edit'>
                     <EditOutlinedIcon/>
               </div>

         </div>
     </div>
     </>
  )
}

export default Banners