import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import '../css/orderlist.css'

const OrderList = () => {
    const [orderDetails, setOrderDetails] = useState([])

    // order data fetched
    const fetchData = async ()=> {
        try {
            const orderData = await axiosInstance('list/order/').then(response=> response.data);
        setOrderDetails(orderData)
        } catch (error) {
            console.log(`error while fetching order data ${error.message}`)
        }
        
    }
  
    useEffect(()=>{
        fetchData()
  
    }, [])
    
  return (
    <>
    <div className="order-list-container">
      
    <table>
        <thead>
            <tr>
                <th>Customer</th>
                <th>Order Total</th>
                <th>Customer Address</th>
            </tr>
        </thead>
        <tbody>
            {orderDetails.map(order =>(
               <tr key={order.id}>
                <td>{order.user}</td>
                <td>{order.total_amount}</td>
                <td>{order.shipping_address}</td>
               </tr>
            ))}

        </tbody>
    </table>
    </div>
 
    </>
  )
}

export default OrderList