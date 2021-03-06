import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { unverifiedSeller } from '../actions/adminActions'
import { verifySeller } from '../actions/adminActions'
import HomeScreen from './HomeScreen'

function UnverifiedSellers ({history}){
    const dispatch = useDispatch()
    const data = useSelector(state => state.unverifiedSellers)
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const {error,loading,unverifiedSellers} = data

    useEffect(() => {
        if(!userInfo)
        {
            history.push('/')
        }
        dispatch(unverifiedSeller())
    },[dispatch,userInfo])
    console.log(unverifiedSellers)
    return (
        <div>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    :unverifiedSellers
                       ? (
                           <div>
                               <h1>Unverified Sellers</h1>
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
                                        </td>
                                     </tr>
                                ))}
                            </tbody> 
                        </Table>
                        </div>
                    )
                      :
                      <div>
                           <h1>Home</h1>
                       </div>
                    }
                    
        </div>
    )
}

export default UnverifiedSellers