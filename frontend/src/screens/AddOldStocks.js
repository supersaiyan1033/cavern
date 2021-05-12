import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container,Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { addOldStock } from '../actions/sellerActions'
import { addOldParticularStock } from '../actions/sellerActions'
import HomeScreen from './HomeScreen'


function AddOldStocks ({history}){
    const dispatch = useDispatch()
    const [StockId,setStockId]=useState('')
    const [Quantity,setQuantity]=useState('')
    const data = useSelector(state => state.addOldStocks)
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
     const {error,loading, addOldStocks} = data
    useEffect(() => {
        if(!userInfo)
        {
            history.push('/')
        }
        if(userInfo){
            dispatch(addOldStock(userInfo.sellerId))
        }
    },[dispatch,userInfo])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addOldParticularStock(userInfo.sellerId,StockId,Quantity))
        setStockId('')
        setQuantity('')
    }
    return (
        <div>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    :addOldStocks
                       ? (<div>
                           <Container>
                           <Form onSubmit={submitHandler} >
                           <Form.Group controlId='stockId' >
                          <Form.Control
                          type="text" placeholder="StockId" 
                          value={StockId}
                          onChange={(e) => setStockId(e.target.value)}/>
                          </Form.Group>
                          <Form.Group controlId='quantity' >
                         <Form.Control 
                        type="text" placeholder="Quantity"
                        value={Quantity}
                        onChange={(e) => setQuantity(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit"> Update Stock </Button>
                          </Form>
                            </Container>
                        <h1>Existing Stocks</h1>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>StockId</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Last Updated</th>
                                    <th>Available Quantity</th>
                                    <th>Total Quantity</th>
                                </tr>
                            </thead>

                             <tbody>
                                {addOldStocks.map(data => (
                                    <tr key={data.stockId}>
                                        <td>{data.stockId}</td>
                                        <td>{data.productId.name}</td>
                                        <td>{data.price}</td>
                                        <td>{data.dateOfAddition.substring(0,10)}</td>
                                        <td>{data.availableQuantity}</td>
                                        <td>{data.totalQuantity}</td>
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

export default AddOldStocks




 