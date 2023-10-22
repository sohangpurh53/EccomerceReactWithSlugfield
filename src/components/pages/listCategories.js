import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import '../css/categories.css'
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categoryDetails, setCategoryDetails] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const category = await axiosInstance('list/category/').then(response=> response.data);
                setCategoryDetails(category)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])
    
  return (
    <div>
        <div className="categories-table-container">
        <div className="table-wrapper"> 
            <div className="data-table">
            <table> 
                <thead>
                    <tr>
                     <th>Index</th>
                    <th>Name</th>
                    </tr>
                    
            </thead>
            {categoryDetails.map((category, index)=>(
                 <tbody key={category.id}>
                    <tr>
                    <td> {index + 1} </td>
                    <td>{category.name} </td>
                    <td><Link className='btn-update' to={`/category/update/${category.slug}/`}>Update</Link></td>
                    <td><Link className='btn-delete' to={`/category/delete/${category.slug}/`}>Delete</Link></td>
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

export default Categories