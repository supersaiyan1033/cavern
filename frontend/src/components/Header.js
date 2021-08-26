import {React,useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col,Form , Navbar, Nav, Container, Row, NavDropdown, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header({history}) {

    const userLogin = useSelector(state => state.userLogin)
    const [rolling,setRolling] = useState(false)
    const { userInfo,loggingOut } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        setRolling(true)
        dispatch(logout())
        setRolling(false)
        // history.push('/login')
    }
    useEffect(() => {
       
    }, [rolling])

    return (
        <header>
 <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container fluid>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ShoppingCavern</Navbar.Brand>
                    </LinkContainer>
                      <SearchBox />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                                 {userInfo ?
                                userInfo.role=='buyer'?
                                
                                    <Nav className="ml-auto">

                                      

                                        <LinkContainer to='/cart'>
                                        <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                                        </LinkContainer>
                                        
                                        <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        {!rolling&& <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>}
                                        {rolling &&<Spinner></Spinner>}
                                        </NavDropdown>

                                    </Nav>
                                       
                                :userInfo.role=='seller'?
                                 <Nav className = "ml-auto">
                                  

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

                                
                                : 
                                    <Nav className="ml-auto">
                                      
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
                                   </Nav>:
                                   <Nav className="ml-auto">
                                   

                                        <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>  Login</Nav.Link>
                                    </LinkContainer>
                                    
                                    <LinkContainer to='/register'>
                                        <Nav.Link><i className="fas fa-user"></i>  Register</Nav.Link>
                                    </LinkContainer>
                                        
                                   

                                       
                                   </Nav>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

                         