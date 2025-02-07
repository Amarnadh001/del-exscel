import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src="https://yt3.ggpht.com/-VMlDBPP33Yw/AAAAAAAAAAI/AAAAAAAAAAA/N8i9Hxk-Ljs/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="" />
      <img className='profile' src={assets.profile_image} alt="" />
      
    </div>
  )
}

export default Navbar

