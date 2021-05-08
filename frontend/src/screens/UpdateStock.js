import { Container ,Row, Col, Form, Button } from 'react-bootstrap'

function UpdateStock() {

    return(
        <Container>
            <Form>
                    <Form.Group >
                        <Form.Label>Product ID</Form.Label>
                        <Form.Control type="text" placeholder="Product ID" value={} />

                        <Form.Label>Stock ID</Form.Label>
                        <Form.Control type="text" placeholder="Stock ID" value={} />

                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Price" value={} />

                        <Form.Label>Available Quantity</Form.Label>
                        <Form.Control type="text" placeholder="Quantity" value={} />

                        <Button variant="secondary" type="submit">
                         Update Stock
                        </Button>

                    </Form.Group>

                </Form>

        </Container>
    )
}