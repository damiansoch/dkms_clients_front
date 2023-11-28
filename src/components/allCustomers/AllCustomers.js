import { useEffect, useState } from 'react';
import { getCustomers } from '../../store/customersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Table } from 'react-bootstrap';
import SpinnerComponent from '../generic/SpinnerComponent';
import ErrorComponent from '../generic/ErrorComponent';
import { TbListDetails, TbEditCircle } from 'react-icons/tb';
import { TiUserDeleteOutline } from 'react-icons/ti';
import ConfirmatoinModal from '../generic/ConfirmatoinModal';
import { deleteAxiosFunction } from '../../genericFunctions/axiosFunctions';
import {
  isResponseSuccess,
  setTemporaryError,
} from '../../genericFunctions/functions';

const AllCustomers = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [error0, setError0] = useState('');

  const dispatch = useDispatch();
  const { customers, isLoading, isError, errorMessage } = useSelector(
    (state) => state.customers
  );
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  //delete and modal setup
  const customerDeleteHandler = (customer) => {
    setSelectedCustomer(customer);
    setShowConfirmModal(true);
  };
  const handleConfirm = async () => {
    const endpoint = `https://localhost:7280/api/Customer/remove/${selectedCustomer.id}`;
    let response = await deleteAxiosFunction(endpoint);
    let isSuccess = isResponseSuccess(response);
    if (isSuccess) {
    } else {
      setTemporaryError(response.data, setError0);
    }
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    console.log('Cancelled');
    setSelectedCustomer('');
    setShowConfirmModal(false);
  };

  useDispatch(() => {
    if (isError) {
      setError0(errorMessage);
    }
  }, [isError]);
  return (
    <>
      {error0.length > 0 && <ErrorComponent variant='danger' data={error0} />}
      {isLoading ? (
        <SpinnerComponent />
      ) : !isError ? (
        <Table striped bordered hover className=' mt-3'>
          <thead>
            <tr>
              <th className='table_header'>First Name</th>
              <th className='table_header'>Last Name</th>
              <th className='table_header'>Company Name</th>
              <th className='table_header'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.companyName}</td>
                <td>
                  <Row className='text-center'>
                    <TbListDetails
                      size={30}
                      className=' text-info  icon col-4'
                    />
                    <TbEditCircle
                      size={30}
                      className=' text-warning icon col-4'
                    />
                    <TiUserDeleteOutline
                      size={30}
                      className=' text-danger  icon col-4'
                      onClick={() => customerDeleteHandler(customer)}
                    />
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <ErrorComponent variant='danger' data={errorMessage} />
      )}
      <ConfirmatoinModal
        show={showConfirmModal}
        onHide={handleCancel}
        onConfirm={handleConfirm}
        message={`Are you sure you want to delete 
        ${selectedCustomer.firstName} 
        ${selectedCustomer.lastName}?`}
      />
    </>
  );
};

export default AllCustomers;
