import React, { useContext, useEffect, useState } from "react";
import { Navbar as RBNav, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const totalCount = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);

  const [theme, setTheme] = useState("light");
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.body.className = saved;
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme, location]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.body.className = next;
  };

  return (
    <RBNav
      bg={theme === "light" ? "light" : "dark"}
      variant={theme === "light" ? "light" : "dark"}
      expand="lg"
      className="navbar-custom"
      fixed="top"
    >
      <Container>
        <RBNav.Brand as={Link} to="/" className="brand">
          <img src="/images/logo.png" alt="Luna & Granos" className="logo" />
          <span style={{ marginLeft: 8 }}>Luna & Granos Café</span>
        </RBNav.Brand>

        <RBNav.Toggle aria-controls="basic-navbar-nav" />
        <RBNav.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/menu">Carta</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Carrito {totalCount > 0 && <Badge bg="secondary">{totalCount}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                style={{ marginLeft: 12 }}
              >
                <Button
                  variant={theme === "light" ? "outline-dark" : "outline-light"}
                  onClick={toggleTheme}
                  className="theme-toggle"
                >
                  {theme === "light" ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
                </Button>
              </motion.div>
            </AnimatePresence>
          </Nav>
        </RBNav.Collapse>
      </Container>
    </RBNav>
  );
};

export default Navbar;
