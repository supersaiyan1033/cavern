import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { userOrderRequest } from '../actions/sellerActions'
import { processRequest } from '../actions/sellerActions'
import HomeScreen from './HomeScreen'


function UserOrderRequests ({history}){
    const dispatch = useDispatch()
    const data = useSelector(state => state.userOrderRequests)
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
     const {error,loading, userOrderRequests} = data
    useEffect(() => {
        if(!userInfo)
        {
            history.push('/')
        }
        if(userInfo){
        dispatch(userOrderRequest(userInfo.sellerId))
        }
    },[dispatch,userInfo])
    return (
        <div>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    :userOrderRequests
                       ? (<div>
                        <h1>User Orders</h1>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Process</th>
                                </tr>
                            </thead>

                             <tbody>
                                {userOrderRequests.map(data => (
                                    <tr key={data.orderedItemId}>
                                        <td>{data.stockId.productId.name}</td>
                                        <td>{data.orderId.buyerId.name}</td>
                                        <td>{data.orderId.buyerId.email}</td>
                                        <td>{data.finalDate.substring(0,10)}</td>
                                        <td>
                                            <Button  onClick={()=>dispatch(processRequest(userInfo.sellerId,data.orderedItemId))} >Process</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody> 
                        </Table>
                        </div>
                    )
                       :<div>
                          <h1>No Items</h1>
                       </div>
                    }
        </div>
    )
}

export default UserOrderRequests

