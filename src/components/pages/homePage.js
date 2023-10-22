import React, { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance';
import '../css/homepage.css'
import { Link } from 'react-router-dom';

const HomePage = () => {
   const  [productDetails, setProductDetails] = useState([]);
   const [currentPage, setCurrentPage] = useState(1)
   const [nextPage, setNextPage] = useState(true)
   const [previousPage, setPreviousPage] = useState(false)

    

    
    useEffect(() => {
          const fetchData = async ()=>{
            try {
               const products = await axiosInstance(`homepage/?page=${currentPage}`).then(response => response.data );
                setProductDetails(products.results || []); 
                setNextPage(products.next !== null)
                setPreviousPage(products.previous !== null)
    
            } catch (error) {
                console.log(`error while fetch products ${error}`);              
            }
            
        }
        fetchData()
       
      }, [currentPage]);

      const nextPageButton = ()=>{
        if (nextPage){
          setCurrentPage(currentPage + 1)
        }
        
      }
      const PreviousPageButton = ()=>{
        if(previousPage){
          setCurrentPage(currentPage - 1)
        }
      }
    
  return (
    <>

    <div className="container">

            {productDetails.map(product=> (
  
              <div key={product.id}  className="product-card">
                <img src={`http://localhost:8000/${product.first_image}`} alt=""/>
              <div className="title-container"> <h3>{product.name}</h3></div>
              <p className="price">&#8377;{product.price}</p> 
                <Link to={`/product/${product.slug}/`}>View</Link>
               </div> 
             
            ))}
            <div className="pagination">
              {previousPage && <button onClick={PreviousPageButton}>Previous</button>}
              <span className='page-number'> Page&nbsp;{currentPage}</span>
              {nextPage && <button onClick={nextPageButton}>Next</button>}
            </div>
            </div>
            
           

      
    
    </>
  )
}

export default HomePage