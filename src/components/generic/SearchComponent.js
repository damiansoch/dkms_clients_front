import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  Row,
} from 'react-bootstrap';

const SearchComponent = () => {
  return (
    <Card>
      <CardBody>
        <Form inline>
          <Row>
            <Col xs='auto'>
              <Form.Control
                type='text'
                placeholder='Search'
                className=' mr-sm-2'
              />
            </Col>
            <Col xs='auto'>
              <Button type='submit'>Submit</Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
      <CardFooter className=' text-center'>
        <small>Searching by: </small>
      </CardFooter>
    </Card>
  );
};

export default SearchComponent;
