import { Container, Col, Row } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import profileImg from "../../assets/profile.jpg"
import "./styles.css"

const Home = () => {
    return (
        <Container fluid="sm" className="mt-5 py-5">
            <Row>
                <Col sm={12} md={8} className="gap-2 mb-3">
                    <h2>
                        Hello, my name is <span className="color-primary | fw-bolder">Jack</span>. 
                        I am a <span className="color-primary | fw-bold">
                        <Typewriter
                            options={{
                                strings: ["Web Developer", "UX Designer", "Front End Developer"],
                                autoStart: true,
                                loop: true,
                                cursorClassName: "typewriter-cursor"
                            }}
                        /></span> with a keen interest in game development and UX Design.
                    </h2>
                    <button type="button" className="btn-primary">Contact Me</button>
                </Col>
                <Col sm={12} md={4}>
                    <div className="profile-frame | mx-auto">
                        <img src={profileImg} className="profile-img" alt="Profile"/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;