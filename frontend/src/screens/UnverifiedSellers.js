import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { unverifiedSeller } from '../actions/adminActions'
import { verifySeller } from '../actions/adminActions'


function UnverifiedSellers (){
    const dispatch = useDispatch()
    const data = useSelector(state => state.unverifiedSellers)
    const {error,loading,unverifiedSellers} = data

    useEffect(() => {
        dispatch(unverifiedSeller())
    },[dispatch])
    console.log(unverifiedSellers)
    return (
        <div>
            <h1>Unverified Sellers</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Verify</th>
                                </tr>
                            </thead>

                             <tbody>
                                {unverifiedSellers.map(data => (
                                    <tr key={data.sellerId}>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.company}</td>
                                        <td>
                                            <Button  onClick={()=>dispatch(verifySeller(data.sellerId))} >Approve</Button>
                                            {/* <Button variant="secondary" type="submit">
                                            Reject Order
                                            </Button> */}
                                        </td>
                                     </tr>
                                ))}
                            </tbody> 
                        </Table>
                    )}
                    
        </div>
    )
}

export default UnverifiedSellers