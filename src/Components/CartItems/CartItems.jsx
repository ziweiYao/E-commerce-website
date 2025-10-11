import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


const CartItems = () => {
    const {all_product, cartItems, removeFromCart, getToltalCartAmount} = useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        {all_product.map((e) =>{
            if(cartItems[e.id]>0){ 
            // key = {e.id}避免了报错，如果在后面的return里有输入类的东西，没有key = e.id可能会出现在第一个输入框里写字
            // 第二个框却出现了文字的尴尬情况
                return <div key={e.id}>
                            <div className="cartitems-format">
                                <img src={e.image} alt='' className='carticon-product-icon'/>
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                            </div>  
                        </div>
            }
            else{
                return null
            }
        }
        )}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-items">
                        <p>Subtotal</p>
                        <p>${getToltalCartAmount()}</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-items">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <p>${getToltalCartAmount()}</p>
                    </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
                <div className="cartitems-promotcode">
                    <p>if you have a promotcode, enter it here</p>
                    <input className='cartitems-promobox'></input>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems