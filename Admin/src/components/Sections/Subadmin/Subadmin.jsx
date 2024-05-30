import React from 'react'
import './Subadmin.css'
import { useNavigate } from 'react-router-dom';


const Subadmin = () => {
  const navigate = useNavigate()
  return (
    <>
        <div className='sub-admin-main-con'>
            <button onClick={()=>{navigate('/addsubadmin')}}>Add Sub-admin</button>
            <button>Manage Sub-admin</button>
        </div>
    </>
  )
}

export default Subadmin