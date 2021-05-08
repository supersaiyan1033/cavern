import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col,Form , Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container fluid>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                            {userInfo ? ( 
                                userInfo.role=='buyer'?(
                                <Row className = "row">
                                    <Nav className="ml-auto">

                                        <LinkContainer to='/'>
                                        <Navbar.Brand>Shopping Cavern</Navbar.Brand>
                                        </LinkContainer>
                                    
                                        <SearchBox />

                                    </Nav>
                                    
                                    <Nav className = "ml-5">

                                        <LinkContainer to='/cart'>
                    
                                        <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                                        </LinkContainer>
                                        
                                        <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                        </NavDropdown>

                                    </Nav>
                                    
                                    
                                </Row>
                                ):userInfo.role=='seller'?( <Row>
                                 <Nav className = "ml-5">
                                  <LinkContainer to='/'>
                                        <Navbar.Brand>Shopping Cavern</Navbar.Brand>
                                        </LinkContainer>
                                    <LinkContainer to='/seller/addstock'>
                                        <NavDropdown.Item>Add Stock</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/seller/updatestock'>
                                        <NavDropdown.Item>Update Stock</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/seller/userrequests'>
                                        <NavDropdown.Item>User Requests</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/seller/addoffer'>
                                        <NavDropdown.Item>Add Offer</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>

                                </Row>
                                ):( <Row>
                                <NavDropdown title='Admin' id='adminmenue'>
                                 <LinkContainer to='/'>
                                        <Navbar.Brand>Shopping Cavern</Navbar.Brand>
                                        </LinkContainer>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                                </Row>)
                                

                            ) : (   <Row>

                                    <LinkContainer to='/'>
                                    <Navbar.Brand>Shopping Cavern</Navbar.Brand>
                                    </LinkContainer>

                                    <SearchBox />

                                    <LinkContainer to='/cart'>
                                    <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>  Login</Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to='/register'>
                                        <Nav.Link><i className="fas fa-user"></i>  Register</Nav.Link>
                                    </LinkContainer>

                                    </Row>
                                )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
