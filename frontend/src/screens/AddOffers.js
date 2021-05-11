import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container,Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { addOffer } from '../actions/sellerActions'
 import { addParticularOffer } from '../actions/sellerActions'
import HomeScreen from './HomeScreen'


function AddOffers ({history}){
    const dispatch = useDispatch()
    const [StockId,setStockId]=useState('')
    const [Offer,setOffer]=useState('')
    const data = useSelector(state => state.addOffers)
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
     const {error,loading, addOffers} = data
    useEffect(() => {
        if(!userInfo)
        {
            history.push('/')
        }
        if(userInfo){
        dispatch(addOffer(userInfo.sellerId))
        }
    },[dispatch,userInfo])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addParticularOffer(userInfo.sellerId,StockId,Offer))
        setStockId('')
        setOffer('')
    }
    return (
        <div>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    :addOffers
                       ? (<div>
                           <Container>
                           <Form onSubmit={submitHandler} >
                           <Form.Group controlId='stockId' >
                          <Form.Control
                          type="text" placeholder="StockId" 
                          value={StockId}
                          onChange={(e) => setStockId(e.target.value)}/>
                          </Form.Group>
                          <Form.Group controlId='offer' >
                         <Form.Control 
                        type="text" placeholder="Percent"
                        value={Offer}
                        onChange={(e) => setOffer(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit"> Add Offer </Button>
                          </Form>
                            </Container>
                        <h1>Existing Stocks</h1>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>StockId</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>

                             <tbody>
                                {addOffers.map(data => (
                                    <tr key={data.stockId}>
                                         <td>{data.stockId}</td>
                                         <td>{data.productId.name}</td>
                                        <td>{data.price}</td>
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

export default AddOffers




 