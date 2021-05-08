import { Container ,Row, Col, Form, Button } from 'react-bootstrap'

function AddStock() {
    
    return (
        <Container>
                <Form>
                    <Form.Group >
                        <Form.Label>Product ID</Form.Label>
                        <Form.Control type="text" placeholder="Product ID" />

                        <Form.Label>Stock ID</Form.Label>
                        <Form.Control type="text" placeholder="Stock ID" />

                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Price" />

                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" placeholder="Quantity" />

                        <Button variant="secondary" type="submit">
                         Add Stock
                        </Button>

                    </Form.Group>
                </Form>
        </Container>
    )
}

export default AddStock