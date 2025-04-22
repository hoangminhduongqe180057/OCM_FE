import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { fetchCourseById, updateCourse } from "../store/slices/courseSlice";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CourseInfo from "../components/courses/CourseInfo";
import LessonTable from "../components/courses/LessonTable";
import CourseFormDrawer from "../components/courses/CourseFormDrawer";

function CourseDetail({ openSidebar }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course, status, error, updateStatus, updateError } = useSelector((state) => state.courses);
  const { role } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [openCourseDrawer, setOpenCourseDrawer] = useState(false);

  useEffect(() => {
    dispatch(fetchCourseById(id));
  }, [dispatch, id]);

  const handleEditCourse = (data) => {
    dispatch(updateCourse({ id, data })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setOpenCourseDrawer(false);
        setIsEditing(false);
      }
    });
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress sx={{ color: "#14375F" }} />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Alert severity="error" sx={{ mt: 5, color: "#E0312E" }}>
        {error || "Không thể tải thông tin khóa học"}
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        background: "#FFFFFF",
        minHeight: "100vh",
        transition: "all 0.3s ease",
        marginLeft: !openSidebar ? "100px" : "0px",
      }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" sx={{ color: "#14375F" }}>
            {isEditing ? "Chỉnh sửa khóa học" : "Chi tiết khóa học"}
          </Typography>
          {["Admin", "Instructor"].includes(role) && (
            <Button
              variant="contained"
              onClick={isEditing ? () => setOpenCourseDrawer(true) : handleToggleEdit}
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              sx={{
                bgcolor: isEditing ? "#E24943" : "#14375F",
                "&:hover": { bgcolor: isEditing ? "#E0312E" : "#6D8199" },
                color: "#FFFFFF",
                "&:focus": { outline: "none" },
              }}
            >
              {isEditing ? "Lưu khóa học" : "Chỉnh sửa"}
            </Button>
          )}
        </Box>

        <CourseInfo course={course} />

        <Typography variant="h5" sx={{ color: "#14375F", mt: 4, mb: 2 }}>
          Danh sách bài học
        </Typography>
        <LessonTable courseId={id} lessons={course?.lessons || []} isEditing={isEditing} />
      </motion.div>

      <CourseFormDrawer
        open={openCourseDrawer}
        onClose={() => setOpenCourseDrawer(false)}
        onSubmit={handleEditCourse}
        createStatus={updateStatus}
        createError={updateError}
        defaultValues={course}
      />
    </Box>
  );
}

export default CourseDetail;