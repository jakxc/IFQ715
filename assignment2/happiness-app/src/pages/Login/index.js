import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Alert from "../../components/Alert";
import bastionImg from "../../assets/low-poly-bastion.png"
import "./styles.css"

const Login = ({ onLoginChanged }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("")

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const API_URL = "https://d2h6rsg43otiqk.cloudfront.net/prod"
        const url = `${API_URL}/user/login`;

        return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(true);
                setMessage(data.message);
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", formData.email)
                onLoginChanged(true);
                navigate({ pathname: "/" });
            }

            setFormData({email: "", password: ""});
        })
        .catch((error) => console.log(error));
    };

    return (
        <Container fluid='sm'>
            <Row>
                <Col sm={12} md={4} className="my-auto">
                    <img src= {bastionImg}
                    className="bastion-img anim-hover" alt="Bastion"></img>
                </Col>
                <Col sm={12} md={8} className="my-auto p-4">
                    <h3 className="primary-color">Log In</h3>
                    {message && <Alert type={error ? "error" : "success"} message={message}></Alert>}
                    <form className="d-flex flex-column gap-3">
                        <div className="d-flex flex-column">
                            <label className="form-label" htmlFor="emailInput">Email address</label>
                            <input 
                                type="email" 
                                id="emailInput" 
                                placeholder="Enter email address" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <label className="form-label" htmlFor="passwordInput">Password</label>
                            <input 
                                type="password" 
                                id="passwordInput" 
                                placeholder="Enter password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-center text-lg-start pt-2">
                            <button className="fw-bold" onClick={handleLogin}>Login</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link className="primary-color" 
                            to="/register">Register here</Link></p> 
                        </div>
                    </form>
                </Col>
            </Row> 
        </Container>
    )
}

export default Login;