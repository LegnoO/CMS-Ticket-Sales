/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../services/api";

export const fetchPackageTicket = createAsyncThunk(
  "firebase/fetchPackageTicket",
  fetchData
);

const initialState = {
  data: [],
  status: "idle",
  isLoading: false,
  error: null,
};

const packageSlice = createSlice({
  name: "package_ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackageTicket.pending, (state) => {
        Object.assign(state, {
          isLoading: true,
          status: "pending",
        });
      })
      .addCase(fetchPackageTicket.fulfilled, (state, action) => {
        Object.assign(state, {
          isLoading: false,
          status: "succeeded",
          data: action.payload,
        });
      })
      .addCase(fetchPackageTicket.rejected, (state, action) => {
        Object.assign(state, {
          isLoading: false,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});

export default packageSlice.reducer;
