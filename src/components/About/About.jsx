import AboutImage from '/images/about.jpg'
import "./About.scss"





const About = () => {
  return (
    <div className='about-dukan-dar' id='about'>
        <div className="attachment">
            <img src={AboutImage} alt="about logo" />
        </div>
        <div className="about-dukan-content">
            <p className='mini-heading'>Our Vision</p>
            <h2 className='main-heading'>About Us</h2>
            <p className='about-desc'>At smokePlanet, we're passionate about empowering local businesses by providing them with the tools to thrive in the digital age .</p>
            <a href="#">More Here</a>
        </div>
    </div>
  )
}

export default About