import React from 'react'
import {Navbar,Nav,NavDropdown,Form,Button,FormControl} from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
function Header() {
    return (
        <Navbar bg="light" expand="lg" className="outernav">
  <Navbar.Brand href="#home" className ="header-brand"><span><LocalMallIcon fontSize="large"/></span> Shopping Cavern</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="navlink ml-auto">
      <Nav.Link href="#home"><span><HomeIcon fontSize="small"/></span> Home</Nav.Link>
      <Nav.Link href="#link"><span><PersonIcon fontSize="small"/></span> Login</Nav.Link>
       <Nav.Link href="#link"><span><PersonAddIcon fontSize="small"/></span> Signup</Nav.Link>
       <Nav.Link href="#cart"><span><ShoppingCartIcon/></span> Cart</Nav.Link>
      {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <IconButton >
          <SearchIcon/>
      </IconButton>
    </Form>
  </Navbar.Collapse>
</Navbar>

    )
}

export default Header
