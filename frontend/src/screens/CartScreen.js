import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart,getCart } from '../actions/cartActions'
import Loader from '../components/Loader'
import { CART_UPDATE } from '../constants/cartConstants'

function CartScreen({ match, location, history }) {
    const stockId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    
    const { cartItems,loading } = cart
    const [fetch,setFetch] = useState(true)
    useEffect(() => {
        if (stockId) {
            dispatch(addToCart(stockId, qty))
            setFetch(false)
            console.log(cartItems)
        }
        else{
            dispatch(getCart())
            console.log(cartItems)
        }
    },
      [dispatch, stockId, qty]
     )


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                    {loading?<Loader/>:
                cartItems? cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.stockId.stockId}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.stockId.productId.image} alt={item.stockId.productId.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.stockId.stockId}`}>{item.stockId.productId.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                            &#8377;{item.stockId.price}
                                        </Col>

                                        <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.quantity}
                                                onChange={(e) => dispatch(addToCart(item.stockId.stockId, Number(e.target.value)))}
                                            >
                                                {

                                                    [...Array(item.stockId.availableQuantity).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.stockId.stockId)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ):<Loader/>}
            </Col>

            <Col md={4}>
               {cartItems&&!loading&&<Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
                            &#8377;{cartItems.reduce((acc, item) => acc + item.quantity * item.stockId.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>


                </Card>}
            </Col> 
        </Row>
    )
}

export default CartScreen