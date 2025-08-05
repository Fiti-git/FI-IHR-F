// src/features/support/supportSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTicketsAPI,
  createTicketAPI,
  updateTicketAPI,
  deleteTicketAPI,
} from "./supportAPI";

export const fetchTickets = createAsyncThunk(
  "support/fetchTickets",
  async ({
    filters = {},
    ordering = "-created_at",
    page = 1,
    pageSize = 20,
  } = {}) => {
    const params = { ...filters, ordering, page, page_size: pageSize };
    const response = await fetchTicketsAPI(params);
    return response.data;
  }
);

export const createTicket = createAsyncThunk(
  "support/createTicket",
  async (formData) => {
    const response = await createTicketAPI(formData);
    return response.data;
  }
);

export const updateTicket = createAsyncThunk(
  "support/updateTicket",
  async ({ id, formData }) => {
    const response = await updateTicketAPI(id, formData);
    return response.data;
  }
);

export const deleteTicket = createAsyncThunk(
  "support/deleteTicket",
  async (id) => {
    await deleteTicketAPI(id);
    return id;
  }
);

const supportSlice = createSlice({
  name: "support",
  initialState: {
    tickets: [],
    count: 0,
    next: null,
    previous: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (b) =>
    b
      // fetchTickets
      .addCase(fetchTickets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        const payload = action.payload;
        if (payload.results) {
          state.tickets = payload.results;
          state.count = payload.count;
          state.next = payload.next;
          state.previous = payload.previous;
        } else {
          state.tickets = payload;
          state.count = payload.length;
          state.next = null;
          state.previous = null;
        }
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // createTicket
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.unshift(action.payload);
        state.count += 1;
      })

      // updateTicket
      .addCase(updateTicket.fulfilled, (state, action) => {
        const idx = state.tickets.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.tickets[idx] = action.payload;
      })

      // deleteTicket
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter((t) => t.id !== action.payload);
        state.count -= 1;
      }),
});

export default supportSlice.reducer;
