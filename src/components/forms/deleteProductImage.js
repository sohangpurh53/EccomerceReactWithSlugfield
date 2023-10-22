import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance';
import '../css/delete.css';

const DeleteImageProduct = () => {
    const {id} = useParams()
    const [deleteProduct, setDeleteProduct] = useState(null);

    useEffect(()=>{
        const fetchdata = async ()=>{
            try {
                const product = await axiosInstance(`delete/product/image/${id}/`);
                setDeleteProduct(product)
            } catch (error) {
                console.log(`error while fetch product ${error}`)
            }
        }
        fetchdata()
    }, [id])

   
    const handleDelete = async ()=>{
        try {
            await axiosInstance.delete(`delete/product/image/${id}/`).then(response=> {if (response){
                setTimeout(()=> {window.location.href = '/products/'}, 250)
            }})
        } catch (error) {
            console.log(error)
        }
    }

    
  return (
    <>
   
    <div className="confirmation-box">
            {deleteProduct && (
                <>
                    <p>Are you sure you want to delete ?</p>
                    <button className='delete' onClick={handleDelete}>Delete</button>
                    <button className='cancel' onClick={() => window.location.href = `/products/`}>Cancel</button>
                </>
            )}
        </div>
    </>
  )
}

export default DeleteImageProduct