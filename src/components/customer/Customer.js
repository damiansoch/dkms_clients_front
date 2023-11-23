import React, { useEffect } from 'react';
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

const Customer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCustomer, isLoading, isError, errorMessage } = useSelector(
    (state) => state.selectedCustomer
  );

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
            selectedCustomer.contacts.map((data) => <DataTable data={data} />)
          ) : (
            <NoData variant='danger' data='No data to display' />
          )}
        </Tab>
        <Tab eventKey='address' title='Address'>
          {selectedCustomer.addresses !== null &&
          selectedCustomer.addresses !== undefined &&
          selectedCustomer.addresses.length > 0 ? (
            selectedCustomer.addresses.map((data) => <DataTable data={data} />)
          ) : (
            <NoData variant='danger' data='No data to display' />
          )}
        </Tab>
        <Tab eventKey='jobs' title='Jobs'>
          {selectedCustomer.jobs !== null &&
          selectedCustomer.jobs !== undefined &&
          selectedCustomer.jobs.length > 0 ? (
            selectedCustomer.jobs.map((data) => <DataTable data={data} />)
          ) : (
            <NoData variant='danger' data='No data to display' />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Customer;
