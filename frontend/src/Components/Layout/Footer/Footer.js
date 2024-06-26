import React from 'react'
import play from '../../../images/play.png'
import {Link} from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='left_footer'>
        <h4>Download Our App</h4>
        <div className='picBox'>
            <img src={play} alt='play'/>
        </div>
      </div>

      <div className='mid_footer'>
        <h1>ECOMMERCE</h1>
        <h4>We Deliver the best product</h4>

        <p>Copyrights 2001 &copy; All Right Reserve!</p>
      </div>

      <div className='right_footer'>
        <h3>Follow Us</h3>
        <Link to='https://www.facebook.com/'>Facebook</Link>
        <Link to='https://www.facebook.com/'>Instagram</Link>
        <Link to='https://www.facebook.com/'>Twitter</Link>
      </div>
    </footer>
  )
}

export default Footer
