import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { useState } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext';


export const Navbar = () => {
  
  const {getTotalCartItems} = useContext(ShopContext)
    const [menu,setMenu_Bar] = useState("temp");
  return (
    <div className='navbar'>
            <div className='nav-logo'>
              <img src = {logo} alt = "logo"/>
              <p>Robotic Tek</p>
            </div>
            <ul className='nav-menu'>
              <li onClick={()=>{setMenu_Bar("shop")}}><Link style={{textDecoration: 'none', color: 'orangered'}} to= '/'>Shop</Link>{menu==='shop'?<hr/>:<></>}</li>
              <li onClick={()=>{setMenu_Bar("product_type1")}}><Link style={{textDecoration: 'none', color: 'orangered'}} to='/product_type1'>Robot type1s</Link>{menu==="product_type1"?<hr/>:<></>}</li>
              <li onClick={()=>{setMenu_Bar("product_type2")}}><Link style={{textDecoration: 'none', color: 'orangered'}} to='/product_type2'>Robot type2s</Link>{menu==="product_type2"?<hr/>:<></>}</li>              
            </ul>

            <div className='nev-login-cart'>
              {localStorage.getItem('auth-token')
              ? <button onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
              : <Link style={{textDecoration: 'none', color: 'orangered'}} to= '/login'><button>Login</button></Link>}
              <Link to = '/cart'><img src={cart_icon} alt='cart'/></Link>
              <div className='nev-login-cart-count'>{getTotalCartItems}</div>
            </div>
    </div>
  )
}
