import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './css/header.css'
import { useAuth } from './context/Authcontext'


const Header = () => {
    const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        if (accessToken) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      }, [accessToken]);
   
  return (
    <>
    <header>
        <div className="header-main">
            <ul className='header-list'>
                <li className='header-item'>
                    <Link to='/' >HomePage</Link>
                </li>
                <li className='header-item'>
                    <Link to='/product/form/' >Product-form</Link>
                </li>
                <li className='header-item'>
                    <Link to='/categories/' >Categories</Link>
                </li>
                <li className='header-item'>
                    <Link to='/cart/' >Cart</Link>
                </li>
                <li className='header-item'>
                    <Link to='/products/' >Products</Link>
                </li>
                <li className='header-item'>
                    <Link to='/product/image/form/' >Product-Image-form</Link>
                </li>
                <li className='header-item'>
                    <Link to='/user/profile/' >User-Profile</Link>
                </li>
                <li className='header-item'>
                    <Link to='/category/form/' >Category-form</Link>
                </li>
                <li className='header-item'>
                    <Link to='/user/dashboard/' >Admin-Dashboard</Link>
                </li>
    {authenticated? (  <li className='header-item'>
                    <Link to='/signout' >SignOut</Link>
                </li> ):(<li className='header-item'>
                    <Link to='/signin' >SignIn</Link>
                </li> 
               )   }
         
               
         
               
                
            </ul>
        </div>
    </header>
    </>
  )
}

export default Header