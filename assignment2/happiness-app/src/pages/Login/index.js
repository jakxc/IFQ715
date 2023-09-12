import { Container, Col, Row } from "react-bootstrap";
import bastionImg from "../../assets/low-poly-bastion.png"
import "./styles.css"

const Login = () => {
    return (
        <Container fluid='sm'>
            <Row>
                <Col sm={12} md={4} className="my-auto">
                    <img src= {bastionImg}
                    className="bastion-img anim-hover" alt="Bastion"></img>
                </Col>
                <Col sm={12} md={8} className="my-auto p-4">
                    <h3 className="primary-color">Log In</h3>
                    <form className="d-flex flex-column gap-3">
                        <div className="d-flex flex-column">
                            <label className="form-label" for="emailInput">Email address</label>
                            <input type="email" id="emailInput" className=""
                            placeholder="Enter email address" />
                        </div>
                        <div className="d-flex flex-column">
                            <label className="form-label" for="passwordInput">Password</label>
                            <input type="password" id="passwordInput" className=""
                            placeholder="Enter password" />
                        </div>
                        <div className="text-center text-lg-start pt-2">
                            <button className="fw-bold">Login</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                className="primary-color">Register here</a></p>
                        </div>
                    </form>
                </Col>
            </Row> 
        </Container>
    )
}

export default Login;