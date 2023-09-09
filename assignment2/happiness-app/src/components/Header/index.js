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
            <Container fluid="sm" className="d-flex justify-content-between align-items-center p-4">
                <h3>World Happiness Rankings</h3>
                <Navbar expand="md" className="nav | m-0 p-0">
                    {/* <Navbar.Brand href="#" className="primary-color | fw-bold">Jakxc</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="navbarSupportedContent" className="nav_toggle">
                        <span>
                            <FontAwesomeIcon
                                icon={faBars} size="2x"
                            />
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="gap-3 me-auto">
                            <HighlightLink to="/">
                                Home
                            </HighlightLink>
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