import React, { useContext, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import AppContext from '../../Context/context';

const SearchComponent = () => {
  const {
    searchBy,
    searchVisible,
    initialSearchArray,
    updateResultSearchArray,
  } = useContext(AppContext);

  const [searchText, setSearchText] = useState('');

  const changeHandler = (text) => {
    setSearchText(text);
    let filteredResult = initialSearchArray.filter((item) =>
      item[searchBy].toLowerCase().includes(text.toLowerCase())
    );
    updateResultSearchArray(filteredResult);
  };
  return (
    <>
      {searchVisible && (
        <Card>
          <CardBody>
            <Form inline>
              <Row>
                <Col xs='auto'>
                  <Form.Control
                    disabled={searchBy === ''}
                    type='text'
                    placeholder='Search'
                    className=' mr-sm-2'
                    value={searchText}
                    onChange={(e) => {
                      changeHandler(e.target.value);
                    }}
                  />
                </Col>
                <Col xs='auto'>
                  <Button disabled={searchBy === ''} type='submit'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter className=' text-center'>
            {searchBy === '' ? (
              <small>
                Searching by:{' '}
                <span className=' text-info'>Click on the label to select</span>
              </small>
            ) : (
              <small>Searching by: {searchBy}</small>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default SearchComponent;
