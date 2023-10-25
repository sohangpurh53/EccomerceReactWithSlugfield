import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import '../css/cart.css'
import Notfication from '../utils/Notfication';
import { Link } from 'react-router-dom';


const Cart = () => {
    const [cartDetails, setCartDetails] = useState({ cart_items: [] });
    const [notification, setNotification] = useState('')
    

    const fetchData = async ()=>{
      try {
          const cart = await axiosInstance('create/cart/').then(response=> response.data);
          setCartDetails(cart);
      } catch (error) {
          console.log(error)
      }
  }
    // cartitem details
    const cart_items = cartDetails.cart_items
   


    const addToCart = async (e, product_id)=>{
      e.preventDefault();
      try {
          await axiosInstance.post(`add_to_cart/${product_id}/`).then(response=> {if (response.data){
              setNotification('Item Added Successfully');
              setTimeout(()=>{setNotification('')}, 2000)
              fetchData()
        
          }else{
              console.log('Error occur while adding, something went wrong')
          }});
      } catch (error) {
          console.log(error)
      }
  
     }

     const removeCartItem = async (e, cart_item_id)=>{
      e.preventDefault()
      try {
        await axiosInstance.delete(`remove_cart_item/${cart_item_id}/`).then(response=> {if (response.data){
            setNotification('Item Added Successfully');
            setTimeout(()=>{setNotification('')}, 2000)
            
        }});
    } catch (error) {
        console.log(error)
    }
     }

     const reduceCartItem = async (e, cart_item_id) => {
      e.preventDefault();
      try {
        const response = await axiosInstance.patch(`reduce_quantity/${cart_item_id}/`);
        if (response.data) {
          setNotification('Item Quantity Reduced Successfully');
          setTimeout(() => { setNotification('') }, 2000);
          fetchData()
        } else {
          console.log('Error occurred while reducing quantity, something went wrong');
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
    fetchData()

    }, [])

   
    
  return (
    <div className="container">
      <Notfication message={notification}/>

      <h1>Cart</h1>

   
        <div className="product-details" >
          {cart_items.length> 0? (cart_items.map(item => (
            <div className="cart-item" key={item.id}>
              <h3>Item name: {item.product.name}</h3>
              <p>Description: {item.product.description}</p>
              <p>Price: ₹{item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <span key={item.id} className="quantity-controls">
              <span>
                <button onClick={(e) => reduceCartItem(e, item.id)}>
                  <i className="bi bi-dash"></i>
                </button>
              </span>
              <p>{item.quantity}</p>
              <span>
                <button onClick={(e) => addToCart(e, item.product.id)}>
                  <i className="bi bi-plus"></i>
                </button>
              </span>
              </span>  
              <button onClick={(e) => removeCartItem(e, item.id)} className="remove-button">Remove</button>
              </div> 

              
          ))):( <p className="missing-message">Missing Cart items? Add Product to cart</p>) }
          
          
        
        </div>
      

        {cart_items.length> 0? ( <div className="order-summary">
        <h2>Order Summary</h2>
        <div>
          <span>Subtotal:</span>
          <span> ₹{cartDetails.subtotal}</span>
        </div>
        <div>
          <span>Shipping:</span>
          {/* <span>Free</span> */}
          <span> ₹{cartDetails.shipping_fee}</span>
        </div>
        <div>
          <span>Total:</span>
          <span> ₹{cartDetails.total_amount}</span>
        </div>
        <Link className="proceed-button" to={'/order/'}> Proceed to Checkout </Link>
        {/* <button ></button> */}
      </div>
    ):('') }
   </div>
     
  );
};

export default Cart