import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Snackbar } from "@mui/material";
import { fetchCourses, createCourse } from "../store/slices/courseSlice";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import CourseFormDrawer from "../components/courses/CourseFormDrawer";
import CourseFilterBar from "../components/courses/CourseFilterBar";
import CourseTable from "../components/courses/CourseTable";

function CoursesPage({ openSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, status, createStatus, error, createError } = useSelector((state) => state.courses);
  const { role } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [filterInstructor, setFilterInstructor] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const filteredCourses = courses.map(course => ({
    ...course,
    descriptionShort: course.description?.length > 50 ? `${course.description.substring(0, 50)}...` : course.description,
  })).filter((course) => {
    return (
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterInstructor ? course.instructorId === filterInstructor : true) &&
      (filterCategory ? course.categoryId === filterCategory : true) &&
      (filterStatus ? (course.status || "Draft") === filterStatus : true)
    );
  });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleCreateCourse = (data, reset) => {
    dispatch(createCourse(data)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setOpenDrawer(false);
        reset();
        navigate(`/courses/${result.payload.id}/edit`);
      }
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        background: "#FFFFFF", // Trắng
        minHeight: "100vh",
        transition: "all 0.3s ease",
        marginLeft: !openSidebar ? "100px" : "0px",
      }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 3,
            width: "100%",
          }}
        >
          {["Admin", "Instructor"].includes(role) && (
              <Button
                variant="contained"
                onClick={() => setOpenDrawer(true)}
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 2,
                  bgcolor: "#E24943", // Đỏ cam
                  "&:hover": { bgcolor: "#E0312E" }, // Đỏ đậm
                  color: "#FFFFFF",
                  "&:focus": { outline: "none" },
                }}
              >
                Thêm khóa học
              </Button>
          )}
        </Box>

        <CourseFilterBar
          search={search}
          setSearch={setSearch}
          filterInstructor={filterInstructor}
          setFilterInstructor={setFilterInstructor}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <CourseTable
          courses={filteredCourses}
          status={status}
          error={error}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </motion.div>

      <CourseFormDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onSubmit={handleCreateCourse}
        createStatus={createStatus}
        createError={createError}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Khóa học đã được xóa"
        action={
          <Button color="inherit" onClick={() => console.log("Undo delete")} sx={{ color: "#E24943" }}>
            Hoàn tác
          </Button>
        }
        sx={{ "& .MuiSnackbarContent-root": { backgroundColor: "#FFFFFF", color: "#14375F" } }}
      />
    </Box>
  );
}

export default CoursesPage;