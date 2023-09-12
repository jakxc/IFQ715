import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "./styles.css"

const HighlightLink = (props) => {
    return <NavLink 
                {...props}
                className="fw-bold"
                style={({ isActive }) => ({
                    color: isActive ? 'rgb(228, 228, 228)' : 'rgb(224, 136, 92)',
                  })}
            />;
}

const Header = () => {
    return (
        <header>
            <Container fluid className="d-flex justify-content-between align-items-center p-4">
                <HighlightLink to="/"><h4 className="fw-bold">World Happiness Rankings</h4></HighlightLink>
                <Navbar expand="md" className="nav">
                    <Navbar.Toggle aria-controls="navbarSupportedContent" className="nav_toggle">
                        <span>
                            <FontAwesomeIcon
                                icon={faBars} 
                            />
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="gap-4">
                            <HighlightLink to="/login">
                                Login
                            </HighlightLink>
                            <HighlightLink to="/register">
                                Register
                            </HighlightLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    )
}

export default Header;