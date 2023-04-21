/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../services/api";

export const fetchTicket = createAsyncThunk("firebase/fetchTicket", fetchData);

const initialState = {
  data: [],
  status: "idle",
  isLoading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicket.pending, (state) => {
        Object.assign(state, {
          isLoading: true,
          status: "pending",
        });
      })
      .addCase(fetchTicket.fulfilled, (state, action) => {
        Object.assign(state, {
          isLoading: false,
          status: "succeeded",
          data: action.payload,
        });
      })
      .addCase(fetchTicket.rejected, (state, action) => {
        Object.assign(state, {
          isLoading: false,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});

export default ticketSlice.reducer;
