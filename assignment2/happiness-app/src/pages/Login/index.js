import { Container, Col, Row } from "react-bootstrap";
import islandImg from "../../assets/lowpolyisland.png"

const Login = () => {
    return (
        <Container fluid='sm'>
            <Row>
                <Col sm={12} md={8} className="my-auto">
                    <img src= {islandImg}
            className="img-fluid | anim-hover" alt="https://pngtree.com/freepng/lowpoly-style-low-polygon-style-lowpoly-forest-green-lowpoly-forest_3924447.html from png image from pngtree.com"></img>
                </Col>
                <Col sm={12} md={4} className="my-auto">
                    <h3 className="primary-color">Log In</h3>
                    <form>
                        <div className="mb-4">
                            <label className="form-label" for="emailInput">Email address</label>
                            <input type="email" id="emailInput" className=""
                            placeholder="Enter email address" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="passwordInput">Password</label>
                            <input type="password" id="passwordInput" className=""
                            placeholder="Enter password" />
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
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