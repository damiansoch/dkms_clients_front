import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getJobs = createAsyncThunk(
  'jobs/getJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://localhost:7280/api/Job');
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || 'An error occured');
    }
  }
);

const initialState = {
  jobs: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(getJobs.pending, (state, payload) => {
        state.jobs = [];
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.jobs = [];
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default jobsSlice.reducer;
