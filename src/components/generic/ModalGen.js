import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { convertToLabel } from '../../genericFunctions/converters';
import { validateForm } from '../allCustomers/validator';
import NoData from './NoData';

const ModalGen = ({ show, setShow, data }) => {
  const [initialObject, setInitialObject] = useState({});
  const [columns, setColumns] = useState([]);
  const [errorsO, setErrorsO] = useState([]);
  useEffect(() => {
    if (data !== undefined) {
      switch (data) {
        case 'customer':
          setInitialObject((prevObject) => ({
            ...prevObject,
            firstName: '', // Required, MaxLength(100)
            lastName: '', // Required, MaxLength(100)
            companyName: null, // MaxLength(100), Optional
            phoneNumber: '', // Required, MaxLength(50)
            phoneNumber2: null, // MaxLength(50), Optional
            email: '', // Required, MaxLength(200), EmailAddress
            email2: null, // MaxLength(200), EmailAddress, Optional
            extraDetails: null, // Optional
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
  const handleAdd = () => {
    //checks
    const errors = validateForm(initialObject);
    if (errors.length > 0) {
      setErrorsO('Validation errors:\n' + errors.join('\n\r'));
    } else {
      alert('Form is valid!');
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
          <Button variant='primary' onClick={handleAdd}>
            Add
          </Button>
          {errorsO.length > 0 && <NoData variant={'danger'} data={errorsO} />}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalGen;
