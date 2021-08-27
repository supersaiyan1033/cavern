import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import Loader from '../components/Loader'

function PaymentScreen({ history }) {

    const payment = useSelector(state => state.payment)
    const shipping = useSelector(state=>state.shipping)
    const {shippingAddress} = shipping
    const { paymentMethod,getting } = payment

    const dispatch = useDispatch()

    const [paymentmethod, setPaymentMethod] = useState('Cash on Delivery')

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentmethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

           {getting?<Loader/>: <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>

                      
                         <Form.Check
                            type='radio'
                            label='Cash on Delivery'
                            id='cod'
                            name='paymentMethod'
                            value="Cash on Delivery"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            checked
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>
                

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>}
        </FormContainer>
    )
}

export default PaymentScreen
