import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container,Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { adminlist } from '../actions/adminActions'
import { removeAdmin } from '../actions/adminActions'
import { addAdmin } from '../actions/adminActions'
import HomeScreen from './HomeScreen'


function Admins (){
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const dispatch = useDispatch()
    const data = useSelector(state => state.adminsList)
     const {error,loading, adminsList} = data
    useEffect(() => {
        dispatch(adminlist())
    },[dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addAdmin(name,email,phone))
        setName('')
        setEmail('')
        setPhone('')
    }

    return (
        <div>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    :adminsList
                       ? (<div>
                            <Container>
                           <Form onSubmit={submitHandler} >
                           <Form.Group controlId='name' >
                          <Form.Control
                          type="text" placeholder="Name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}/>
                          </Form.Group>
                          <Form.Group controlId='email' >
                         <Form.Control 
                        type="text" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='phone' >
                        <Form.Control 
                        type="text" placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit"> Add Admin </Button>
                          </Form>
                            </Container>

                        <h1>Admins</h1>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>

                             <tbody>
                                {adminsList.map(data => (
                                    <tr key={data.adminId}>
                                         <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>
                                            <Button  onClick={()=>dispatch(removeAdmin(data.adminId))} >Remove</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody> 
                        </Table>
                        </div>
                    )
                       :<div>
                           <h1>home</h1>
                       </div>
                    }
        </div>
    )
}

export default Admins