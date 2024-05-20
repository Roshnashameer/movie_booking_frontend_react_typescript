import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Mail } from 'react-feather';
import { Link } from 'react-router-dom';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="bg-primary text-white mt-5 p-5">
      <Row>
        <Col>
          <h3 className="mb-4">MovieMix</h3>
          <p>Completely Free App to Book Movies</p>
          <p>
            For any Query <Mail className="ms-2 me-2" /> contact@moviemix.com
          </p>
        </Col>
        <Col>
          <div className="ms-5">
            <h3>Links</h3>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Home
            </Link>
            <br />
            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
              Login
            </Link>
            <br />
            <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
              Sign Up
            </Link>
            <br />
          </div>
        </Col>
        <Col>
          <div className="ms-5">
            <h3>Guides</h3>
            <h5>React</h5>
            <h5>React Bootstrap</h5>
            <h5>Routing</h5>
          </div>
        </Col>
        <Col>
          <h3>Contact Us</h3>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control mt-3"
          />
          <div className="mt-3">
            <Button variant="light" className="btn btn-light">
              Send
            </Button>
            <i className="fab fa-github ms-3"></i>
            <i className="fab fa-linkedin ms-3"></i>
            <i className="fab fa-facebook ms-3"></i>
            <i className="fab fa-instagram ms-3"></i>
            <i className="fab fa-twitter ms-3"></i>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
