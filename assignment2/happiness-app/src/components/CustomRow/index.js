import { Col, Row } from "react-bootstrap";
import "./styles.css";

const CustomRow = ({ data }) => {
    const colElements = data.map((el, i, a) => {
        console.log(a.length)
        return <Col md={Math.floor(12/a.length)} className="">{el}</Col>
    })

    console.log(data);
    return (
        <Row className="background-dark | p-3 gap-3">
           {colElements}
        </Row>
    )
}

export default CustomRow;