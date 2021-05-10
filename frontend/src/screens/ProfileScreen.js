import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

function ProfileScreen({ history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [company,setCompany] = useState('')
    const [address,setAddress] = useState('')
    const [phone,setPhone] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    useEffect(() => {
       
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success ) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails(userInfo.role=='buyer'?userInfo.buyerId:userInfo.role=='seller'?userInfo.sellerId:userInfo.adminId))
                if(userInfo.role=='buyer')
                {
                   dispatch(listMyOrders())
                }
               
            } else {
                setName(user.name)
                setEmail(user.email)
                setAddress(user.address)
                setCompany(user.role=='seller'&&user.company)
                setPhone(user.phone)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': userInfo.role=='buyer'?user.buyerId:userInfo.role=='seller'?user.sellerId:user.adminId,
                'name': name,
                'email': email,
                'password': password,
                'address':address,
                'company':company,
                'phone':phone

            }))
             setPassword('')
        setConfirmPassword('')
            setMessage('')
        }

    }
    return (
        <Row className='justify-content-center'>
            <Col md={userInfo.role=='buyer'?5:6}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                     <Form.Group controlId='phone'>
                        <Form.Label>Mobile no</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Mobile no'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    {userInfo.role=='seller'&&
                          <Form.Group controlId='company'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Company'
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    }
                        <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            placeholder='Enter Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                        </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                </Button>

                </Form>
            </Col>

           {userInfo.role=='buyer'&& <Col md={7}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                            <Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        {/* <th>Paid</th> */}
                                        <th>Details</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.orderId}>
                                            <td>{order.orderId}</td>
                                            <td>{order.orderedAt.substring(0, 10)}</td>
                                            <td>&#8377;{order.totalAmount}</td>
                                            {/* <td>{order.paid=='Yes' ? order.paidAt.substring(0, 10) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td> */}
                                            <td>
                                                <LinkContainer to={`/order/${order.orderId}`}>
                                                    <Button className='btn-sm'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </Col>}
        </Row>
    )
}

export default ProfileScreen