import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product.stockId}`}>
                <Card.Img src={product.productId.image} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product.stockId}`}>
                    <Card.Title as="div">
                        <strong>{product.productId.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.productId.rating} text={`${product.productId.votes} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>


                <Card.Text as="h3">
                    &#8377;{product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
