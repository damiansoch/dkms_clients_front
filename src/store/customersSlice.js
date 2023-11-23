import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomers = createAsyncThunk(
  'customers/getCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://localhost:7280/api/Customer');
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || 'An error occured');
    }
  }
);

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(getCustomers.pending, (state, payload) => {
        state.customers = [];
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.customers = [];
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default customersSlice.reducer;
