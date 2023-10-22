import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import '../css/style.css'
import Notification from '../utils/Notfication'
import { useParams } from 'react-router-dom'

const UpdateCategoryForm = () => {
    const {slug} = useParams()

    const [notification, setNotification] = useState('');
    const [categoryData, setCategoryData] = useState({
        name:''
    })


    useEffect(()=> {
        const fetchdata = async ()=>{
            try {
                const data = await axiosInstance(`update/category/${slug}/`).then(response => response.data)    
                setCategoryData(data)            
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
    }, [slug])
   
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setCategoryData({
            ...categoryData,
            [name]:value,
        })
    }
    const CategoryForm = async (e)=>{
        e.preventDefault();
       const  data = {
            name:categoryData.name,
        }
        try {
            await axiosInstance.put(`update/category/${slug}/`, data).then(response => {if(response.data){
                setNotification(`Category Updated Successfully ${response.data.name}`);console.log(response.data)
                setTimeout(()=>{setNotification('')}, 1500)
                setTimeout(()=> {window.location.href = '/categories/'}, 2000)
                
            }else{console.log('error while creating')}})
              
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <div className="category-form-cotainer">
    <form>
        <Notification message={notification}/>
        <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text"
            name='name'
            value={categoryData.name}
            onChange={handleChange}
             />
        </div>
        <button onClick={CategoryForm}>Update Category</button>
    </form>
    </div>
    
    </>
  )
}

export default UpdateCategoryForm