import axios from "axios";

export const getCourses = () => axios.get("/api/course");
export const getCourseById = (id) => axios.get(`/api/course/${id}`);
export const createCourse = (data) => axios.post("/api/course", data);
export const updateCourse = (id, data) => axios.put(`/api/course/${id}`, data);
export const deleteCourse = (id) => axios.delete(`/api/course/${id}`);