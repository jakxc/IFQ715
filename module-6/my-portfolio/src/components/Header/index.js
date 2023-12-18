import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import linkedIn from '../../assets/linkedIn-icon.svg';
import github from '../../assets/github-icon.png';
import instagram from '../../assets/instagram-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "./styles.css"

const HighlightLink = (props) => {
    return <NavLink 
                {...props}
                style={({ isActive }) => ({
                    color: isActive ? 'hsl(27, 88%, 64%)' : 'hsl(0, 0%, 89%)'
                })}
            />
     
}

const Header = () => {
    return (
        <header>
            <Container fluid className="d-flex justify-content-between p-3">
                <Navbar expand="md" className="nav | m-0 p-0">
                    {/* <Navbar.Brand href="#" className="primary-color | fw-bold">Jakxc</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="navbarSupportedContent" className="nav_toggle">
                        <span>
                            <FontAwesomeIcon
                                icon={faBars} size="2x"
                            />
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarSupportedContent" className="pt-2">
                        <Nav className="gap-5 me-auto fs-5">
                            <div className="nav_link" title="Home">
                                <HighlightLink to="/">
                                    Home
                                </HighlightLink>
                            </div>
                            <div className="nav_link" title="Portfolio">
                                <HighlightLink to="/portfolio">
                                    Portfolio
                                </HighlightLink>
                            </div>
                            <div className="nav_link" title="Contact">
                                <HighlightLink to="/contact">
                                    Contact
                                </HighlightLink>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="social-icon | d-flex gap-3">
                    <a href="https://www.linkedin.com/in/jack-chen-798696196/" className="d-inline-flex justify-content-center align-items-center"><img src={linkedIn} alt="LinkedIn" /></a>
                    <a href="https://github.com/jakxc/" className="d-inline-flex justify-content-center align-items-center"><img src={github} alt="Github" /></a>
                    <a href="https://www.instagram.com/ray.jxc/" className="d-inline-flex justify-content-center align-items-center"><img src={instagram} alt="Instagram" /></a>
                </div>
            </Container>
        </header>
    )
}

export default Header;