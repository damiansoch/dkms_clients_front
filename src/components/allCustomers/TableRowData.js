import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { updateAxiosFunction } from '../../genericFunctions/axiosFunctions';
import { getCustomers } from '../../store/customersSlice';
import { useDispatch } from 'react-redux';
import NoData from '../generic/NoData';

const TableRowData = ({ customer, clickHandler, setResultMessage }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  const dispatch = useDispatch();

  const editChangeHandler = async (customer) => {
    if (editMode) {
      console.log('Saving new data');
      console.log(editedData);
      const endpoint = `https://localhost:7280/api/Customer/update/${customer.id}`;
      var data = await updateAxiosFunction(endpoint, editedData);
      console.log(data);
      setResultMessage(data);
      dispatch(getCustomers());
    }
    setEditMode(!editMode);
    setEditedData(customer);
  };
  return (
    <tr>
      <td
        onClick={(e) => !editMode && clickHandler(customer.id)}
        style={{ cursor: 'pointer' }}
      >
        {!editMode ? (
          customer.firstName
        ) : (
          <input
            value={editedData.firstName}
            onChange={(e) =>
              setEditedData({ ...editedData, firstName: e.target.value })
            }
          ></input>
        )}
      </td>
      <td
        onClick={(e) => !editMode && clickHandler(customer.id)}
        style={{ cursor: 'pointer' }}
      >
        {!editMode ? (
          customer.lastName
        ) : (
          <input
            value={editedData.lastName}
            onChange={(e) =>
              setEditedData({ ...editedData, lastName: e.target.value })
            }
          ></input>
        )}
      </td>
      <td
        onClick={(e) => !editMode && clickHandler(customer.id)}
        style={{ cursor: 'pointer' }}
      >
        {!editMode ? (
          customer.companyName
        ) : (
          <input
            value={editedData.companyName}
            onChange={(e) =>
              setEditedData({ ...editedData, companyName: e.target.value })
            }
          ></input>
        )}
      </td>
      <td>
        <ButtonGroup aria-label='Basic example' className=' d-flex'>
          <Button
            onClick={() => {
              editChangeHandler(customer);
            }}
            className=' btn-sm'
            variant='warning'
          >
            {!editMode ? 'Edit' : 'Save'}
          </Button>
          {!editMode && (
            <Button className=' btn-sm' variant='danger'>
              Delete
            </Button>
          )}
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default TableRowData;
