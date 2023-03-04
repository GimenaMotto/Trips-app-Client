import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import './Navigation.css'
import { Link } from 'react-router-dom'


const Navigation = () => {

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Link to='/'>
                    <Navbar.Brand>Trips App</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to='/'>
                            <Nav.Link as='span'>Home</Nav.Link>
                        </Link>
                        <NavDropdown title="Viajes" id="navbarScrollingDropdown">
                            <Link to='/viajes'>
                                <NavDropdown.Item as='span'>Ver viajes</NavDropdown.Item>
                            </Link>
                            <Link to='/crear-viaje'>
                                <NavDropdown.Item as='span'>Crear viaje</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation

