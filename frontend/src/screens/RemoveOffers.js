import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { removeOffer } from '../actions/sellerActions'
import { removeParticularOffer } from '../actions/sellerActions'
import HomeScreen from './HomeScreen'


function RemoveOffers ({history}){
    const dispatch = useDispatch()
    const data = useSelector(state => state.removeOffers)
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
     const {error,loading, removeOffers} = data
    useEffect(() => {
        if(!userInfo)
        {
            history.push('/')
        }
        if(userInfo){
        dispatch(removeOffer(userInfo.sellerId))
        }
    },[dispatch,userInfo])
    return (
        <div>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    :removeOffers
                       ? (<div>
                        <h1>Offers</h1>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Stock Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>offer Percent</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>

                             <tbody>
                                {removeOffers.map(data => (
                                    <tr key={data.offerId}>
                                        <td>{data.stockId.stockId}</td>       
                                        <td>{data.stockId.productId.name}</td>
                                        <td>{data.stockId.price}</td>
                                        <td>{data.discountPercent}</td>
                                        <td>
                                            <Button onClick={()=>dispatch(removeParticularOffer(userInfo.sellerId,data.offerId))} >Remove</Button>
                                        </td>
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

export default RemoveOffers