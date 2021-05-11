import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { returnProduct } from '../actions/adminActions'
import { returnParticularProduct } from '../actions/adminActions'
import HomeScreen from './HomeScreen'


function ReturnProducts ({history}){
    const dispatch = useDispatch()
    const data = useSelector(state => state.returnProducts)
    const {error,loading, returnProducts} = data
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    useEffect(() => {
        if(!userInfo)
        {
            history.push('/')
        }
        dispatch(returnProduct())
    },[dispatch,userInfo])
    return (
        <div>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    :returnProducts
                       ? (<div>
                        <h1>Delivered Orders</h1>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Return</th>
                                </tr>
                            </thead>

                             <tbody>
                                {returnProducts.map(data => (
                                    <tr key={data.orderedItemId}>
                                        <td>{data.orderedItemId}</td>
                                         <td>{data.orderId.buyerId.name}</td>
                                        <td>{data.orderId.buyerId.email}</td>
                                        <td>
                                            <Button  onClick={()=>dispatch(returnParticularProduct(data.orderedItemId))} >Returned</Button>
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

export default ReturnProducts