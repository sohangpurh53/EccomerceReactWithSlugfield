import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useParams } from 'react-router-dom';
import '../css/singleproduct.css'
import Notfication from '../utils/Notfication';

const SingleProductPage = () => {
    const [notification, setNotification] = useState('')
    const [SingleproductDetail, setSingleProductDetail] = useState([]);
    const [productImage, setProducImage] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const {slug} = useParams()
    const product_id = SingleproductDetail.id;

    useEffect(()=> {
        const fetchData = async ()=>{
            try {
               const product = await axiosInstance(`product/${slug}/`).then(response => response.data );
               const image = await axiosInstance(`products/images/${slug}/`).then(response => response.data );
               setProducImage(image)
               setSingleProductDetail(product); 
           
            } catch (error) {
                console.log(`error while fetch products ${error}`);              
            }
            
        }
        fetchData()
    }, [slug])
    console.log()
   
   useEffect(()=>{
   const fetchData = async ()=>{
    try {
        

    } catch (error) {
        console.log(error)
    }
   }
   fetchData()

   },[slug])

   const addToCart = async (e)=>{
    e.preventDefault();
    try {
        await axiosInstance.post(`add_to_cart/${product_id}/`).then(response=> {if (response.data){
            setNotification('Item Added Successfully');
            setTimeout(()=>{setNotification('')}, 2000)
        }else{
            console.log('Error occur while adding, something went wrong')
        }});
    } catch (error) {
        console.log(error)
    }

   }
    
    function handlePrevClick() {
        setCurrentImageIndex(prevIndex => (prevIndex === 0 ? productImage.length - 1 : prevIndex - 1));
    }

    function handleNextClick() {
        setCurrentImageIndex(prevIndex => (prevIndex === productImage.length - 1 ? 0 : prevIndex + 1));
    }
    
  return (
    <>
    

    <div className="container">
        <Notfication message={notification}/>
    <div className="product-details">
                    <div className="image-carousel">
                        <img src={productImage[currentImageIndex]?.image} className="d-block w-100" alt="" />
                        <button className="carousel-control" onClick={handlePrevClick}>
                            Previous
                        </button>
                        <button className="carousel-control" onClick={handleNextClick}>
                            Next
                        </button>
                    </div>

            <div className="product-info">
                 <h2 className="product-title">{SingleproductDetail.name}</h2>
                <p className="product-description">{SingleproductDetail.description}</p>
                <p className="product-price">&#8377;{SingleproductDetail.price}</p>
  
 
                <div className="add-to-cart">
                   
                  
                    
                        <button onClick={addToCart} className="add-to-cart-button">
                            <i className="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button  className="buy-now-button">Buy Now</button>
                 
                </div>
            </div>
        </div>
    </div>


    </>
  )
}

export default SingleProductPage