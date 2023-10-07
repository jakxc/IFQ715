import "./styles.css";
import Typewriter from "typewriter-effect";
import test from "../../assets/profile.jpg"

const ProjectCard = () => {
    return (
        <div class="card">
            <div class="card__content">
                <p class="card__title">Card Title</p>
                <p class="card__desc">Card Desc.</p>
                <button type="button" className="btn-primary card__btn | mt-3">View</button>
            </div>
            <img src="https://images.unsplash.com/photo-1482877346909-048fb6477632?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=958&q=80" alt="article-cover" />
        </div>
    )
}

export default ProjectCard;