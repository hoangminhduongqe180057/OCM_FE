import { Box, Typography, Paper, Grid } from "@mui/material";

function CourseInfo({ course }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: "#FFFFFF", border: "1px solid #6D8199", maxWidth: 1200, width: "100%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <img
            src={course?.thumbnailUrl || "https://gitiho.com/caches/cc_medium/cou_avatar/2022/03_16/image_27cb4b9735841f68167e1e06d80e86a7.jpg"}
            alt={course?.title}
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ color: "#14375F", mb: 1 }}>
            {course?.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "#6D8199", mb: 2 }}>
            {course?.description}
          </Typography>
          <Typography variant="body2" sx={{ color: "#14375F" }}>
            <strong>Giảng viên:</strong> {course?.instructorName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#14375F" }}>
            <strong>Danh mục:</strong> {course?.categoryName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#14375F" }}>
            <strong>Giá:</strong> {course?.price ? `${course.price.toLocaleString()}đ` : "Miễn phí"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#14375F" }}>
            <strong>Trạng thái:</strong> {course?.status || "Draft"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#14375F" }}>
            <strong>Ngày tạo:</strong> {new Date(course?.createdAt).toLocaleDateString("vi-VN")}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CourseInfo;