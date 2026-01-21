import "./Banner.scss"
import {Link} from 'react-router-dom'

const Banner = () => {
  return (
    <div className='dukan-banner'>
        <div className="container">
            <div className="dukan-banner-inner">
                <div className="dukan-overview">
                      <p className="heading-about">E-commerce Solution</p>  
                      <h1>Your Digital Shop</h1>
                      <p className="summary">Empowering local businesses with seamless e-commerce solutions, smokePlanet bridges the gap between traditional markets and the digital world.</p>
                      <Link to='/register' className="btn-start-free">Start Free</Link>
                </div>
                <div className="dukan-cover-image">
                    <img src="https://i.ibb.co/G4H35kxX/asset-891349f4.jpg" alt="cover Image" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner