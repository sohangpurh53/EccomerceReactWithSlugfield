import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import '../css/product.css'

const ListProducts = () => {
    const [productDetails, setProductDetails] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            const product = await axiosInstance('list/product/').then(response => response.data);
            setProductDetails(product);
        }
        fetchData()

    }, [])
  return (
    <>
    <div className="products-table-container">
        <div className="table-wrapper"> 
            <div className="data-table">
            <table> 
                <thead>
                    <tr>
                     <th>Index</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Shipping Fee</th>
                    <th>Stock</th>
                    </tr>
                    
            </thead>
            {productDetails.map((product, index)=>(
                 <tbody key={product.id}>
                    <tr>
                    <td> {index + 1} </td>
                    <td>{product.name} </td>
                    <td>{product.description} </td>
                    <td>{product.price} </td>
                    <td>{product.shipping_fee} </td>
                    <td>{product.stock} </td>
                    <td><Link className='btn-update' to={`/product/update/${product.slug}/`}>Update</Link></td>
                    <td><Link className='btn-delete' to={`/product/delete/${product.slug}/`}>Delete</Link></td>
                    <td><Link className='btn-image' to={`/product/images/${product.slug}/`}>Images</Link></td>
                    </tr>
                </tbody>
            ))}
            </table>

             </div>
            </div>
           </div>




    </>
  )
}

export default ListProducts