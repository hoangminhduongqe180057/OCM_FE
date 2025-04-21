import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,  Typography,  Button,  CircularProgress,  Alert,  Card,  CardMedia,  CardContent,  CardActions,  Rating,  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { fetchCourses, createCourse, clearCreateStatus } from "../store/slices/courseSlice";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";

function CoursesPage() {
  const dispatch = useDispatch();
  const { courses, status, createStatus, error, createError } = useSelector((state) => state.courses);
  const { role } = useSelector((state) => state.auth);

  // Hardcoded instructors and categories
  const instructors = [
    { id: "USR_00000001", name: "Instructor 1" },
    { id: "USR_00000002", name: "Instructor 2" },
  ];
  const categories = [
    { id: "CAT_00000001", name: "Programming" },
    { id: "CAT_00000002", name: "Design" },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructorId: "",
    categoryId: "",
    maxStudents: "",
    price: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleOpenModal = () => {
    setOpenModal(true);
    dispatch(clearCreateStatus());
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      title: "",
      description: "",
      instructorId: "",
      categoryId: "",
      maxStudents: "",
      price: "",
    });
    setFormErrors({});
    dispatch(clearCreateStatus());
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = "Tiêu đề là bắt buộc";
    if (!formData.description) errors.description = "Mô tả là bắt buộc";
    if (!formData.instructorId) errors.instructorId = "Vui lòng chọn giảng viên";
    if (!formData.categoryId) errors.categoryId = "Vui lòng chọn danh mục";
    if (formData.maxStudents && isNaN(formData.maxStudents)) errors.maxStudents = "Số học viên tối đa phải là số";
    if (formData.price && isNaN(formData.price)) errors.price = "Giá phải là số";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const courseData = {
      title: formData.title,
      description: formData.description,
      instructorId: formData.instructorId,
      categoryId: formData.categoryId,
      maxStudents: formData.maxStudents ? parseInt(formData.maxStudents) : null,
      price: formData.price ? parseFloat(formData.price) : null,
    };

    dispatch(createCourse(courseData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        handleCloseModal();
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        background: "#F5F5F5", // Light gray background
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#333333" }}>
            Quản lý khóa học
          </Typography>
          {["Admin", "Instructor"].includes(role) && (
            <Button
              variant="contained"
              onClick={handleOpenModal}
            //   href="/courses/new"
              startIcon={<AddIcon />}
              sx={{
                borderRadius: 2,
                bgcolor: "#F06292", // Pink button
                "&:hover": { bgcolor: "#EC407A" },
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              Thêm khóa học
            </Button>
          )}
        </Box>
        {status === "loading" && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {status === "failed" && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || "Không thể tải danh sách khóa học"}
          </Alert>
        )}
        {status === "succeeded" && (
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={
                        course.thumbnailUrl ||
                        "https://gitiho.com/caches/cc_medium/cou_avatar/2022/03_16/image_27cb4b9735841f68167e1e06d80e86a7.jpg"
                      }
                      alt={course.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "#333333", fontWeight: 600 }}
                      >
                        {course.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ color: "#757575", mb: 1 }}
                      >
                        {course.description?.length > 100
                          ? `${course?.description.substring(0, 100)}...`
                          : course?.description}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: "#757575" }} />
                        <Typography variant="body2" sx={{ color: "#757575" }}>
                          {course?.instructorName}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <CategoryIcon sx={{ fontSize: 16, mr: 0.5, color: "#757575" }} />
                        <Typography variant="body2" sx={{ color: "#757575" }}>
                          {course?.categoryName}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Rating
                          value={course?.rating || 4.5} // Fake rating
                          readOnly
                          precision={0.5}
                          size="small"
                          sx={{ color: "#FFB300" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ ml: 0.5, color: "#424242" }}
                        >
                          ({course?.ratingCount || 87}) {/* Fake rating count */}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "#424242" }}>
                        {course?.studentCount || 5064} học viên {/* Fake student count */}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{ color: "#F44336", fontWeight: 600, display: "inline" }}
                        >
                          {course?.price ? `${course.price.toLocaleString()}đ` : "Miễn phí"}
                        </Typography>
                        {course?.price && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#757575",
                              textDecoration: "line-through",
                              ml: 1,
                              display: "inline",
                            }}
                          >
                            {(course?.originalPrice || course?.price * 1.3).toLocaleString()}đ
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: "#F06292",
                          "&:hover": { bgcolor: "#EC407A" },
                          flexGrow: 1,
                        }}
                        onClick={() => console.log(`View course ${course?.id}`)}
                      >
                        Xem chi tiết
                      </Button>
                      {["Admin", "Instructor"].includes(role) && (
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              ml: 1,
                              borderColor: "#1565C0",
                              color: "#1565C0",
                            }}
                            onClick={() => console.log(`Edit course ${course?.id}`)}
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              ml: 1,
                              borderColor: "#d32f2f",
                              color: "#d32f2f",
                            }}
                            onClick={() => console.log(`Delete course ${course?.id}`)}
                          >
                            Xóa
                          </Button>
                        </>
                      )}
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>

      {/* Modal for creating new course */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#333333" }}>Thêm khóa học mới</DialogTitle>
        <DialogContent>
          {createStatus === "failed" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {createError || "Không thể tạo khóa học"}
            </Alert>
          )}
          <TextField
            label="Tiêu đề"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            error={!!formErrors.title}
            helperText={formErrors.title}
            sx={{ "& .MuiInputBase-input": { color: "#333333" } }}
          />
          <TextField
            label="Mô tả"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
            error={!!formErrors.description}
            helperText={formErrors.description}
            sx={{ "& .MuiInputBase-input": { color: "#333333" } }}
          />
          <FormControl fullWidth margin="normal" required error={!!formErrors.instructorId}>
            <InputLabel>Giảng viên</InputLabel>
            <Select
              name="instructorId"
              value={formData.instructorId}
              onChange={handleInputChange}
              label="Giảng viên"
            >
              {instructors.map((instructor) => (
                <MenuItem key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </MenuItem>
              ))}
            </Select>
            {formErrors.instructorId && (
              <Typography variant="caption" color="error">
                {formErrors.instructorId}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" required error={!!formErrors.categoryId}>
            <InputLabel>Danh mục</InputLabel>
            <Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              label="Danh mục"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {formErrors.categoryId && (
              <Typography variant="caption" color="error">
                {formErrors.categoryId}
              </Typography>
            )}
          </FormControl>
          <TextField
            label="Số học viên tối đa"
            name="maxStudents"
            value={formData.maxStudents}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            type="number"
            error={!!formErrors.maxStudents}
            helperText={formErrors.maxStudents}
            sx={{ "& .MuiInputBase-input": { color: "#333333" } }}
          />
          <TextField
            label="Giá (VNĐ)"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            type="number"
            error={!!formErrors.price}
            helperText={formErrors.price}
            sx={{ "& .MuiInputBase-input": { color: "#333333" } }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            sx={{ color: "#757575", "&:hover": { color: "#616161" } }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: "#F06292",
              "&:hover": { bgcolor: "#EC407A" },
            }}
            disabled={createStatus === "loading"}
          >
            {createStatus === "loading" ? <CircularProgress size={24} /> : "Lưu"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CoursesPage;