import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import '../css/style.css'

const ProductImageForm = () => {
    const [productDetail, setProductDetail] = useState([])
    const [productImageForm, setProductImageForm] = useState({
        product:'',
        image:null,
    })
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const productData  = await axiosInstance('list/product/').then(response => response.data);
                setProductDetail(productData);
            } catch (error) {
                console.log(`error while fetching product ${error}`)
            }
        }
        fetchData()

    }, [])
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setProductImageForm({
          ...productImageForm,
          [name]: value,
        });
      };
    
      const handleImageChange = (e) => {
        setProductImageForm({
          ...productImageForm,
          image: e.target.files[0],
        });
      };
    
   const productImage = async (e)=>{
    e.preventDefault()
    const formData = new FormData();
        formData.append('product', productImageForm.product);
        formData.append('image', productImageForm.image);
    

    try {
        await axiosInstance.post('create/product/image/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        }).then(response => console.log(response.data));
    } catch (error) {
        console.log(error);
    }

   }

  return (
    <>
    <div className="image-form-container">
        <form encType="multipart/form-data">
    <div className="form-group">
        <label htmlFor="product">Product
        <select onChange={handleInputChange} value={productImageForm.product} name="product" id="">
            <option value="" default>Select Product</option>
            {productDetail.map(product=>(
                <option key={product.id} value={product.id} >{product.name}</option>
            ))}
            
        </select>
        </label>
    </div>

    <div className="form-group">
    <label>
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </label>
    </div>


    <button onClick={productImage}>Save-Image</button>

    </form>
    </div>
    

    </>
  )
}

export default ProductImageForm