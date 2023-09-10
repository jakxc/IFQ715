import { Container, Col, Row } from "react-bootstrap";
import bastionImg from "../../assets/low-poly-bastion.png"

const Register = () => {
    return (
        <Container fluid='sm'>
            <Row>
                <Col sm={12} md={4} className="my-auto">
                    <img className="bastion-img anim-hover" src= {bastionImg} alt="Robot"></img>
                </Col>
                <Col sm={12} md={8} className="my-auto p-4">
                    <h3 className="primary-color">Create your account</h3>
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
                            <button className="fw-bold">Create your account</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#!"
                                className="primary-color">Login here</a></p>
                        </div>
                    </form>
                </Col>
            </Row> 
        </Container>
    )
}

export default Register;