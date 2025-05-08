import { Box, Typography, Paper, Grid } from "@mui/material";

function CourseInfo({ course }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "#FFFFFF",
        border: "1px solid #6D8199",
        maxWidth: 1200,
        width: "100%",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Ảnh thumbnail */}
        <Grid item xs={12}>
          <img
            src={
              course?.thumbnailUrl ||
              "https://gitiho.com/caches/cc_medium/cou_avatar/2022/03_16/image_27cb4b9735841f68167e1e06d80e86a7.jpg"
            }
            alt={course?.title}
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
        </Grid>

        {/* Nội dung thông tin */}
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ color: "#14375F", mb: 2 }}>
            {course?.title}
          </Typography>

          <Typography variant="body1" sx={{ color: "#6D8199", mb: 3 }}>
            {course?.description}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="subtitle1">
              <strong style={{ color: "#14375F" }}>Giảng viên:</strong>{" "}
              {course?.instructorName}
            </Typography>

            <Typography variant="subtitle1">
              <strong style={{ color: "#14375F" }}>Danh mục:</strong>{" "}
              {course?.categoryName}
            </Typography>

            <Typography variant="subtitle1">
              <strong style={{ color: "#14375F" }}>Giá:</strong>{" "}
              {course?.price ? `${course.price.toLocaleString()}đ` : "Miễn phí"}
            </Typography>

            <Typography variant="subtitle1">
              <strong style={{ color: "#14375F" }}>Trạng thái:</strong>{" "}
              {course?.status || "Draft"}
            </Typography>

            <Typography variant="subtitle1">
              <strong style={{ color: "#14375F" }}>Ngày tạo:</strong>{" "}
              {new Date(course?.createdAt).toLocaleDateString("vi-VN")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CourseInfo;