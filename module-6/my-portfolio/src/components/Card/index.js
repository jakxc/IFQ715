import "./styles.css";
import Typewriter from "typewriter-effect";
import test from "../../assets/profile.jpg"

const ProjectCard = () => {
    return (
        <div className="card">
            <div className="card_section thumbnail">
                <div className="content">
                    <img src="" />
                    <h3>Design</h3>
                </div>
            </div>
            <div className="card_section desc">
                <div className="content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                        <a href="#">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;