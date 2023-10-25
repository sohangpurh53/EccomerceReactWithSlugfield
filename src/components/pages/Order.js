import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


function PlaceOrder() {
  const [addressChoice, setAddressChoice] = useState(''); // Track user's choice of address
  const [shippingAddress, setShippingAddress] = useState({
     address:'', 
     city:'',
     state:'',
     country:'', 
     postal_code:'', 
     mobile_no:'',
  }); // Track new shipping address
  const usenavigation = useNavigate()
  const [shippingAddresses, setShippingAddresses] = useState([]); // Track existing shipping addresses
  const [orderPlaced, setOrderPlaced] = useState(false);


  const createShippingAddress = (e)=>{
    e.preventDefault();
    const data = {
      address:shippingAddress.address,
      city:shippingAddress.city,
      state:shippingAddress.state,
      country:shippingAddress.country,
      postal_code:shippingAddress.postal_code,
      mobile_no:shippingAddress.mobile_no,
    }
    console.log(data)
    try {
      axiosInstance.post('create/shipping-address/', data).then(response=> {if(response.data){
        usenavigation(0)
      }})
    } catch (error) {
      console.log(`error while create shipping address ${error}`)
    }

  }

  useEffect(() => {
    // Fetch user's existing shipping addresses
    axiosInstance.get('list/shipping-address/')
      .then(response => {
        setShippingAddresses(response.data);
      })
      .catch(error => {
        console.error('Error fetching shipping addresses:', error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleAddressChange = (event) => {
    setAddressChoice(event.target.value);
  };

  const handleShippingAddressChange = (e) => {
  const {name, value} = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]:value,
    });
  };

  const handlePlaceOrder = () => {
    const data = {
      address_choice: addressChoice,
      shipping_address: shippingAddress,
      // Add any other data you need to send to the backend for placing the order
    };

    axiosInstance.post('create/order/', data)
      .then(response => {
        setOrderPlaced(true);
        console.log('Order placed successfully:', response.data);
      })
      .catch(error => {
        console.error('Error placing order:', error);
      });
  };

  if (orderPlaced) {
    return <div>Order placed successfully!</div>;
  }

  return (
    <div>
      <h1>Place Your Order</h1>
      <label>
        Select Address:
        <select value={addressChoice} onChange={handleAddressChange}>
          <option value="">-- Select an address --</option>
          {shippingAddresses.map(address => (
            <option key={address.id} value={address.id}>{address.address}</option>
          ))}
          <option value="new">New Address</option>
        </select>
      </label>
      {addressChoice === 'new' && (
        <div>
          <label>
            New Address:
            
         <label htmlFor="Address">Address <input type="text" name='address'  value={shippingAddress.address} onChange={handleShippingAddressChange} /></label> 
         <label htmlFor="City"> City <input type="text" name='city' value={shippingAddress.city} onChange={handleShippingAddressChange} /></label> 
         <label htmlFor="State">State<input type="text" name='state' value={shippingAddress.state} onChange={handleShippingAddressChange} /></label> 
         <label htmlFor="Country">Country<input type="text" name='country'  value={shippingAddress.country} onChange={handleShippingAddressChange} /></label> 
         <label htmlFor="Postal Code">Postal Code<input type="text" name='postal_code' value={shippingAddress.postal_code} onChange={handleShippingAddressChange} /></label> 
         <label htmlFor="Mobile No">Mobile No<input type="text" name='mobile_no' value={shippingAddress.mobile_no} onChange={handleShippingAddressChange} /></label> 
          
          </label>

          <button onClick={createShippingAddress}>Create Address</button>

        </div>
        
      )}
      
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default PlaceOrder;
