import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel, Col } from 'react-bootstrap';
import { convertToLabel } from '../../genericFunctions/converters';
import { validateForm } from '../allCustomers/validator';
import NoData from './NoData';
import { addAxiosFunction } from '../../genericFunctions/axiosFunctions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCustomers } from '../../store/customersSlice';

const ModalGen = ({ show, setShow, data }) => {
  const [initialObject, setInitialObject] = useState({});
  const [columns, setColumns] = useState([]);
  const [errorsO, setErrorsO] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data !== undefined) {
      switch (data) {
        case 'customer':
          setInitialObject((prevObject) => ({
            ...prevObject,
            firstName: '', // Required, MaxLength(100)
            lastName: '', // Required, MaxLength(100)
            companyName: undefined, // MaxLength(100), Optional
            phoneNumber: '', // Required, MaxLength(50)
            phoneNumber2: undefined, // MaxLength(50), Optional
            email: '', // Required, MaxLength(200), EmailAddress
            email2: undefined, // MaxLength(200), EmailAddress, Optional
            extraDetails: undefined, // Optional
          }));
          break;

        default:
          break;
      }
    }
  }, [data]);

  useEffect(() => {
    setColumns(Object.keys(initialObject));
  }, [initialObject]);

  const handleClose = () => setShow(false);

  const handleAddCustomer = async () => {
    //checks
    const errors = validateForm(initialObject);
    if (errors.length > 0) {
      setErrorsO([]);
      setErrorsO((prevErrors) => [...prevErrors, ...errors]);
    } else {
      try {
        console.log('Adding customer');
        const endpoint = 'https://localhost:7280/api/Customer/create';
        const responseId = await addAxiosFunction(endpoint, initialObject);
        dispatch(getCustomers);
        navigate(`/customer/${responseId}`);
      } catch (error) {
        console.log(error.message);
        setErrorsO([]);
        setErrorsO((prevErrors) => [...prevErrors, error.message]);
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {columns.map((column) => (
              <Form.Group key={column} controlId={column}>
                <FloatingLabel className='mb-3' label={convertToLabel(column)}>
                  <Form.Control
                    type='text'
                    placeholder={`Enter ${convertToLabel(column)}`}
                    value={initialObject[column]}
                    onChange={(e) =>
                      setInitialObject((prevObject) => ({
                        ...prevObject,
                        [column]: e.target.value,
                      }))
                    }
                  />
                </FloatingLabel>
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleAddCustomer}>
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
