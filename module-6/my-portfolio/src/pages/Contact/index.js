import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import emailjs from "@emailjs/browser"
import TextField from "../../components/TextField"
import Modal from "../../components/Modal"
import loadingGif from "../../assets/bouncing-ball.gif"

const Contact = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs
        .send(
            process.env.REACT_APP_EMAIL_SERVICE_ID, 
            process.env.REACT_APP_EMAIL_TEMPLATE_ID, 
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                message: message
            },
            process.env.REACT_APP_EMAIL_USER_ID)
        .then(
            (res) => {
                console.log(res);
                setFirstName("");
                setLastName("");
                setEmail("");
                setMessage("");
            },
            (err) => {
                console.log(err)
                alert('Failed to send the message, please try again')
            }
        )
        .finally(() => setLoading(false))
    }

    return (
        <Container fluid="sm" className="mt-5 py-5">
            {loading && <Modal content={<img src={loadingGif} />} text="Loading..."/>}
            <h1 className="mb-4">Contact Me</h1>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col md={4} className="mb-3">
                        <TextField 
                            value={firstName}
                            placeholder="First Name" 
                            type="text" 
                            label="First Name" 
                            onInputChanged={setFirstName}
                            isRequired={true}
                        />
                    </Col>
                    <Col md={4} className="mb-3">
                        <TextField 
                            value={lastName}
                            placeholder="Last Name" 
                            type="text" 
                            label="Last Name" 
                            onInputChanged={setLastName}
                            isRequired={false}
                        />
                    </Col>
                    <Col md={8} className="mb-3">
                        <TextField 
                            value={email}
                            placeholder="Email" 
                            type="email" 
                            label="Email" 
                            onInputChanged={setEmail}
                            isRequired={true}
                        />
                    </Col>
                    <Col md={8} className="mb-5">
                        <TextField 
                            value={message}
                            placeholder="Message" 
                            type="text" 
                            label="Message" 
                            onInputChanged={setMessage}
                            isRequired={true}
                        />
                    </Col>
                    <Col md={12}><button type="button" className="btn-primary" onClick={handleSubmit}>Send</button></Col>
                </Row>
            </form>
        </Container>
    )
}

export default Contact;