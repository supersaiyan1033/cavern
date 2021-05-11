import React, { useState } from 'react'
import { Col,Row,Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <div>
        <Form onSubmit={submitHandler} inline>
            <Row>
                <Col sm = {9}>
                <Form.Control
                    type='text'
                    size='sm'
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    className='mr-sm-2 ml-sm-5'
                ></Form.Control>
                </Col>
                <Col sm = {3}>
                <Button
                    type='submit'
                    size="sm"
                    variant='outline-success'
                    className='p-2'
                >
                    Submit
                </Button>
                </Col>
            </Row>
        </Form>
        </div>
    )
}

export default SearchBox
