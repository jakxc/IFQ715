import "./styles.css";

const ProjectCard = ({title, desc, image, url}) => {
    return (
        <div class="card">
            <div class="card__content">
                <p class="card__title">{title}</p>
                <p class="card__desc">{desc}</p>
                <a href={url}><button type="button" className="btn-primary card__btn | mt-3">View</button></a>
            </div>
            <img src={image} alt="Card" />
        </div>
    )
}

export default ProjectCard;