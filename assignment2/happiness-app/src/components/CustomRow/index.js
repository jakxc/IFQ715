import { Col, Row } from "react-bootstrap"

const CustomRow = (data) => {
    return (
        <Row>
            <Col md={2}>Rank</Col>
            <Col md={2}>Country</Col>
            <Col md={2}>Score</Col>
            <Col md={2}>Economy</Col>
            <Col md={2}>Family</Col>
            <Col md={2}>Health</Col>
        </Row>
    )
}

export default CustomRow;