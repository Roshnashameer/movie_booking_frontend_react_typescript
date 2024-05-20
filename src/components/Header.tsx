import React from 'react';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    dashboard?: boolean;
}

const Header: React.FC<HeaderProps> = ({ dashboard }) => {
    const navigate = useNavigate();

    const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentId");
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <div>
            <Navbar className="bg-primary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="https://i.postimg.cc/wjY2nf1g/efe5cd5c172b4c6c70c2e19cc6a4c2f8-png-wh860-removebg-preview.png"
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                        />{' '}
                        <span id='he' className='fs-2 ms-3'>MovieMix</span>
                    </Navbar.Brand>
                    {dashboard && (
                        <Nav>
                            <Nav.Link href="#home">
                                <button onClick={(e) => logOut(e)} className='text-white bg-primary fs-3 border-0 ' >Logout
                                    <i className="fa-solid fa-right-from-bracket text-white ms-3"></i>
                                </button>
                            </Nav.Link>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
