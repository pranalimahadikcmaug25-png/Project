import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, clearToken } from "../auth";
import { useEffect, useState } from "react";

export function NavigationBar() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    clearToken();
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm py-3">
      <Container fluid>
        {/* Logo / Brand */}
        <Navbar.Brand href="/" style={{ fontWeight: "bold", fontSize: "24px" }}>
          ✈ Sky-Path
        </Navbar.Brand>

        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          {/* Left side navigation */}
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/flights">
              <Nav.Link>Flights</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/info">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact Us</Nav.Link>
            </LinkContainer>
           
          </Nav>

          {/* Right side actions */}
          <Nav className="ms-auto d-flex align-items-center">
            {!loggedIn ? (
              <>
                <LinkContainer to="/login">
                  <Button variant="outline-light" className="me-2">
                    User Login
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="outline-light" className="me-2">
                    Sign Up
                  </Button>
                </LinkContainer>
                <LinkContainer to="/admin/login">
                  <Button variant="warning">Admin Login</Button>
                </LinkContainer>
              </>
            ) : (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
