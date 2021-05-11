import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder,cancelOrder,returnOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen({ match, history }) {
    const orderId = match.params.id
    const dispatch = useDispatch()


    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const cancelorder = useSelector(state=>state.cancelOrder)
    const returnorder = useSelector(state=>state.returnOrder)
    const{getting,succeed,mistake} = returnorder
    const {wrong,fetching,success}  = cancelorder
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    if (!loading && !error) {
        order.itemsPrice = order.items.reduce((acc, item) => acc + item.amount * item.quantity, 0).toFixed(2)
    }


    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }

        if (!order || successPay || order.orderId !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(orderId))
        } else if (!order.paid=='Yes') {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
    const cancelOrderHandler = (orderedItemId,orderId)=>{
        dispatch(cancelOrder(orderedItemId,orderId))
        dispatch(getOrderDetails(orderId))
    }
    const returnOrderHandler = (orderedItemId,orderId)=>{
        dispatch(returnOrder(orderedItemId,orderId))
        dispatch(getOrderDetails(orderId))
    }
    return loading||fetching||getting ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
                <div>
                    <h1>OrderId: {order.orderId}</h1>
                    <Row>
                        <Col md={9}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p><strong>Name: </strong> {order.buyerId.name}</p>
                                    <p><strong>Email: </strong><a href={`mailto:${order.buyerId.email}`}>{order.buyerId.email}</a></p>
                                    <p>
                                        <strong>Shipping: </strong>
                                        {order.address}
                                    </p>

                                    {/* {order.status=='Delivered' ? (
                                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                    ) : (
                                            <Message variant='warning'>Not Delivered</Message>
                                        )} */}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {/* {order.paid=='Yes' ? (
                                        <Message variant='success'>Paid on {order.paidAt}</Message>
                                    ) : (
                                            <Message variant='warning'>Not Paid</Message>
                                        )} */}

                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.items.length === 0 ? <Message variant='info'>
                                        Order is empty
                            </Message> : (
                                            <ListGroup variant='flush'>
                                                {order.items.map(item => (
                                                    <ListGroup.Item key={item.orderedItemId}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.stockId.productId.image} alt={item.stockId.productId.name} fluid rounded />
                                                            </Col>

                                                            <Col>
                                                                <Link to={`/product/${item.stockId.stockId}`}>{item.stockId.productId.name}</Link>
                                                            </Col>

                                                            <Col md={3}>
                                                                {item.quantity} X &#8377;{item.amount} = &#8377;{(item.quantity * item.amount).toFixed(2)}
                                                            </Col>
                                                            <Col>
                                                                {item.status}
                                                            </Col>
                                                            <Col>
                                                                 {item.status=='Delivered'? (<Button
                                                                    type='button'
                                                              className='btn-block' onClick={()=>returnOrderHandler(item.orderedItemId,order.orderId)} >
                                                                       Return Order
                                                                        </Button>):item.status!='Cancelled'&&item.status!='In Return'&&
                                                                       ( <Button
                                                                           type='button'
                                                                         className='btn-block'onClick={()=>cancelOrderHandler(item.orderedItemId,order.orderId)} >
                                                                            Cancel Order
                                                                        </Button>)}

                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                </ListGroup.Item>

                            </ListGroup>

                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items:</Col>
                                            <Col>&#8377;{order.totalAmount}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping:</Col>
                                            <Col>&#8377;{0}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {/* <ListGroup.Item>
                                        <Row>
                                            <Col>Tax:</Col>
                                            <Col>${o}</Col>
                                        </Row>
                                    </ListGroup.Item> */}

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total:</Col>
                                            <Col>&#8377;{order.totalAmount}</Col>
                                        </Row>
                                    </ListGroup.Item>


{/*                                 
                                    {order.paymentMethod=='Cash on Delivery'&&
                                    ( <ListGroup.Item>
                           <Button
                            type='button'
                            className='btn-block' >
                        Cancel Order
                        </Button>
                    </ListGroup.Item>)} */}
                                </ListGroup>

                            </Card>
                        </Col>
                    </Row>
                </div>
            )
}

export default OrderScreen
