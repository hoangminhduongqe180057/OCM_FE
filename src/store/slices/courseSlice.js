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

export const fetchCourseById = createAsyncThunk(
  'course/fetchCourseById',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/course/${courseId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch course");
    }
  }
);

export const fetchLessons = createAsyncThunk(
  'lesson',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/lesson/course/${courseId}`);
      return response.data.data || [];
    } catch (error) {
      console.error("Fetch lessons error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to fetch lessons");
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

export const updateCourse = createAsyncThunk(
  'courses/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/course/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors || "Failed to update course");
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/course/${courseId}`);
      return courseId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors || "Failed to delete course");
    }
  }
);

export const createLesson = createAsyncThunk(
  "lesson/create",
  async (lessonData, { rejectWithValue }) => {
    try {
      const response = await api.post("/lesson", lessonData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors || "Failed to create lesson");
    }
  }
);

export const updateLesson = createAsyncThunk(
  'lesson/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log(`id là ${id}, data là ${data}`)
      const response = await api.put(`/lesson/${id}`, data);
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors || "Failed to update lesson");
    }
  }
);

export const deleteLesson = createAsyncThunk(
  "lesson/delete",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/lesson/${lessonId}`);
      return lessonId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errors || "Failed to delete lesson");
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    course: null,
    lessons: [],
    lesson: null,
    status: "idle",
    createStatus: "idle",
    createError: null,
    error: null,
    updateStatus: "idle",
    updateError: null,
    deleteStatus: "idle",
    deleteError: null,
  },
  reducers: {
    clearCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all courses
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
      // fetch course by id
      .addCase(fetchCourseById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.course = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // create course
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
      })
      // fetch lesson
      .addCase(fetchLessons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lessons = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Course
      .addCase(updateCourse.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.course = action.payload;
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error.message;
      })
      // Delete Course
      .addCase(deleteCourse.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.courses = state.courses.filter((course) => course.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      })
      // create lesson
      .addCase(createLesson.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.lessons.push(action.payload);
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      // Update Lesson
      .addCase(updateLesson.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.lesson = action.payload;
        const index = state.lessons.findIndex((lesson) => lesson.id === action.payload.id);
        if (index !== -1) {
          state.lessons[index] = action.payload;
        }
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error.message;
      })
      // Delete Lesson
      .addCase(deleteLesson.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.lessons = state.lessons.filter((lesson) => lesson.id !== action.payload);
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      });
  },
});

export const { clearCreateStatus } = courseSlice.actions;
export default courseSlice.reducer;