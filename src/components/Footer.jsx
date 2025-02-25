import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo from '../assets/logo.png'


function Footer() {
  return (
    <>
      <footer className="bg-dark text-white py-5">
        <Container>
          <Row>
            <Col md={6}>
              <div className="text-justify">
                <div className='d-flex justify-content-start ms-1'>
                  <img src={logo} height={"50px"} width={"60px"} alt="Logo" />
                  <p className='ms-2' style={{ fontWeight: "800", fontSize: "30px", color: 'white' }}>Anganwadi MS</p>
                </div>
                <p className='ms-4 mb-4 mt-3' style={{ color: 'white', textAlign: 'justify' }}>
                  At Anganwadi MS, we elevate the management of Anganavadi centers with a mix of traditional and advanced solutions, ensuring efficient and personalized care from student registrations to health and nutrition tracking. Our expert team uses cutting-edge technology to provide top-notch support, both in-person and online.

                  Discover the Anganwadi MS difference—visit our website or contact us to begin your journey to better and streamlined Anganavadi operations.
                </p>
              </div>
            </Col>
            <Col md={3}>
              <h5 className='text-center mt-3 fw-bold'>Quick Links</h5>
              <ul className="list-unstyled text-center mt-5">
                <li className='mb-2 fw-bold' ><a href="#" className="text-white" style={{ textDecoration: "none" }}>Home</a></li>
                <li className='mb-2 fw-bold'><a href="#" className="text-white" style={{ textDecoration: "none" }}>Features</a></li>
                <li className='mb-2 fw-bold'><a href="#" className="text-white" style={{ textDecoration: "none" }}>Contact</a></li>
                <li className='mb-2 fw-bold'><a href="#" className="text-white" style={{ textDecoration: "none" }}>Support</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5 className='text-center mt-3 fw-bold'>Contact</h5>
              <p className='text-center'>Email: info@anganwadims.com</p>
              <p className='text-center'>Phone: +91 123 456 7890</p>
            </Col>
          </Row>
        </Container>
      </footer>

    </>
  )
}

export default Footer