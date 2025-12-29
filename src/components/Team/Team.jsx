import Anas from "/images/Muhammad-Anas-Jameel-Engineering.png"
import Mubashar from "/images/Mubasher-Akram-Engineering.png"
import "./Team.scss"

const Team = () => {
  return (
    <div className="our-dukan-team" id="team">
        <div className="our-team-meambers">
            <div className="team-card">
                <div className="team-card-img">
                    <img src={Anas} alt="Anas Developer" />
                </div>
                <div className="member-name">Anas Jameel</div>
                <p className="role">Developer</p>
            </div>
            <div className="team-card">
                <div className="team-card-img">
                    {/* <img src={Mubashar} alt="Mubashar Developer" /> */}
                </div>
                <div className="member-name">Mubashar Akram</div>
                <p className="role">Developer</p>
            </div>
        </div>
        <div className="meet-dukan-team">
            <div className="mini-heading">Our Team</div>
            <h2 className="main-heading">
                Meet Our
            </h2>
            <p className="team-description">
                Meet the dedicated professionals driving innovation and excellence at Dukan Dar every day.
            </p>
        </div>

    </div>
  )
}

export default Team