import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../store/jobsSlice';
import ErrorComponent from '../generic/ErrorComponent';
import SpinnerComponent from '../generic/SpinnerComponent';
import GenericTable from '../generic/GenericTable';

const AllJobs = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, isError, errorMessage } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);
  return (
    <>
      {isError && <ErrorComponent variant='danger' data={errorMessage} />}
      {isLoading ? (
        <SpinnerComponent />
      ) : jobs.lenght === 0 ? (
        <ErrorComponent variant='info' data='No jobs found' />
      ) : !isError ? (
        <>
          <GenericTable data={jobs} excludeFields={['id', 'customerId']} />
        </>
      ) : (
        <ErrorComponent variant='danger' data={errorMessage} />
      )}
    </>
  );
};

export default AllJobs;
