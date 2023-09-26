import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

const Header = ( { isLoggedIn, onLoginChanged } ) => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
   
    useEffect(() => {
        const onScroll = () => {
          if (window.scrollY > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        }
    
        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
      }, [])
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        onLoginChanged(false);
        navigate({ pathname: "/" });
    }

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <Container fluid>
                <Navbar expand="md" className="nav | d-flex justify-content-between align-items-center p-3">
                    <HighlightLink to="/"><h4 className="fw-bold">World Happiness Rankings</h4></HighlightLink>
                    <div className="d-flex justify-content-center"> 
                        <Navbar.Toggle aria-controls="navbarSupportedContent" className="nav_toggle">
                            <span>
                                <FontAwesomeIcon
                                    icon={faBars} 
                                />
                            </span>
                        </Navbar.Toggle>
                        <Navbar.Collapse id="navbarSupportedContent">
                            {isLoggedIn && localStorage.getItem("user") && <div className="color-primary | me-3">Welcome <span className="fw-bold">{localStorage.getItem("user")}</span>!</div>}
                            <Nav className="gap-4">
                                {isLoggedIn && <HighlightLink onClick={handleLogout}>
                                    Logout
                                </HighlightLink>}
                                {!isLoggedIn && <HighlightLink to="/login">
                                    Login
                                </HighlightLink>}
                                {!isLoggedIn && <HighlightLink to="/register">
                                    Register
                                </HighlightLink>}
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </Container>
        </header>
    )
}

export default Header;