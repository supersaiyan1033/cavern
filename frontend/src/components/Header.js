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
        // history.push('/')
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

                                        <NavDropdown title='Add Stocks' id='username'>
                                        <LinkContainer to='/addnewstocks'>
                                            <NavDropdown.Item>New</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/addoldstocks'>
                                            <NavDropdown.Item>Existing</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>

                                    <LinkContainer to='/userorderrequests'>
                                        <Nav.Link>Orders</Nav.Link>
                                    </LinkContainer>
                                    <NavDropdown title='Offers' id='username'>
                                        <LinkContainer to='/addoffers'>
                                            <NavDropdown.Item>Add</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/removeoffers'>
                                            <NavDropdown.Item>Remove</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>

                                </Row>
                                ):( <Row>
                                    <Nav className="ml-auto">
                                       <LinkContainer to='/'>
                                          <Navbar.Brand>Shopping Cavern</Navbar.Brand>
                                      </LinkContainer>
                                    </Nav>
                                    <Nav className = "ml-5">
                                    <LinkContainer to='/admins'>
                                        <Nav.Link >Admins</Nav.Link>
                                        </LinkContainer>
                                        <NavDropdown title='Sellers' id='adminmenue'>
                                        <LinkContainer to='/unverifiedsellers'>
                                            <NavDropdown.Item>Approve</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/verifiedsellers'>
                                            <NavDropdown.Item>Remove</NavDropdown.Item>
                                        </LinkContainer>
                                        </NavDropdown>
                                        <NavDropdown title='Products' id='adminmenue'>
                                        <LinkContainer to='/deliverproducts'>
                                            <NavDropdown.Item>Deliver</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/returnproducts'>
                                            <NavDropdown.Item>Return</NavDropdown.Item>
                                        </LinkContainer>
                                       </NavDropdown>
                                       <NavDropdown title='Account' id='adminmenue'>
                                       <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                       <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                       </NavDropdown>
                                   </Nav>
                                </Row>)
                                

                            ) : (   <Row>
                                    
                                    <LinkContainer to='/' className='mr-auto'>
                                    <Navbar.Brand>Shopping Cavern</Navbar.Brand>
                                    </LinkContainer>

                                    <SearchBox />
                                   {/* <div style={{'padding':'20px'}}></div> */}
                                    {/* <LinkContainer to='/cart'>
                                    <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                                    </LinkContainer> */}
                                    <Nav className="ml-auto">
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>  Login</Nav.Link>
                                    </LinkContainer>
                                     {/* <div style={{'padding':'10px'}}></div> */}
                                    <LinkContainer to='/register'>
                                        <Nav.Link><i className="fas fa-user"></i>  Register</Nav.Link>
                                    </LinkContainer>
                                    </Nav>

                                    </Row>
                                )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
