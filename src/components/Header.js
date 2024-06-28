import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { auth } from "../Config/firebase";
import { signOut } from "firebase/auth";
import "./styles/Header.css";

const Header = ({ siteName }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar">
      <Navbar.Brand as={Link} to="/home" className="site-name">
        {siteName}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Button
            variant="outline-light"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
