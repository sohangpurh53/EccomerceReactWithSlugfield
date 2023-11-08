import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
// import '../css/categories.css'
import {Link,  useParams } from 'react-router-dom';

const ProductImageList = () => {
    const {slug} = useParams()
    const [ProductDetails, setProductDetails] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const product = await axiosInstance(`products/images/${slug}/`).then(response=> response.data);
                setProductDetails(product)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[slug])
    console.log(ProductDetails)
  return (
    <div>
        <div className="categories-table-container">
        <div className="table-wrapper"> 
            <div className="data-table">
            <table> 
                <thead>
                    <tr>
                     <th>Index</th>
                    <th>Product Image</th>
                    </tr>
                    
            </thead>
            {ProductDetails.map((product, index)=>(
                 <tbody key={product.id}>
                    <tr>
                    <td> {index + 1} </td>
                    <td>  <img src={product.image} alt="" />  </td>
        
                    <td><Link to={`/product/images/delete/${product.id}/`}>Delete</Link></td>
                    </tr>
                </tbody>
            ))}
            </table>

             </div>
            </div>
           </div>


    </div>
  )
}

export default ProductImageList