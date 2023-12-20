import "./styles.css";

const ProjectCard = ({title, desc, image, url}) => {
    return (
        <div class="card">
            <img src={image} alt="Card" className="card__img" />
            <div class="card__content">
                <p class="card__title">{title}</p>
                <p class="card__desc">{desc}</p>
                <a href={url}><button type="button" className="btn-primary card__btn | mt-3">View</button></a>
            </div>
        </div>
    )
}

export default ProjectCard;