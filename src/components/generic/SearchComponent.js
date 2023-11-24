import { useState } from 'react';
import { Row, Col, Form, Dropdown } from 'react-bootstrap';
import { convertToLabel } from '../../genericFunctions/converters';

const SearchComponent = ({
  selection,
  setSearchText,
  searchText,
  setSearchBy,
  searchBy,
}) => {
  return (
    <Form className=' my-3'>
      <Row>
        <Col className='d-flex align align-items-center justify-content-center'>
          <Dropdown>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              Select
            </Dropdown.Toggle>

            <Dropdown.Menu className=' bg-secondary'>
              {selection.map((item, index) => (
                <Dropdown.Item
                  onClick={() => {
                    setSearchBy(item);
                  }}
                  key={index}
                >
                  {convertToLabel(item)}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className='d-flex align align-items-center justify-content-center'>
          <Form.Control
            placeholder={
              searchBy !== '' ? convertToLabel(searchBy) : 'Select first'
            }
            disabled={searchBy === ''}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col className='d-flex align align-items-center justify-content-center'>
          <p
            style={{ cursor: 'pointer' }}
            className=' text-decoration-underline text-danger'
            onClick={() => setSearchBy('')}
          >
            Clear search
          </p>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchComponent;
