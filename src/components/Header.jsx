import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Button, Nav, Navbar } from 'react-bootstrap';
import './Header.css'; 

function Header() {
    return (
        <>
            <Navbar variant="dark" expand="lg" className="header py-3">
                <Container style={{backgroundColor:"transparent",boxShadow:"0px 0px 0px"}}>
                    <Navbar.Brand href="#home" className='logo'>
                        <img src="https://d18x2uyjeekruj.cloudfront.net/wp-content/uploads/2023/06/unnamed-1.png" alt="Logo" className="d-inline-block align-top me-2 logo-img" />
                        Anganwadi MS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#about">About</Nav.Link>
                            <Nav.Link href="#services">Services</Nav.Link>
                            <Button variant="outline-light" className="ms-2">Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;
