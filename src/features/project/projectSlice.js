// src/features/project/projectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProjectsAPI,
  createProjectAPI,
  updateProjectAPI,
  deleteProjectAPI,
} from './projectAPI';

/**
 * Fetch projects with optional filters, pagination, and ordering.
 * Supports DRF filterset_fields: employer, status, freelancer
 * and default ordering by '-created_at'.
 */
export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async ({ filters = {}, ordering = '-created_at', page = 1, pageSize = 20 } = {}) => {
    // Build query params object
    const params = { ...filters, ordering, page, page_size: pageSize };
    const response = await fetchProjectsAPI(params);

    // DRF pagination: { count, next, previous, results }
    // If paginated, return full payload; otherwise return array
    return response.data;
  }
);

export const createProject = createAsyncThunk(
  'project/createProject',
  async (project) => {
    const response = await createProjectAPI(project);
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async ({ id, project }) => {
    const response = await updateProjectAPI(id, project);
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (id) => {
    await deleteProjectAPI(id);
    return id;
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    count: 0,
    next: null,
    previous: null,
    status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProjects
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const payload = action.payload;
        if (payload.results && Array.isArray(payload.results)) {
          state.projects = payload.results;
          state.count    = payload.count;
          state.next     = payload.next;
          state.previous = payload.previous;
        } else {
          state.projects = payload;
          state.count    = payload.length;
          state.next     = null;
          state.previous = null;
        }
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error  = action.error.message;
      })

      // createProject
      .addCase(createProject.fulfilled, (state, action) => {
        // unshift to keep newest first (viewset orders by created_at desc)
        state.projects.unshift(action.payload);
        state.count += 1;
      })

      // updateProject
      .addCase(updateProject.fulfilled, (state, action) => {
        const idx = state.projects.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) {
          state.projects[idx] = action.payload;
        }
      })

      // deleteProject
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p.id !== action.payload);
        state.count -= 1;
      });
  },
});

export default projectSlice.reducer;
