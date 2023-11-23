import { configureStore } from '@reduxjs/toolkit';
import customersSlice from './customersSlice';
import selectedCustomerSlice from './selectedCustomerSlice';

export const store = configureStore({
  reducer: {
    customers: customersSlice,
    selectedCustomer: selectedCustomerSlice,
  },
});
