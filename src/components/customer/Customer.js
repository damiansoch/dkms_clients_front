import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getCustomerDetails,
  resetSelectedCustomer,
} from '../../store/selectedCustomerSlice';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DataTable from '../generic/DataTable';
import NoData from '../generic/NoData';
import ModalGen from '../generic/ModalGen';
import { Button } from 'react-bootstrap';

const Customer = () => {
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCustomer, isLoading, isError, errorMessage } = useSelector(
    (state) => state.selectedCustomer
  );

  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    dispatch(getCustomerDetails({ id }));
    return () => {
      // Reset the state when the component is unmounted
      dispatch(resetSelectedCustomer());
    };
  }, [dispatch, id]);
  return (
    <div className='my-3'>
      <h1
        className=' text-center text-success
      '
      >
        {selectedCustomer.firstName} {selectedCustomer.lastName} <br />{' '}
        {selectedCustomer.companyName}
      </h1>
      <Tabs
        defaultActiveKey='jobs'
        id='uncontrolled-tab-example'
        className='my-3'
      >
        <Tab eventKey='contactDetails' title='Contact'>
          {selectedCustomer.contacts !== null &&
          selectedCustomer.contacts !== undefined &&
          selectedCustomer.contacts.length > 0 ? (
            selectedCustomer.contacts.map((data, index) => (
              <DataTable key={index} data={data} />
            ))
          ) : (
            <NoData variant='danger' data='No data to display' />
          )}
        </Tab>
        <Tab eventKey='address' title='Address'>
          {selectedCustomer.addresses !== null &&
          selectedCustomer.addresses !== undefined &&
          selectedCustomer.addresses.length > 0 ? (
            selectedCustomer.addresses.map((data, index) => (
              <DataTable key={index} data={data} />
            ))
          ) : (
            <NoData variant='danger' data='No data to display' />
          )}
        </Tab>
        <Tab eventKey='jobs' title='Jobs'>
          {selectedCustomer.jobs !== null &&
          selectedCustomer.jobs !== undefined &&
          selectedCustomer.jobs.length > 0 ? (
            selectedCustomer.jobs.map((data, index) => (
              <DataTable key={index} data={data} />
            ))
          ) : (
            <NoData variant='danger' data='No data to display' />
          )}
          <div className='col-12 d-flex justify-content-end mb-3'>
            <Button onClick={handleShowModal}>Add job</Button>
          </div>
          <ModalGen
            show={showModal}
            setShow={setShowModal}
            data='job'
            customerId={selectedCustomer.id}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Customer;
