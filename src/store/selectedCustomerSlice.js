import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomerDetails = createAsyncThunk(
  'selectedCustomer/getCustomerDetails',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://localhost:7280/api/Customer/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || 'An error occured');
    }
  }
);

const initialState = {
  selectedCustomer: {},
  isLoading: false,
  isError: false,
  errorMessage: null,
};

export const selectedCustomerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    resetSelectedCustomer: (state) => {
      // Reset the state to the initial state
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerDetails.fulfilled, (state, action) => {
        state.selectedCustomer = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(getCustomerDetails.pending, (state, payload) => {
        state.selectedCustomer = {};
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(getCustomerDetails.rejected, (state, action) => {
        state.selectedCustomer = {};
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetSelectedCustomer } = selectedCustomerSlice.actions;
export default selectedCustomerSlice.reducer;
