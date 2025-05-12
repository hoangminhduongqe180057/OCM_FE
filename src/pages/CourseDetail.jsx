import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { fetchCourseById, fetchLessons, updateCourse } from "../store/slices/courseSlice";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CourseInfo from "../components/courses/CourseInfo";
import LessonTable from "../components/courses/LessonTable";
import CourseFormDrawer from "../components/courses/CourseFormDrawer";
import LessonFormDrawer from "../components/courses/LessonFormDrawer";

function CourseDetail({ openSidebar }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course, lessons, status, error, updateStatus, updateError } = useSelector((state) => state.courses);
  const { role } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [openCourseDrawer, setOpenCourseDrawer] = useState(false);
  const [openLessonDrawer, setOpenLessonDrawer] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null); // null = thêm mới

  useEffect(() => {
    dispatch(fetchCourseById(id));
    dispatch(fetchLessons(id));
  }, [dispatch, id]);

  const handleEditCourse = (data) => {
    dispatch(updateCourse({ id, data })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(fetchCourseById(id));
        setOpenCourseDrawer(false);
        setIsEditing(false);
      }
    });
  };

  const handleAddLesson = (data) => {
    setSelectedLesson(null);
    setOpenLessonDrawer(true);
  };
  
  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson);
    setOpenLessonDrawer(true);
  };
  
  const handleCloseLessonDrawer = () => {
    setOpenLessonDrawer(false);
    setSelectedLesson(null);
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      setOpenCourseDrawer(true); // Open drawer to save changes
    } else {
      setIsEditing(true);
    }
  };

   const handleCancelEdit = () => {
    setIsEditing(false); // Hủy chế độ chỉnh sửa
  };

  if (status === "loading" && !course) {
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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, width: "100%", }}>
          <Typography variant="h4" sx={{ color: "#14375F" }}>
            {isEditing ? "Chỉnh sửa khóa học" : "Chi tiết khóa học"}
          </Typography>
          {["Admin", "Instructor"].includes(role) && (
            <Box sx={{ display: "flex", gap: 1 }}>
              {isEditing && (
                <Button
                  variant="outlined"
                  onClick={handleCancelEdit}
                  sx={{
                    color: "#E0312E",
                    borderColor: "#E0312E",
                    "&:hover": { borderColor: "#E24943", color: "#E24943" },
                  }}
                >
                  Hủy
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleToggleEdit}
                startIcon={<EditIcon />}//{isEditing ? <SaveIcon /> : <EditIcon />}
                sx={{
                  bgcolor: isEditing ? "#E24943" : "#14375F",
                  "&:hover": { bgcolor: isEditing ? "#E0312E" : "#6D8199" },
                  color: "#FFFFFF",
                  "&:focus": { outline: "none" },
                }}
              >
                {isEditing ? "Chỉnh sửa" : "Cập nhật"}
              </Button>
            </Box>
          )}
        </Box>

        <CourseInfo course={course} />

        <Typography variant="h5" sx={{ color: "#14375F", mt: 4, mb: 2 }}>
          Danh sách bài học
        </Typography>
        <LessonTable courseId={id} lessons={lessons || []} isEditing={isEditing} onAddLesson={handleAddLesson} onEditLesson={handleEditLesson}/>
      </motion.div>

      <CourseFormDrawer
        open={openCourseDrawer}
        onClose={() => setOpenCourseDrawer(false)}
        onSubmit={handleEditCourse}
        createStatus={updateStatus}
        createError={updateError}
        defaultValues={course}
      />

      <LessonFormDrawer
        open={openLessonDrawer}
        onClose={handleCloseLessonDrawer}
        lesson={selectedLesson}
        courseId={id}
      />
    </Box>
  );
}

export default CourseDetail;