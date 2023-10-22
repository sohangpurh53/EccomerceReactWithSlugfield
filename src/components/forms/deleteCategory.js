import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance';
import '../css/delete.css';

const DeleteCategory = () => {
    const {slug} = useParams()
    const [deleteCategory, setDeleteCategory] = useState(null);

    useEffect(()=>{
        const fetchdata = async ()=>{
            try {
                const category = await axiosInstance(`delete/category/${slug}/`);
                setDeleteCategory(category)
            } catch (error) {
                console.log(`error while fetch category ${error}`)
            }
        }
        fetchdata()
    }, [slug])



    const handleDelete = async ()=>{
        try {
            await axiosInstance.delete(`delete/category/${slug}/`).then(response=> {if (response){
                setTimeout(()=> {window.location.href = '/categories/'}, 250)
            }})
        } catch (error) {
            console.log(error)
        }
    }

    
  return (
    <>
   
    <div className="confirmation-box">
            {deleteCategory && (
                <>
                    <p>Are you sure you want to delete {deleteCategory.name}?</p>
                    <button className='delete' onClick={handleDelete}>Delete</button>
                    <button className='cancel' onClick={() => window.location.href = `/categories/`}>Cancel</button>
                </>
            )}
        </div>
    </>
  )
}

export default DeleteCategory