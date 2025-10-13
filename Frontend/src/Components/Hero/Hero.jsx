import React from 'react'
import './Hero.css'
import hero_im from '../Assets/hero.png'
import arrow from '../Assets/arrow.png'
import hand_wave from '../Assets/hand_icon.png'


const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>Our new product</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src = {hand_wave} alt='hand wave'/>
          </div>
          <p>model</p>
          <p>next generation</p>
          <div className="hero-latest-btn">
          <div>Latest Model</div>
          <img src = {arrow} alt= 'arrow'/>
        </div>
        </div>
      </div>
      <div className="hero-right">
        <img src = {hero_im} alt='Signboard robot'/>
      </div>
    </div>
  )
}

export default Hero