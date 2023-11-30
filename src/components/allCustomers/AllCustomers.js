import { useEffect, useState } from 'react';
import { getCustomers } from '../../store/customersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';
import SpinnerComponent from '../generic/SpinnerComponent';
import ErrorComponent from '../generic/ErrorComponent';
import { IoIosPersonAdd } from 'react-icons/io';
import ConfirmatoinModal from '../generic/ConfirmatoinModal';
import { deleteAxiosFunction } from '../../genericFunctions/axiosFunctions';
import { isResponseSuccess } from '../../genericFunctions/functions';
import { useNavigate } from 'react-router-dom';
import GenericTable from '../generic/GenericTable';

const AllCustomers = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [isError0, setIsError0] = useState(false);
  const [message0, setMessage0] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, isLoading, isError, errorMessage } = useSelector(
    (state) => state.customers
  );
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  //delete and modal setup
  const customerDeleteHandler = (customer) => {
    setMessage0('');
    setIsError0(false);
    setSelectedCustomer(customer);
    setShowConfirmModal(true);
  };
  const handleConfirm = async () => {
    const endpoint = `https://localhost:7280/api/Customer/remove/${selectedCustomer.id}`;
    //const endpoint = `https://localhost:7280/api/Customer/remove/c53ff3dd-d0f5-4031-9018-4d07362ec892`;
    let response = await deleteAxiosFunction(endpoint);
    let isSuccess = isResponseSuccess(response);

    if (isSuccess) {
      setShowConfirmModal(false);
      setMessage0(response.data);
      dispatch(getCustomers());
    } else {
      setIsError0(true);
      setShowConfirmModal(false);
      setMessage0(response.data);
    }
  };

  const handleCancel = () => {
    console.log('Cancelled');
    setSelectedCustomer('');
    setShowConfirmModal(false);
  };

  useDispatch(() => {
    if (errorMessage.length > 0) {
      setIsError0(true);
      setMessage0(errorMessage);
    }
  }, [errorMessage]);
  return (
    <>
      <Row className=' my-3 d-flex justify-content-end'>
        <IoIosPersonAdd
          size={50}
          className='col-2 text-success icon'
          onClick={() => {
            navigate('addEdit/addCustomer/0');
          }}
        />
      </Row>
      {message0.length > 0 && (
        <ErrorComponent
          variant={isError0 ? 'danger' : 'success'}
          data={message0}
        />
      )}
      {isLoading ? (
        <SpinnerComponent />
      ) : customers.lenght === 0 ? (
        <ErrorComponent variant='info' data='No customers found' />
      ) : !isError ? (
        <>
          <GenericTable
            data={customers}
            customerDeleteHandler={customerDeleteHandler}
            excludeFields={['id', 'contacts', 'addresses', 'jobs', 'created']}
          />
        </>
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
