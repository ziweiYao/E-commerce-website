import React from 'react'
import "./Offers.css"
import the_offering_product from '../Assets/product_type1_v1.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>ROBOT</h1>
            <h1>Discount Event</h1>
            <p>The best selling variant:</p>
            <button>Know More</button>
        </div>
        <div className="offers-right">
            <img src= {the_offering_product} alt='offering product'/>
        </div>
    </div>
  )
}

export default Offers