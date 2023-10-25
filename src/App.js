import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserSignUp from './components/auth/UserSignUp';
import UserSignin from './components/auth/UserSignin';
import SignOutComponent from './components/auth/signOut';
import HomePage from './components/pages/homePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductForm from './components/forms/productForm';
import CategoryForm from './components/forms/categoryForm';
import SingleProductPage from './components/pages/SingleProductPage';
import ProductImageForm from './components/forms/productImageForm';
import UserProfile from './components/pages/userProfile';
import UpdateCategoryForm from './components/forms/updateCategory';
import UpdateProductForm from './components/forms/updateProduct';
import Categories from './components/pages/listCategories.js';
import ListProducts from './components/pages/listProducts';
import DeleteCategory from './components/forms/deleteCategory';
import DeleteProduct from './components/forms/deleteProduct';
import ProductImageList from './components/pages/listProductImage';
import DeleteImageProduct from './components/forms/deleteProductImage';
import Cart from './components/pages/Cart';
import Order from './components/pages/Order';

function App() {
  return (
    <> 
   
    <Router>
      <Header/>
     <div className="app-container">
     <Routes>

      <Route path='/signup' element={<UserSignUp/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signin' element={<UserSignin/>}/>
      <Route path='/signout' element={<SignOutComponent/>}/>
      <Route path='/product/form/' element={<ProductForm/>}/>
      <Route path='/product/image/form/' element={<ProductImageForm/>}/>
      <Route path='/categories/' element={<Categories/>}/>
      <Route path='/products/' element={<ListProducts/>}/>
      <Route path='/category/form/' element={<CategoryForm/>}/>
      <Route path='/product/:slug/' element={<SingleProductPage/>}/>
      <Route path='/product/images/:slug/' element={<ProductImageList/>}/>
      <Route path='/product/images/delete/:id/' element={<DeleteImageProduct/>}/>
      <Route path='/product/update/:slug/' element={<UpdateProductForm/>}/>
      <Route path='/category/update/:slug/' element={<UpdateCategoryForm/>}/>
      <Route path='/category/delete/:slug/' element={<DeleteCategory/>}/>
      <Route path='/product/delete/:slug/' element={<DeleteProduct/>}/>
      <Route path='/user/profile/' element={<UserProfile/>}/>
      <Route path='/cart/' element={<Cart/>} ></Route>
      <Route path='/order/' element={<Order/>} ></Route>
    
     </Routes>
     </div>
     <Footer/>
    </Router>

    
    </>
  );
}

export default App;
