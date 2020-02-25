import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class Header extends React.Component {
  constructor(props) {
      super(props);
      this.state = {

      }
    }

    render() {
    return (
      <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Alquiler de Lavadoras</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/order">Listar Ordenes</Nav.Link>
      <Nav.Link href="/form-order">Crear Orden</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

    )
  }
}

export default Header;
