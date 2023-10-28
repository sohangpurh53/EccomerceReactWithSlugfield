import React, { useState } from 'react';
import ProductForm from '../forms/productForm'
import CategoryForm from '../forms/categoryForm';
import '../css/dashboard.css'
import OrderList from './Orders';


const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('TableDisplay'); // Set initial component to display
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // useEffect(() => {
  //   const loadingTimeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(loadingTimeout);
  // }, []);



  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ProductForm':
        return <ProductForm />;
     
      case 'CategoryForm':
        return <CategoryForm />;
      case 'OrderDetails':
        return <OrderList />;
      default:
        return '';
    }
  };

  return (
    <>

        
       
    
       <div className="dashboard-container">

        <div className="arrow-container">
        <div className="toggle-button" onClick={toggleMenu}>
      <div className='arrow-btn-design'><div className="arrow"> <i className="bi bi-layout-sidebar-inset"></i></div></div>  
      </div>
      <div className={`sidebar${isMenuOpen ? ' open' : ''}`}>
        <ul>
          <li>
            <button className='sidebar-btn' onClick={() => handleClick('ProductForm')}>Create-Product</button>
          </li>
          <li>
            <button className='sidebar-btn' onClick={() => handleClick('CategoryForm')}>Create-Category</button>
          </li>
          <li>
            <button className='sidebar-btn' onClick={() => handleClick('OrderDetails')}>Orders Recieved</button>
          </li>
        </ul>
      </div></div>
        

      
          <div className='burger-menu'>
                {isMenuOpen ? (
                  <div className="close-icon" onClick={toggleMenu}>
                    <span className='cross1'></span>
                    <span className='cross2'></span>
                  </div>
                ) : (
                  <div className="burger-icon" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
                )}
                {isMenuOpen && (
                  <div className="menu-options">
                     <button onClick={() => handleClick('ProductForm')}>Create-Product</button>
                  <button onClick={() => handleClick('CategoryForm')}>Create-Category</button>
                  <button onClick={() => handleClick('OrderDetails')}>Order Recieved</button>
                               
                  </div>
                )}
              </div>

          
          

            <div className="dashboard-main-content">
              {renderComponent()} {/* Render the active component */}
            </div>

            </div>
      
   
    </>
  );
};

export default AdminDashboard;