import { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import './Navigation.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { ThemeContext } from '../../contexts/theme.context'



const Navigation = () => {

    const { user, logout } = useContext(AuthContext)
    const { themeValue, switchTheme } = useContext(ThemeContext)

    const navbarStyle = themeValue === 'dark' ? 'light' : 'dark'
    const themeText = themeValue === 'light' ? 'Tema oscuro' : 'Tema claro'

    return (
        <Navbar className='NavBar-custom' bg={navbarStyle} variant={navbarStyle} expand="lg">
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
                        {user && <Link to='/comunidad'>
                            <Nav.Link as="span">Comunidad 360</Nav.Link>
                        </Link>}
                        <NavDropdown title="Viajes" id="navbarScrollingDropdown">
                            <Link to='/viajes'>
                                <NavDropdown.Item as='span' className='dropdown-item'>Ver viajes</NavDropdown.Item>
                            </Link>
                            <Link to='/crear-viaje'>
                                <NavDropdown.Item as='span' className='dropdown-item'>Crear viaje</NavDropdown.Item>
                            </Link>
                        </NavDropdown>

                    </Nav>

                    <Nav className="ms-auto">
                        {user && <Link to="/"><Nav.Link as="span">Bienvenidx {user.username}</Nav.Link></Link>}

                        {user ? <> <Link><Nav.Link as="span" onClick={logout}>Cerrar sesión</Nav.Link></Link>
                        </>
                            :
                            <>
                                <NavDropdown title="Usuario" id="navbarScrollingDropdown">
                                    <Link to='/registro'>
                                        <NavDropdown.Item as='span' className='dropdown-item'>Registro</NavDropdown.Item>
                                    </Link>
                                    <Link to='/iniciar-sesion'>
                                        <NavDropdown.Item as='span' className='dropdown-item'>Iniciar sesión</NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            </>
                        }

                        {user && <Navbar.Text>Bienvenidx {user.username} | </Navbar.Text>}

                        <Nav />
                    </Nav>
                    <Nav>
                        <Link>
                            <Nav.Link as='span' onClick={switchTheme} className="d-flex"> {themeText}</Nav.Link>
                        </Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation

