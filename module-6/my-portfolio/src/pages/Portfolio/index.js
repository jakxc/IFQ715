import { Container, Col, Row } from "react-bootstrap";
import ProjectCard from "../../components/Card";

const Portfolio = () => {
    return (
        <Container fluid="sm">
            <Row>
                <Col>
                    <ProjectCard />
                </Col>
            </Row>
        </Container>
    )
}

export default Portfolio;