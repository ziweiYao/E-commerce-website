import React from 'react'
import './Shop'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'

const Shop = () => {
  return (
    <div className='shop'>
        <Hero/>
        <Popular/>
        <Offers/>
    </div>
  )
}

export default Shop