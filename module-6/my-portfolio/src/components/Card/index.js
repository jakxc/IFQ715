import Card from 'react-bootstrap/Card';
import "./styles.css"
import test from "../../assets/profile.jpg"

const ProjectCard = () => {
    return (
        <div className="card">
            <img 
                src={test}
                className="card_img"
                alt="portfolio" 
            />
            <div className="card_content">
                <h3 className="card_title">Card Name</h3>
                <p className="card_description">Card Disc</p>
                <button
                    className="primary-background text-dark | btn fw-bold"
                    onClick={() => window.open("")}
                >View</button>
            </div>
        </div>
    )
}

export default ProjectCard;