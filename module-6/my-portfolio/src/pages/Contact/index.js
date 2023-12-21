import { useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import emailjs from '@emailjs/browser'

const Contact = () => {
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    }

    const [formData, setFormData] = useState(initialFormData)

    const form = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        emailjs
        .sendForm(
            process.env.REACT_APP_EMAIL_SERVICE_ID, 
            process.env.REACT_APP_EMAIL_TEMPLATE_ID, 
            form.current, 
            process.env.REACT_APP_EMAIL_USER_ID)
        .then(
            () => {
                alert('Message successfully sent!')
                setFormData(initialFormData);
            },
            () => {
                alert('Failed to send the message, please try again')
            }
        )
    }

    return (
        <Container fluid="sm" className="mt-5 py-5">
            <h1 className="mb-4">Projects</h1>
            <form ref={form} onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <input 
                            placeholder="First Name" 
                            type="text" 
                            name="firstName" 
                            value={formData.firstName}
                            onChange={handleChange}
                            required 
                        />
                    </Col>
                    <Col md={6}>
                        <input
                            placeholder="Last Name"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                    />
                    </Col>
                    <Col md={12}>
                        <input
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                    <Col md={12}>
                        <textarea
                            placeholder="Message or Comments"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </Col>
                    <input type="submit" className="form-button" value="SEND" />
                </Row>
            </form>
        </Container>
    )
}

export default Contact;