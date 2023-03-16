import { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import './Navigation.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { ThemeContext } from '../../contexts/theme.context'
import logo from '../../utils/Logo.png'
import light from '../../utils/Light.png'
import dark from '../../utils/Dark.png'

const Navigation = () => {

    const { user, logout } = useContext(AuthContext)
    const { themeValue, switchTheme } = useContext(ThemeContext)
    const navbarStyle = themeValue === 'dark' ? 'light' : 'dark'
    const themeText = themeValue === 'light' ? <img
        src={dark}
        width="40"
        height="50"
        className="d-inline-block align-top navbar-brand"
        alt="Logo de mi sitio web"
    /> : <img
        src={light}
        width="40"
        height="50"
        className="d-inline-block align-top navbar-brand"
        alt="Logo de mi sitio web"
    />


    return (
        <Navbar className='NavBar-custom' expand="lg">

            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="40"
                        height="50"
                        className="d-inline-block align-top navbar-brand"
                        alt="Logo de mi sitio web"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to='/'>
                            <Nav.Link as='span'>Home</Nav.Link>
                        </Link>
                        {user && <Link to='/comunidad'>
                            <Nav.Link as="span">Comunidad</Nav.Link>
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
                        {/* {user && <Link to={`/perfil/${user._id}`}><Nav.Link as="span">Bienvenidx {user.username}</Nav.Link></Link>} */}

                        {user && <Navbar.Brand href={`/perfil/${user._id}`}>
                            <img
                                src={user.avatar}
                                alt="avatar"
                                width="40"
                                height="40"
                                className="rounded-circle img-fluid"
                            />
                        </Navbar.Brand>}

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

                        <Nav />
                    </Nav>
                    {/* <Nav>
                        <Link>
                            <Nav.Link as='span' onClick={switchTheme} className="d-flex"> {themeText}</Nav.Link>
                        </Link>

                    </Nav> */}
                </Navbar.Collapse>
            </Container>
            <Nav>
                <Link>
                    <Nav.Link as='span' onClick={switchTheme} className="d-flex"> {themeText}</Nav.Link>
                </Link>

            </Nav>
        </Navbar>
    )
}

export default Navigation

