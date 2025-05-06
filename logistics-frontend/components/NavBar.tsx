import Link from 'next/link';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import { useRouter } from "next/router";
import { useAuth } from "@frontegg/nextjs";

const NavBar = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const login = () => {
    window.location.href = "/account/login";
  };

  const logout = () => {
    window.location.href = "/account/logout";
  };

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Diggys Logistics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/dashboard">Dashboard</Nav.Link>
          </Nav>
          {isAuthenticated && user && (
            <div className="d-flex align-items-center">
              <Image
                src={user.profilePictureUrl ?? "/next.svg"}
                roundedCircle
                width="40"
                height="40"
                className="me-2"
                alt={user.name}
              />
              <Nav.Link href="/profile">
                <span className="me-3">{user.name}</span>
              </Nav.Link>
            </div>
          )}
          <Button onClick={handleLoginLogout}>
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
