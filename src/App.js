import React, { useContext, useEffect } from 'react'
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home/Home'
import Products from './Products/Products';
import Categories from './Categories/Categories';
import Brands from './Brands/Brands';
import Cart from './Cart/Cart';
import Login from './Login/Login';
import Register from './Register/Register';
import NotFound from './NotFound/NotFound';
import LogOut from './LogOut/LogOut';
import { TokenContext } from './Context/TokenContext';
import ProtectComponent from './ProtectComponent';
import ProductDetails from './ProductDetails';
import WishList from './Wishlist/WishList';
import ForgetPassword from './FrorgetPassword/ForgetPassword';
import VerifyCode from './VerifyCode/VerifyCode';

export default function App() {

  let { setToken } = useContext(TokenContext)
  
  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      setToken(localStorage.getItem('userToken'))
    }
  }, [] );

  const routes = createHashRouter([{
       path: '', element: <Layout />, children: [
      { index:true , element: <ProtectComponent><Home /></ProtectComponent>  },
      { path: 'Products', element: <ProtectComponent><Products /></ProtectComponent> },
      { path: 'home', element: <ProtectComponent><Home /></ProtectComponent> },
      { path: 'Categories', element: <ProtectComponent><Categories /></ProtectComponent> },
      { path: 'Cart', element: <ProtectComponent><Cart /></ProtectComponent> },
      { path: 'Wish', element: <ProtectComponent><WishList /></ProtectComponent> },
      { path: 'Brands', element: <ProtectComponent><Brands /></ProtectComponent> },
      { path: 'ProductDetails/:id', element: <ProtectComponent><ProductDetails /></ProtectComponent> },
      { path: 'ForgetPassword', element: <ForgetPassword /> },
      { path: 'VerifyCode', element: <VerifyCode/> },
      {path:  'Login' , element:<Login/>},
      {path:  'Register' , element:<Register/>},
      {path:  'LogOut' , element:<LogOut/>},
      {path:  '*' , element:<NotFound/>}
    ]
}])

  return (

      <RouterProvider router={routes} >

      </RouterProvider>
 
  )
}
