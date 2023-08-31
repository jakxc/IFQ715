import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

const HighlightLink = (props) => {
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });
    return <Nav.Link {...props} active={match} className="primary-color"/>;
}

const Header = () => {
    return (
        <header>
            <Navbar expand="md">
                <Container fluid>
                    <Navbar.Brand href="#" className="primary-color">Jakxc</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="me-auto">
                            <HighlightLink to="/" as={Link}>
                                Home
                            </HighlightLink>
                            <HighlightLink to="/portfolio" as={Link}>
                                Portfolio
                            </HighlightLink>
                            <HighlightLink to="/contact" as={Link}>
                               Contact Me
                            </HighlightLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;