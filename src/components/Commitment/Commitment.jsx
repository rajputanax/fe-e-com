import Lens from "/images/lens.jpg"
import "./Commitment.scss"
const Commitment = () => {
    return (
        <div className='commitments' id='comitments'>
            <div className="container">
                    <div className='dukan-dar-commitments'>
                <div className="our-commitments">
                    <div>
                        <p className="mini-heading">Our Focus</p>
                        <h2 className="main-heading">Our Commitment</h2>
                        <p className="team-description">We are committed to providing local businesses with the tools and support they need to succeed online.</p>
                        <ul>
                            <li>
                                Detailed Product Pages
                            </li>
                            <li>
                                Multiple Payment Gateways
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="commitment-attachment">
                    <img src={Lens} alt="" />
                </div>
                </div>
            </div>
        </div>
    )
}

export default Commitment