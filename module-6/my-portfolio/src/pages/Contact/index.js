import { useEffect, useState } from 'react'
import { useRef } from 'react'
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
        <div className="container">
            <p>
                I am interested in any and all front end development opportunities. Feel free to 
                contact me below if you have any enquries or just want to get in touch!
            </p>
            <div className="contact-form">
                <form ref={form} onSubmit={handleSubmit}>
                    <input 
                        placeholder="First Name" 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                    />
                    <input
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        placeholder="Message or Comments"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <input type="submit" className="form-button" value="SEND" />
                </form>
            </div>
        </div>
    )
}

export default Contact;