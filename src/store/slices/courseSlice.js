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
      return response.data.data;
    } catch (error) {
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
      });
  },
});

export const { clearCreateStatus } = courseSlice.actions;
export default courseSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Mock API (thay bằng API thật)
// const mockApi = {
//   async fetchCourses() {
//     return [
//       {
//         id: "COURSE_0001",
//         title: "Lập trình JavaScript Cơ bản",
//         description: "Học cách lập trình JavaScript từ cơ bản đến nâng cao.",
//         instructorId: "USR_00000001",
//         instructorName: "Instructor 1",
//         categoryId: "CAT_00000001",
//         categoryName: "Programming",
//         price: 500000,
//         status: "Draft",
//         thumbnailUrl: "https://gitiho.com/caches/cc_medium/cou_avatar/2022/03_16/image_27cb4b9735841f68167e1e06d80e86a7.jpg",
//         createdAt: "2025-04-01T10:00:00Z",
//         lessons: [
//           {
//             id: "LESSON_0001",
//             title: "Giới thiệu JavaScript",
//             description: "Tổng quan về ngôn ngữ JavaScript.",
//             duration: 30,
//             videoUrl: "https://example.com/video1.mp4",
//             order: 1,
//           },
//           {
//             id: "LESSON_0002",
//             title: "Biến và Kiểu dữ liệu",
//             description: "Tìm hiểu về biến và kiểu dữ liệu trong JavaScript.",
//             duration: 45,
//             videoUrl: "https://example.com/video2.mp4",
//             order: 2,
//           },
//         ],
//       },
//     ];
//   },
//   async fetchCourseById(id) {
//     const courses = await mockApi.fetchCourses();
//     return courses.find((course) => course.id === id);
//   },
//   async createCourse(data) {
//     return { ...data, id: `COURSE_${Date.now()}` };
//   },
//   async updateCourse({ id, data }) {
//     return { id, ...data };
//   },
// };

// // Async thunks
// export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () => {
//   const response = await mockApi.fetchCourses();
//   return response;
// });

// export const fetchCourseById = createAsyncThunk("courses/fetchCourseById", async (id) => {
//   const response = await mockApi.fetchCourseById(id);
//   if (!response) throw new Error("Khóa học không tồn tại");
//   return response;
// });

// export const createCourse = createAsyncThunk("courses/createCourse", async (data) => {
//   const response = await mockApi.createCourse(data);
//   return response;
// });

// export const updateCourse = createAsyncThunk("courses/updateCourse", async ({ id, data }) => {
//   const response = await mockApi.updateCourse({ id, data });
//   return response;
// });

// const courseSlice = createSlice({
//   name: "courses",
//   initialState: {
//     courses: [],
//     course: null,
//     status: "idle",
//     error: null,
//     createStatus: "idle",
//     createError: null,
//     updateStatus: "idle",
//     updateError: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Courses
//       .addCase(fetchCourses.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCourses.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.courses = action.payload;
//       })
//       .addCase(fetchCourses.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       // Fetch Course By Id
//       .addCase(fetchCourseById.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCourseById.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.course = action.payload;
//       })
//       .addCase(fetchCourseById.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       // Create Course
//       .addCase(createCourse.pending, (state) => {
//         state.createStatus = "loading";
//       })
//       .addCase(createCourse.fulfilled, (state, action) => {
//         state.createStatus = "succeeded";
//         state.courses.push(action.payload);
//       })
//       .addCase(createCourse.rejected, (state, action) => {
//         state.createStatus = "failed";
//         state.createError = action.error.message;
//       })
//       // Update Course
//       .addCase(updateCourse.pending, (state) => {
//         state.updateStatus = "loading";
//       })
//       .addCase(updateCourse.fulfilled, (state, action) => {
//         state.updateStatus = "succeeded";
//         state.course = action.payload;
//         const index = state.courses.findIndex((course) => course.id === action.payload.id);
//         if (index !== -1) {
//           state.courses[index] = action.payload;
//         }
//       })
//       .addCase(updateCourse.rejected, (state, action) => {
//         state.updateStatus = "failed";
//         state.updateError = action.error.message;
//       });
//   },
// });

// export default courseSlice.reducer;