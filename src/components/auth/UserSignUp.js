import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import '../css/auth.css'

const UserSignUp = () => {
    // const [notification, setNotification]= useState()
    const [userData, setUserData] = useState({
        first_name:'', 
        last_name:'',
        email:'',
        username:'', 
        password:'',
    })

    const handleChange = (e)=>{
      const {name, value}= e.target;
        setUserData({...userData,
        [name]:value,})
    }
 const signUpForm = async (e)=>{
    e.preventDefault();
    try {
        await axiosInstance.post('create/user/', userData).then(response=> console.log(response.data));
    } catch (error) {
        console.log(error)
    }
    
 }

  return (
    <>
    <div className="auth-container">
        <form>

            <div className='form-group'>
                <label> First Name:</label>
                <input type="text"
                name='first_name' 
                 value={userData.first_name}
                 onChange={handleChange}
                 required
                />
            </div>
            <div className='form-group'>
                <label> Last name: </label>
                <input type="text"
                name='last_name' 
                 value={userData.last_name}
                 onChange={handleChange}
                 required
                />
            </div>
            <div className='form-group'>
                <label> Email: </label>
                <input type="email"
                name='email' 
                 value={userData.email}
                 onChange={handleChange}
                 required
                />
            </div>
            <div className='form-group'>
                <label> Username: </label>
                <input type="text"
                name='username' 
                 value={userData.username}
                 onChange={handleChange}
                 required
                />
            </div>
            <div className='form-group'>
                <label> Password: </label>
                <input type="password"
                name='password' 
                 value={userData.password}
                 onChange={handleChange}
                 required
                />
            </div>

        <button onClick={signUpForm}>SignUp</button>
        </form>
    </div>
        
    </>
  )
}

export default UserSignUp