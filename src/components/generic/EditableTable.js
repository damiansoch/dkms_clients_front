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
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDetails } from '../../store/selectedCustomerSlice';
import { convertToLabel } from '../../genericFunctions/converters';
import SpinnerComponent from './SpinnerComponent';
import { validateData } from '../../genericFunctions/dataValidators';
//import { editContact } from '../../CRUD functions/classes/contactFunctions';
import { isResponseSuccess } from '../../genericFunctions/functions';
import { IoAddOutline } from 'react-icons/io5';
import { addEditObject } from '../../CRUD functions/addEditFunctions';
import ConfirmatoinModal from './ConfirmatoinModal';

const EditableTable = () => {
  const [data, setData] = useState({});
  const [detailsSelected, setDetailsSelected] = useState('contacts');
  const [editedItemId, setEditedItemId] = useState('');
  const [editedItem, setEditedItem] = useState({});
  const [message0, setMessage0] = useState([]);
  const [action, setAction] = useState('');
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const response = await addEditObject(editedItem, action);
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
  useEffect(() => {
    if (shouldNavigate) {
      if (action === 'addcontacts') {
        setMessage0("Can't add more contacts");
      } else {
        navigate(`/addEdit/${action}/${id}`);
        setShouldNavigate(false); // Reset the trigger
      }
    }
  }, [shouldNavigate, action, id, navigate]);

  //delete and modal setup
  const deleteItemHandler = (id) => {
    console.log('deleting: ' + id);
    setEditedItemId(id);
    setAction(`delete${detailsSelected}`);
    setMessage0('');

    setShowConfirmModal(true);
  };
  const handleConfirm = async () => {
    const response = await addEditObject(editedItemId, action);
    let isSuccess = isResponseSuccess(response);

    if (isSuccess) {
      setShowConfirmModal(false);
      setMessage0(response.data);
      dispatch(getCustomerDetails({ id }));
      navigate(`/details/${id}`);
    } else {
      setShowConfirmModal(false);
      setMessage0(response.data);
    }
  };

  const handleCancel = () => {
    console.log('Cancelled');
    setEditedItemId(id);
    setAction(`delete${detailsSelected}`);
    setShowConfirmModal(false);
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
              setEditedItem({});
              setEditedItemId('');
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
              setEditedItem({});
              setEditedItemId('');
            }}
          >
            Addresses
          </Button>
          <Button
            active={detailsSelected === 'jobs'}
            className=' col-4'
            variant={detailsSelected !== 'jobs' ? 'info' : 'success'}
            onClick={() => {
              setDetailsSelected('jobs');
              setEditedItem({});
              setEditedItemId('');
            }}
          >
            Jobs
          </Button>
        </ButtonGroup>
      </Row>
      <Row>
        {detailsSelected !== 'contacts' && (
          <div
            onClick={() => {
              setAction(`add${detailsSelected}`);
              setShouldNavigate(true);
            }}
            className=' ms-auto col-3 icon text-end'
          >
            <IoAddOutline size={50} className='    text-success' />{' '}
            <span>Add {convertToLabel(detailsSelected)}</span>
          </div>
        )}
      </Row>
      {message0.length > 0 && (
        <ErrorComponent
          variant={isError ? 'danger' : 'success'}
          data={message0}
        />
      )}
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
                      <div
                        style={{
                          cursor:
                            detailsSelected !== 'contacts'
                              ? 'pointer'
                              : 'not-allowed',
                        }}
                      >
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={() => deleteItemHandler(item.id)}
                          disabled={detailsSelected === 'contacts'}
                          style={{
                            cursor:
                              detailsSelected !== 'contacts'
                                ? 'pointer'
                                : 'not-allowed',
                          }}
                        >
                          Delete
                        </Button>
                      </div>
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
                </CardFooter>
              </Card>
            </Form>
          </div>
        ))
      )}
      <ConfirmatoinModal
        show={showConfirmModal}
        onHide={handleCancel}
        onConfirm={handleConfirm}
        message={`Are you sure you want to delete the item from ${convertToLabel(
          detailsSelected
        )}?
        `}
      />
    </>
  );
};

export default EditableTable;
