import { Container, Col, Row } from "react-bootstrap";

const Weather = ({ weather }) => {
    return (
        weather  
        ? <Container className="d-flex flex-column">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <div className="d-flex">
                <img src={weather.current.condition.icon}/>
                <h3>{weather.current.temp_c}</h3>
            </div>
            <h2>{weather.current.condition.text}</h2>
        </Container> 
        : <div>Weather is not available for this location.</div>
    )
}

export default Weather;