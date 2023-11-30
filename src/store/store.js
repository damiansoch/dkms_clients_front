import { configureStore } from '@reduxjs/toolkit';
import customersSlice from './customersSlice';
import selectedCustomerSlice from './selectedCustomerSlice';
import jobsSlice from './jobsSlice';

export const store = configureStore({
  reducer: {
    customers: customersSlice,
    selectedCustomer: selectedCustomerSlice,
    jobs: jobsSlice,
  },
});
