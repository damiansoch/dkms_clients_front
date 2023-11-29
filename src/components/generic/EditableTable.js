import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  ButtonGroup,
  Row,
  Form,
  Card,
  CardBody,
  CardFooter,
} from 'react-bootstrap';
import ErrorComponent from './ErrorComponent';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDetails } from '../../store/selectedCustomerSlice';
import { convertToLabel } from '../../genericFunctions/converters';
import SpinnerComponent from './SpinnerComponent';
import { validateData } from '../../genericFunctions/dataValidators';
import { editContact } from '../../CRUD functions/classes/contactFunctions';
import { isResponseSuccess } from '../../genericFunctions/functions';

const EditableTable = () => {
  const [data, setData] = useState({});
  const [detailsSelected, setDetailsSelected] = useState('contacts');
  const [editedItemId, setEditedItemId] = useState('');
  const [editedItem, setEditedItem] = useState({});
  const [message0, setMessage0] = useState([]);
  const [action, setAction] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedCustomer, isLoading, isError, errorMessage } = useSelector(
    (state) => state.selectedCustomer
  );

  const handleEdit = (key, value) => {
    const newData = { ...editedItem };
    newData[key] = value;
    setEditedItem(newData);
  };

  useEffect(() => {
    dispatch(getCustomerDetails({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (
      selectedCustomer.contacts !== undefined &&
      selectedCustomer.addresses !== undefined &&
      selectedCustomer.jobs !== undefined
    ) {
      setData(selectedCustomer[detailsSelected]);
      setAction(`edit${detailsSelected}`);
    }
  }, [selectedCustomer, detailsSelected]);

  const selectItemForEditHandler = (itemId) => {
    const selectedItem = selectedCustomer[detailsSelected].find(
      (obj) => obj.id === itemId
    );
    setEditedItem(selectedItem);
  };

  const handleChangeDetailsSubmit = async (e) => {
    e.preventDefault();
    setMessage0([]);

    const errors = validateData(editedItem, action);
    if (errors.length > 0) {
      setMessage0(errors);
    } else {
      const response = await editContact(editedItem, action);
      const isSuccess = isResponseSuccess(response);

      if (isSuccess) {
        setMessage0(response.data);
        dispatch(getCustomerDetails({ id }));
        setEditedItemId('');
        setEditedItem({});
      } else {
        console.log(response.data);
        setMessage0(response.data);
      }
    }
  };
  return (
    <>
      {isLoading && <SpinnerComponent />}
      {isError && <ErrorComponent variant='danger' data={errorMessage} />}
      <Row>
        <ButtonGroup aria-label='Details_group' className=' my-3 '>
          <Button
            active={detailsSelected === 'contacts'}
            className=' col-4'
            variant={detailsSelected !== 'contacts' ? 'info' : 'success'}
            onClick={() => {
              setDetailsSelected('contacts');
            }}
          >
            Contacts
          </Button>
          <Button
            active={detailsSelected === 'addresses'}
            className=' col-4'
            variant={detailsSelected !== 'addresses' ? 'info' : 'success'}
            onClick={() => {
              setDetailsSelected('addresses');
            }}
          >
            Addresses
          </Button>
          <Button
            active={detailsSelected === 'jobs'}
            className=' col-4'
            variant={detailsSelected !== 'contacts' ? 'info' : 'success'}
            onClick={() => {
              setDetailsSelected('jobs');
            }}
          >
            Jobs
          </Button>
        </ButtonGroup>
      </Row>
      {Object.keys(data).length === 0 ? (
        <ErrorComponent variant='info' data='No data available' />
      ) : (
        data.map((item, itemIndex) => (
          <div key={itemIndex} className=' my-3'>
            <Form onSubmit={(e) => handleChangeDetailsSubmit(e)}>
              <Card>
                <CardBody>
                  <Table striped bordered hover>
                    <tbody>
                      {Object.keys(item).map((key) =>
                        key === 'id' || key === 'customerId' ? null : (
                          <tr key={key}>
                            <td>{convertToLabel(key)}</td>
                            {editedItemId !== item.id ? (
                              <td>{item[key]}</td>
                            ) : (
                              <td>
                                <input
                                  type='text'
                                  value={editedItem[key]}
                                  onChange={(e) =>
                                    handleEdit(key, e.target.value)
                                  }
                                />
                              </td>
                            )}
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <div className=' d-flex justify-content-evenly'>
                    {editedItemId !== item.id ? (
                      <Button
                        variant='danger'
                        size='sm'
                        onClick={() => console.log('Delete', itemIndex)}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button variant='success' size='sm' type='submit'>
                        Save
                      </Button>
                    )}
                    <Button
                      variant='warning'
                      size='sm'
                      onClick={() => {
                        setEditedItemId(editedItemId === '' ? item.id : '');
                        selectItemForEditHandler(item.id);
                        setMessage0([]);
                      }}
                    >
                      {editedItemId === item.id ? 'Cancell' : 'Edit'}
                    </Button>
                  </div>
                  {message0.length > 0 && (
                    <ErrorComponent
                      variant={isError ? 'danger' : 'success'}
                      data={message0}
                    />
                  )}
                </CardFooter>
              </Card>
            </Form>
          </div>
        ))
      )}
    </>
  );
};

export default EditableTable;
