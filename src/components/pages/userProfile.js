import React, { useEffect, useState } from 'react'
import '../css/userprofile.css'
import axiosInstance from '../utils/axiosInstance';
import {useAuth} from '../context/Authcontext'

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [userAddress, setUserAddress] = useState([]);
    const {accessToken} = useAuth()
    useEffect(()=>{

        if (accessToken){
            const fetchData = async ()=>{

            try {
                const user = await axiosInstance('user/profile/').then(response=> response.data);
                const useraddress = await axiosInstance('user/shipping-address/').then(response=> response.data);
                setUserDetails(user);
                setUserAddress(useraddress)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        }
        else{
           window.location.href = '/signin'
        }
        

    }, [accessToken])

    

  return (
    <>


  
 <div className="container">
        <div className="profile-info">
            <h1>Welcome, {userDetails.username}!</h1>
            <p>{userDetails.first_name} {userDetails.last_name}</p> 
            <p>Email:{userDetails.email}</p> 
  

     {userAddress.map(address=>(
        <div key={address.id} className="address-section">
        <h2>Shipping Address</h2>
        <p><strong>Address:</strong>{address.address} </p>  
        <p><strong>City:</strong>{address.city} </p>
        <p><strong>State:</strong> {address.state}</p>
        <p><strong>Country:</strong> {address.country}</p>
        <p><strong>Postal Code:</strong>{address.postal_code} </p> 
        </div>
     ))}
      
   
    
        </div>
        <h4>Your Orders:</h4>

            <ol id="user-order">
               
            
               <p id="user-total">Total Amount: &#8377;</p> 
                <ul>
                   
                        <li>
                            <img className="product-img" src=" " alt="" />
                           
                            <span>Quantity: </span><p>Product: </p> 
                            <p>Order ID: </p>
                            <p>Order Status: 
                                
                                <span className="completed-status">Order Successfull</span>
                                
                                <span className="pending-status">Pending</span>
                            
                            </p>
                            <p> </p>
                             View order
                        </li>
                       
                        
              
                </ul>
        
            </ol>
           
        <div className="profile-reviews">
            <h2>Your Reviews:</h2>
            <ul>
               
                    <li>
                        <p>Product: </p>
                        <p>Rating: </p>
                        <p>Comment: </p>
                    </li>
             
                    <li>No reviews yet.</li>
               
            </ul>
        </div>
    </div>

    
    </>
  )
}

export default UserProfile