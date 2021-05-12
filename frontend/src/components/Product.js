import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {

    function discountPercent(price,discount){
        return (parseInt(price*100/(100-discount)))
    }
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={product.offerId?`/product/${product.stockId.stockId}`:`/product/${product.stockId}`}>
                <Card.Img src={product.productId.image} />
            </Link>

            <Card.Body>
                <Link to={product.offerId?`/product/${product.stockId.stockId}`:`/product/${product.stockId}`}>
                    <Card.Title as="div">
                        <strong>{product.productId.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.productId.rating} text={`${product.productId.votes} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>

                {!product.offerId?(<Card.Text as="h5">
                    &#8377;{product.price}
                </Card.Text>):(<Card.Text as="h5" >
                     &#8377;{product.price}<span style={{'font-size':'12px','margin-left':'10px'}}><del>{discountPercent(product.price,product.discountPercent)}</del></span>
                </Card.Text>)}
                  <Card.Text>
                    sold by:{product.sellerId.company}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
