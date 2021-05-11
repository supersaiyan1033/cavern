import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container,Form, Button,Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { addNewStock } from '../actions/sellerActions'
import { addNewParticularStock } from '../actions/sellerActions'
import HomeScreen from './HomeScreen'


function AddOldStocks ({history}){
    const dispatch = useDispatch()
    const [Name,setName]=useState('')
    const [Brand,setBrand]=useState('')
    const [Category,setCategory]=useState('Mobiles')
    const [Details,setDetails]=useState('')
    const [Price,setPrice]=useState('')
    const [Quantity,setQuantity]=useState('')
    const [selectedFile, setSelectedFile] = useState();
   	const [isFilePicked, setIsFilePicked] = useState(false);
    const data = useSelector(state => state.addNewStocks)
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
     const {error,loading, addNewStocks} = data
    useEffect(() => {
        if(!userInfo)
        {
            history.push('/')
        }
        dispatch(addNewStock())
    },[dispatch,userInfo])
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0])
		setIsFilePicked(true)
	}
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addNewParticularStock(userInfo.sellerId,Name,Brand,Category,Details,Price,Quantity,selectedFile))
        setName('')
        setBrand('')
        setCategory('Mobiles')
        setSelectedFile(null)
        setIsFilePicked(false)
        setDetails('')
        setPrice('')
        setQuantity('')
    }
    return (
        <div>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    :addNewStocks
                       ? (<div>
                        <FormContainer>
                           <Form onSubmit={submitHandler}>
                        <Form.Group >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={Name}
                          onChange={(e) => setName(e.target.value)} />
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" placeholder="Brand"  value={Brand}
                          onChange={(e) => setBrand(e.target.value)} />
                           <Form.Group >
                             <Form.Label>Image</Form.Label>
                            {isFilePicked ? (
			                        <Form.Control type="text" placeholder="selected file details" value={selectedFile.name}
                           />
		                         	) : (
	                			<p>Select a file to show details</p>
	                      		)}
                      
                        <Form.File label="Choose File" custom  onChange ={(e)=>changeHandler(e)} ></Form.File>
                      </Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select"  value={Category}
                          onChange={(e) => setCategory(e.target.value)} >
                        <option>Mobiles</option>
                        <option>Laptops</option>
                        <option>Shoes</option>
                        <option>Televisions</option>
                        </Form.Control>
                        <Form.Label>Details</Form.Label>
                        <Form.Control as="textarea" type="text" placeholder="Details"  value={Details}
                          onChange={(e) => setDetails(e.target.value)} />
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Price"  value={Price}
                          onChange={(e) => setPrice(e.target.value)}/>

                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" placeholder="Quantity"  value={Quantity}
                          onChange={(e) => setQuantity(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                         Add Stock
                        </Button>
                </Form>
                </FormContainer>
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




 