import React from 'react'
import { Link } from 'react-router-dom'
import './css/footer.css'

const Footer = () => {
  return (
    <>
    <header>
        <div className="footer-main">
            <ul className='footer-list'>
                <li className='footer-item'>
                    <Link to='/' >HomePage</Link>
                </li>
                <li className='footer-item'>
                    <Link to='/signin' >SignIn</Link>
                </li>
                <li className='footer-item'>
                    <Link to='/signout' >SignOut</Link>
                </li>
            </ul>
        </div>
    </header>
    </>
  )
}

export default Footer