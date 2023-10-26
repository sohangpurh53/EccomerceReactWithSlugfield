import React, { useState } from 'react';
import ProductForm from '../forms/productForm'
import CategoryForm from '../forms/categoryForm';
import '../css/dashboard.css'


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
      default:
        return '';
    }
  };

  return (
    <>

        
       
    
        <>
        
        <div className="toggle-button" onClick={toggleMenu}>
      <div className='arrow-btn-design'><div className="arrow">&#9654;</div></div>  
      </div>
      <div className={`sidebar${isMenuOpen ? ' open' : ''}`}>
        <ul>
          <li>
            <button className='sidebar-btn' onClick={() => handleClick('ProductForm')}>Create-Product</button>
          </li>
          <li>
            <button className='sidebar-btn' onClick={() => handleClick('CategoryForm')}>Create-Category</button>
          </li>
        </ul>
      </div>
        

      
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
                               
                  </div>
                )}
              </div>

          
          

            <div className="dashboard-main-content">
              {renderComponent()} {/* Render the active component */}
            </div>

          
        </>
   
    </>
  );
};

export default AdminDashboard;