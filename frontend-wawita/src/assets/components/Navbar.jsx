import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

import Header from './Header'
import Logo from '../images/logo.webp'

const Navigation = () => {
    return (
        <>
            <Header />
            <Navbar expand="lg" className="navbar-dark">
                <Container>
                    <Navbar.Brand><Link to="/"><Image src={Logo} /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink to="/" className="text-decoration-none"><div className="nav-link">Home</div></NavLink>
                            <NavLink to="/repository" className="text-decoration-none"><div className="nav-link">Productos</div></NavLink>
                            <NavLink to="/register" className="text-decoration-none"><div className="nav-link">Crear cuenta</div></NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation