import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { verifiedSeller } from '../actions/adminActions'
import { removeSeller } from '../actions/adminActions'
import HomeScreen from './HomeScreen'


function VerifiedSellers (){
    const dispatch = useDispatch()
    const data = useSelector(state => state.verifiedSellers)
     const {error,loading, verifiedSellers} = data
    useEffect(() => {
        dispatch(verifiedSeller())
    },[dispatch])
    console.log(verifiedSellers)
    return (
        <div>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    :verifiedSellers
                       ? (<div>
                        <h1>Verified Sellers</h1>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>

                             <tbody>
                                {verifiedSellers.map(data => (
                                    <tr key={data.sellerId}>
                                         <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.company}</td>
                                        <td>
                                            <Button  onClick={()=>dispatch(removeSeller(data.sellerId))} >Remove</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody> 
                        </Table>
                        </div>
                    )
                       :<div>
                          <h1>HOME</h1>
                       </div>
                    }
        </div>
    )
}

export default VerifiedSellers