import { Container ,Row, Col, Form, Button } from 'react-bootstrap'

function UserRequests (){

    return (
        <div>
            <h1>Order Requests</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Order ID</th>
                                    <th>Stock ID</th>
                                    <th>Price</th>
                                    <th>Date Of Order</th>
                                    <th>Assign Serial ID</th>
                                    <th>Place Order</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order.product_id}</td>
                                        <td>{order.product_name}</td>
                                        <td>{order.order_id}</td>
                                        <td>{order.stock_id}</td>
                                        <td>{order.price}</td>
                                        <td>{order.date_of_order}</td>

                                        <td>
                                            <Form>

                                                <Form.Label>Assign Serial ID</Form.Label>
                                                <Form.Control type="text" placeholder="Assign Serial ID"  />

                                            </Form>
                                        </td>

                                        <td>
                                            <Button variant="secondary" type="submit">
                                            Assign Order
                                            </Button>

                                            <Button variant="secondary" type="submit">
                                            Reject Order
                                            </Button>
                                        </td>

                                       
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}