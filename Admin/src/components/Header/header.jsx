import React from 'react'
import './header.css'
import { FaBell, FaUser } from 'react-icons/fa';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import SearchInput from './search';
import logoimg from '../Images/logo.png'

const Header = () => {
  return (
     <>
         <div className='main-header'>
              <div className='logo-section'>
                    <img src={logoimg} alt='logo'/>
              </div>
              <div className='logic-section'>
              <SearchInput/>
                    
              </div>
              
              <div className='notification-section'>
                <Person2OutlinedIcon style={{ fontSize: 30, border: '1px solid white', borderRadius: '50%', padding: '5px' }} />
                <NotificationsNoneOutlinedIcon style={{ fontSize: 30, border: '1px solid white', borderRadius: '50%', padding: '5px' }} />
            </div>
             
         </div>
     </>
  )
}

export default Header