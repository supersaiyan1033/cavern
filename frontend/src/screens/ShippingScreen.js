import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import Loader from '../components/Loader'
function ShippingScreen({ history }) {

    const shipping = useSelector(state => state.shipping)
    const { shippingAddress,fetching } = shipping

    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingAddress)
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress(address))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
           {fetching?<Loader/>: <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        as='textarea'
                        type='text'
                        placeholder='Enter address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>}
        </FormContainer>
    )
}

export default ShippingScreen
