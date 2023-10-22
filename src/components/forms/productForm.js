import React, { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import '../css/style.css'
import Notfication from '../utils/Notfication'

const ProductForm = () => {
    const [notification, setNotification] = useState('')
    const [categoryOption, setCategoryOption] = useState([])
    const [sellerOption, setSellerOption] = useState([])
    const [productData, setProductData] = useState({
        name: '', 
        description: '', 
        price: '', 
        shipping_fee: '',
        stock: '', 
        category: '', 
         seller: '',
    })

    useEffect(()=> {
        const fetchData = async ()=>{
            try {
                const [categoryData, sellerData] = await Promise.all([
                    axiosInstance('list/category/').then(response=> response.data),
                    axiosInstance('list/seller/').then(response=> response.data),
                ]);
                setSellerOption(sellerData);
                setCategoryOption(categoryData);
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
  
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setProductData({
            ...productData,
            [name]:value,
        })
    }

    const CreateProduct = async (e)=>{
        e.preventDefault();
        const data = {
            name: productData.name, 
            description: productData.description, 
            price: productData.price, 
            shipping_fee: productData.shipping_fee,
            stock: productData.stock, 
            category: productData.category, 
            seller: productData.seller,
            }
        console.log(data)
        try {
            await axiosInstance.post('create/product/', data).then(response=> { if(response.data){
                setNotification(`Product Created Successfully ${response.data.name}`);
                setTimeout(()=>{setNotification('')}, 2000)

            }else{setNotification('Error while create product')}}
               )
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <>
    <div className="product-form-container">
       <Notfication message={notification}/>
        <form >

            <div className="form-group">
            <label htmlFor="name">Name</label>
                <input type="text"
                name='name'
                value={productData.name}
                onChange={handleChange}
                required
                 />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text"
                name='description'
                value={productData.description}
                onChange={handleChange}
                required
                 />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="number"
                name='price'
                value={productData.price}
                onChange={handleChange}
                required
                 />
            </div>

            <div className="form-group">
                <label htmlFor="shippingfee">Shipping Fee</label>
                <input type="number"
                name='shipping_fee'
                value={productData.shipping_fee}
                onChange={handleChange}
                required
                 />
            </div>

            <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input type="number"
                name='stock'
                value={productData.stock}
                onChange={handleChange}
                required
                 />
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select name="category" value={productData.category} onChange={handleChange}  id="" required> 
                    <option value="" default>Select Category</option>
                    {categoryOption.map((category, index)=>(
                    <option key={index} value={category.id}>{category.name}</option>
                    ))}
                   
                </select>
            </div>

            <div className="form-group">
             <label htmlFor="seller">Seller</label>
            <select name="seller" value={productData.seller} onChange={handleChange}  id="" required>
                <option value="" default>Select Seller</option>
                    {sellerOption.map((seller, index)=>(
                    <option key={index} value={seller.id}>{seller.company_name}</option>
                    ))}
                </select>
             
               
            </div>
           <button onClick={CreateProduct}>Create Product</button>
        </form>
    </div>
    </>
  )
}

export default ProductForm