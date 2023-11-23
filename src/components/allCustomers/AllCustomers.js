import { useEffect } from 'react';
import { getCustomers } from '../../store/customersSlice';
import { useDispatch, useSelector } from 'react-redux';
import AllUsersTable from './AllUsersTable';

const AllCustomers = () => {
  const dispatch = useDispatch();
  const { customers, isLoading, isError, errorMessage } = useSelector(
    (state) => state.customers
  );
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  return <AllUsersTable customers={customers} />;
};

export default AllCustomers;
