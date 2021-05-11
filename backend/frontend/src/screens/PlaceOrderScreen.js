import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { getCart, getPaymentMethod, getShippingAddress } from '../actions/cartActions'
import Loader from '../components/Loader'

function PlaceOrderScreen({ history }) {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const shipping = useSelector(state=>state.shipping)
    const payment = useSelector(state=>state.payment)
    const {fetching,shippingAddress} = shipping
    const {getting,paymentMethod}  = payment
    const {loading,cartItems} =cart
    console.log(cartItems)
    var itemsPrice = cartItems.reduce((acc, item) => acc + item.stockId.price * item.quantity, 0).toFixed(2)
    var shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2)
    // var taxPrice = Number((0.082) * itemsPrice).toFixed(2)
    var totalPrice = (Number(itemsPrice))
    // + Number(shippingPrice) + Number(taxPrice)).toFixed(2)


   

    useEffect(() => {
         if (!paymentMethod) {
        history.push('/payment')
    }
       dispatch(getCart())
       dispatch(getShippingAddress())
       dispatch(getPaymentMethod())
        console.log(cartItems)
        if (success) {
            history.push(`/order/${order.orderId}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [dispatch,success, history])

    const placeOrder = () => {
        dispatch(createOrder({
            cartItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
           itemsPrice: itemsPrice,
          //  shippingPrice: shippingPrice,
        //    taxPrice: taxPrice,
           totalPrice: totalPrice,
       }))
    }
    console.log('hello')
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            {!cartItems||loading||fetching||getting?<Loader/>: <Row>
                 <Col md={8}>
                     <ListGroup variant='flush'>
                         <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Shipping: </strong>
                                   {shippingAddress} 
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                             {cartItems?cartItems.length === 0 ? <Message variant='info'>
                                Your cart is empty
                            </Message> : (
                                    <ListGroup variant='flush'>
                                        {cartItems.map(item => (
                                         <ListGroup.Item key={item.stockId.stockId}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.stockId.productId.image} alt={item.stockId.productId.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.stockId.stockId}`}>{item.stockId.productId.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.quantity} X &#8377;{item.stockId.price} = &#8377;{(item.quantity * item.stockId.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item> 
                                        ))}
                                    </ListGroup>
                                ):<Loader/>} 
                        </ListGroup.Item>  

                    </ListGroup> 

                </Col> 

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>&#8377;{itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>&#8377;{shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {/* <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>&#8377;{taxPrice}</Col>
                                </Row>
                            </ListGroup.Item> */}

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>&#8377;{totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                           {error&& <ListGroup.Item>
                                 <Message variant='danger'>{error}</Message>
                            </ListGroup.Item>}

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row> }
        </div>
    )
}

export default PlaceOrderScreen
