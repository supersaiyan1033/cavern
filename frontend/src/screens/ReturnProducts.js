import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { returnProducts } from '../actions/adminActions'
import HomeScreen from './HomeScreen'


function ReturnProducts (){
    const dispatch = useDispatch()
    const data = useSelector(state => state.returnProducts)
     const {error,loading, returnProducts} = data
    useEffect(() => {
        dispatch(returnProducts())
    },[dispatch])
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Returned</th>
                                </tr>
                            </thead>

                             <tbody>
                                {returnProducts.map(data => (
                                    <tr key={data.sellerId}>
                                         <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.company}</td>
                                        <td>
                                            <Button  onClick={()=>console.log('hi')} >Returned</Button>
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