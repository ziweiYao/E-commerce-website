import React from 'react'
import { useState } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'

export const Navbar = () => {
    const [menu,setMenu] = useState("shop");
  return (
    <div className='navbar'>
            <div className='nav-logo'>
              <img src = {logo} alt = "logo" style={{height: 'auto', width: 'auto'}}/>
              <p>Robotic Tek</p>
            </div>

            <ul className='nav-menu'>
              <li onClick={()=>{setMenu("shop")}}>Shop{menu==="shop"?<hr/>:<></>}</li>
              <li onClick={()=>{setMenu("product_type1")}}>Robot type1 variants{menu==="product_type1"?<hr/>:<></>}</li>
              <li onClick={()=>{setMenu("product_type2")}}>Robot type2 variants{menu==="product_type2"?<hr/>:<></>}</li>
              <li onClick={()=>{setMenu("product_type3")}}>Robot type3 variants{menu==="product_type3"?<hr/>:<></>}</li>
            </ul>

            <div className='nev-login-cart'>
              <button>Login</button>
              <img src={cart_icon} alt='cart'/>
              <div className="nev-cart-count">0</div>
            </div>
    </div>
  )
}
