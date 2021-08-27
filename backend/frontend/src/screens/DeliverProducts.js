
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { deliverProduct } from '../actions/adminActions'
import { deliverParticularProduct } from '../actions/adminActions'
import HomeScreen from './HomeScreen'


function DeliverProducts ({history}){
    const dispatch = useDispatch()
    const data = useSelector(state => state.deliverProducts)
    const {error,loading, deliverProducts} = data
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo,loggingOut} = userLogin
    useEffect(() => {
        if(!userInfo)
        {
            history.push('/')
        }
        dispatch(deliverProduct())
    },[dispatch,userInfo])
    return (
        <div>
            {loading||loggingOut
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    :deliverProducts
                       ? (<div>
                        <h1>Placed Orders</h1>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>Deliver</th>
                                </tr>
                            </thead>

                             <tbody>
                                {deliverProducts.map(data => (
                                    <tr key={data.orderedItemId}>
                                        <td>{data.orderedItemId}</td>
                                        <td>{data.orderId.buyerId.name}</td>
                                        <td>{data.orderId.buyerId.email}</td>
                                        <td>
                                            <Button  onClick={()=>dispatch(deliverParticularProduct(data.orderedItemId))} >Delivered</Button>
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

export default DeliverProducts