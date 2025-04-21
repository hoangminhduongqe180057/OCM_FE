import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api';

export const fetchCourses = createAsyncThunk(
  'course',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/course');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await api.post("/course", courseData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors || "Failed to create course");
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    status: "idle",
    createStatus: "idle",
    createError: null,
    error: null,
  },
  reducers: {
    clearCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCourse.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      });;
  },
});

export const { clearCreateStatus } = courseSlice.actions;
export default courseSlice.reducer;