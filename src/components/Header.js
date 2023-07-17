import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png"
import {useLocation} from "react-router-dom"
import { NavLink } from "react-router-dom";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import Button from "react-bootstrap/Button";

const Header = (props) => {
  const  location  = useLocation();
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img 
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React"
            />
            <span> TommyHo</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/users"  className="nav-link">Manage Users</NavLink>
            </Nav>
            <Nav>  
                <NavDropdown title="Setting" id="basic-nav-dropdown" >
                  <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
