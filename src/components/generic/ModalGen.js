import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel, Col } from 'react-bootstrap';
import { convertToLabel } from '../../genericFunctions/converters';
import { validateForm } from '../allCustomers/validator';
import NoData from './NoData';
import { addAxiosFunction } from '../../genericFunctions/axiosFunctions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCustomers } from '../../store/customersSlice';

const ModalGen = ({ show, setShow, data, customerId = 0 }) => {
  const [initialObject, setInitialObject] = useState({});
  const [columns, setColumns] = useState([]);
  const [errorsO, setErrorsO] = useState([]);
  const [endpoint, setEndpoint] = useState('');
  const [action, setAction] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(initialObject);

  useEffect(() => {
    if (data !== undefined) {
      switch (data) {
        case 'customer':
          setInitialObject(() => ({
            firstName: '', // Required, MaxLength(100)
            lastName: '', // Required, MaxLength(100)
            companyName: undefined, // MaxLength(100), Optional
            phoneNumber: '', // Required, MaxLength(50)
            phoneNumber2: undefined, // MaxLength(50), Optional
            email: '', // Required, MaxLength(200), EmailAddress
            email2: undefined, // MaxLength(200), EmailAddress, Optional
            extraDetails: undefined, // Optional
          }));
          setEndpoint('https://localhost:7280/api/Customer/create');
          setAction('Adding customer');
          break;
        case 'job': {
          setInitialObject(() => ({
            Name: '', // string, required, max length: 100
            Description: '', // string, required
            Price: 0, // decimal, required
            Deposit: 0, // decimal, required
            ToBeCompleted: new Date(), // DateTime, required
          }));
          setEndpoint(`https://localhost:7280/api/Job/${customerId}`);
          setAction('Adding job');
          break;
        }
        default:
          break;
      }
    }
  }, [data, customerId]);

  useEffect(() => {
    setColumns(Object.keys(initialObject));
  }, [initialObject]);

  const handleClose = () => setShow(false);

  const handleAdd = async () => {
    //checks
    const errors = validateForm(initialObject, action);
    if (errors.length > 0) {
      setErrorsO([]);
      setErrorsO((prevErrors) => [...prevErrors, ...errors]);
    } else {
      try {
        console.log(action);
        console.log(endpoint);
        console.log(initialObject);
        const responseId = await addAxiosFunction(endpoint, initialObject);
        dispatch(getCustomers);
        if (action === 'Adding customer') {
          navigate(`/customer/${responseId}`);
        }
        if (action === 'Adding job') {
          navigate(`/customer/${customerId}`);
        }
      } catch (error) {
        console.log(error.message);
        setErrorsO([]);
        setErrorsO((prevErrors) => [...prevErrors, error.message]);
      }
    }
  };

  function isDateType(value) {
    return value instanceof Date && !isNaN(value);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {columns.map((column) => (
              <Form.Group key={column} controlId={column}>
                <FloatingLabel className='mb-3' label={convertToLabel(column)}>
                  {isDateType(initialObject[column]) ? (
                    <input
                      type='date'
                      className='form-control'
                      value={initialObject[column].toISOString().split('T')[0]}
                      onChange={(e) =>
                        setInitialObject((prevObject) => ({
                          ...prevObject,
                          [column]: new Date(e.target.value),
                        }))
                      }
                    />
                  ) : (
                    <Form.Control
                      type='text'
                      placeholder={`Enter ${convertToLabel(column)}`}
                      value={initialObject[column]}
                      onChange={(e) => {
                        const newValue = e.target.value;

                        setInitialObject((prevObject) => ({
                          ...prevObject,
                          [column]: isDateType(prevObject[column])
                            ? new Date(newValue)
                            : newValue,
                          // Parse Price and Deposit as decimals
                          Price:
                            column === 'Price'
                              ? parseFloat(newValue)
                              : prevObject.Price,
                          Deposit:
                            column === 'Deposit'
                              ? parseFloat(newValue)
                              : prevObject.Deposit,
                        }));
                      }}
                    />
                  )}
                </FloatingLabel>
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleAdd}>
            Add
          </Button>
          <Col className=' col-12'>
            {errorsO.length > 0 && <NoData variant={'danger'} data={errorsO} />}
          </Col>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalGen;
