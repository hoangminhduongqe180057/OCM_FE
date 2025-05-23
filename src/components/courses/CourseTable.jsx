import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "/src/store/slices/courseSlice.js";

function CourseTable({ courses, status, error, selectedRows, setSelectedRows, maxWidth }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deleteStatus, deleteError } = useSelector((state) => state.courses);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const handleMenuClick = (event, courseId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourseId(courseId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCourseId(null);
  };

  // Xử lý xóa một khóa học
  const handleDeleteCourse = (courseId) => {
    dispatch(deleteCourse(courseId)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        handleMenuClose();
      }
    });
  };

  // Xử lý xóa nhiều khóa học
  const handleDeleteSelected = () => {
    selectedRows.forEach((courseId) => {
      dispatch(deleteCourse(courseId));
    });
    setSelectedRows([]); // Xóa các hàng đã chọn sau khi xóa
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns = [
    {
      field: "thumbnail",
      headerName: "Ảnh",
      width: 100,
      renderCell: (params) => (
          <img
            src={params.row.thumbnailUrl || "https://gitiho.com/caches/cc_medium/cou_avatar/2022/03_16/image_27cb4b9735841f68167e1e06d80e86a7.jpg"}
            alt={params.row.title}
            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 8 }}
          />
      ),
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      flex: 2,
      renderCell: (params) => (
        <Typography 
        sx={{ fontSize: 16, fontWeight: 600, color: "#14375F", 
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2, // Hiển thị tối đa 2 dòng
          WebkitBoxOrient: "vertical",
          lineHeight: "1.4em", // chiều cao 1 dòng
          maxHeight: "2.8em", // giới hạn chiều cao 2 dòng
          whiteSpace: "normal", // Cho phép xuống dòng
        }} 
        title={params.value} // Tooltip khi hover
        >
            {params.value}
        </Typography>
      ),
    },
    { field: "instructorName", headerName: "Giảng viên", flex: 1, },
    { field: "categoryName", headerName: "Danh mục", flex: 1, },
    {
      field: "price",
      headerName: "Giá",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: "#14375F" }}>
            {params.value ? `${params.value.toLocaleString()}đ` : "Miễn phí"}
        </Typography>
      ),
    },
    {
      field: "maxStudents",
      headerName: "Số lượng",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: "#14375F" }}>
            {params.value ? params.value : "0"}
        </Typography>
      ),
    },
    { field: "status", headerName: "Trạng thái", flex: 1, valueGetter: () => "Draft" },
    { field: "createdAt",
    headerName: "Cập nhật",
    flex: 1,
    renderCell: (params) => {
      const date = params.value ? new Date(params.value) : null;
      return (
        <Typography sx={{ color: "#14375F" }}>
          {formatDate(params.value)}
        </Typography>
      );
    },
    },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(event) => handleMenuClick(event, params.row.id)}
            sx={{
              "&:focus": { outline: "none" },
              color: "#6D8199",
              "&:hover": { color: "#14375F" },
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedCourseId === params.row.id}
            onClose={handleMenuClose}
            sx={{ "& .MuiPaper-root": { boxShadow: "0 2px 8px rgba(0,0,0,0.1)", backgroundColor: "#FFFFFF" } }}
          >
            <MenuItem
              onClick={() => {
                navigate(`/courses/${params.row.id}`);
                handleMenuClose();
              }}
            >
              <VisibilityIcon sx={{ mr: 1, color: "#14375F", "&:focus": { outline: "none" } }} />
              Xem chi tiết
            </MenuItem>
            {/* <MenuItem
              onClick={() => {
                navigate(`/courses/${params.row.id}/edit`);
                handleMenuClose();
              }}
            >
              <EditIcon sx={{ mr: 1, color: "#14375F", "&:focus": { outline: "none" } }} />
              Chỉnh sửa
            </MenuItem> */}
            <MenuItem
              onClick={() => {
                handleDeleteCourse(params.row.id);
                handleMenuClose();
              }}
            >
              <DeleteIcon sx={{ mr: 1, color: "#E0312E", "&:focus": { outline: "none" } }} />
              Xóa
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <>
      {selectedRows.length > 0 && (
        <Box sx={{ mb: 2, maxWidth: maxWidth, transition: "max-width 0.3s ease" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected} // Gọi xóa nhiều khóa học
            sx={{
              mr: 1,
              bgcolor: "#E0312E",
              "&:hover": { bgcolor: "#E24943" },
              color: "#FFFFFF",
            }}
            disabled={deleteStatus === "loading"} // Vô hiệu hóa khi đang xóa
          >
            Xóa {selectedRows.length} khóa học
          </Button>
          <Button
            variant="contained"
            onClick={() => console.log("Publish selected:", selectedRows)}
            sx={{
              bgcolor: "#14375F",
              "&:hover": { bgcolor: "#6D8199" },
              color: "#FFFFFF",
            }}
          >
            Publish {selectedRows.length} khóa học
          </Button>
        </Box>
      )}

      {deleteStatus === "failed" && (
        <Alert severity="error" sx={{ mb: 2, color: "#E0312E" }}>
          {deleteError || "Không thể xóa khóa học"}
        </Alert>
      )}

      {status === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress sx={{ color: "#14375F" }} />
        </Box>
      )}
      {status === "failed" && (
        <Alert severity="error" sx={{ mb: 2, color: "#E0312E" }}>
          {error || "Không thể tải danh sách khóa học"}
        </Alert>
      )}
      {status === "succeeded" && (
        <Box sx={{ width: "100%", maxWidth: 1200, overflowX: "hidden", transition: "max-width 0.3s ease" }}>
          <DataGrid
            rows={courses}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
            getRowId={(row) => row.id}
            rowHeight={80}
            autoHeight
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              border: "1px solid #6D8199",
              "& .MuiDataGrid-cell": {
                padding: "8px",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#14375F",
                color: "#FFFFFF",
              },
              "& .MuiDataGrid-row:hover": {
                background: "linear-gradient(90deg, #FFFFFF, #6D8199)",
              },
            }}
          />
        </Box>
      )}
    </>
  );
}

export default CourseTable;