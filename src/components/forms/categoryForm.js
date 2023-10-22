import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import '../css/style.css'
import Notification from '../utils/Notfication'

const CategoryForm = () => {
    const [notification, setNotification] = useState('');
    const [categoryData, setCategoryData] = useState({
        name:''
    })
   
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
            await axiosInstance.post('create/category/', data).then(response => {if(response.data){
                setNotification(`Category Created Successfully ${response.data.name}`);console.log(response.data)
                setTimeout(()=>{setNotification('')}, 2000)
                
                
                   
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
        <button onClick={CategoryForm}>Create Category</button>
    </form>
    </div>
    
    </>
  )
}

export default CategoryForm