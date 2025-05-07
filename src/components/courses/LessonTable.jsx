import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LessonFormDrawer from "./LessonFormDrawer";
import { useDispatch, useSelector } from "react-redux";
import { deleteLesson } from "/src/store/slices/courseSlice.js";

function LessonTable({ courseId, lessons, isEditing }) {
  const [openLessonDrawer, setOpenLessonDrawer] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const { deleteStatus, deleteError } = useSelector((state) => state.courses); 
  const dispatch = useDispatch();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const handleAddLesson = () => {
    setSelectedLesson(null);
    setOpenLessonDrawer(true);
  };

  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson);
    setOpenLessonDrawer(true);
  };

  const handleDeleteLesson = (id) => {
    dispatch(deleteLesson(id)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Xóa khỏi selectedRows
      }
    });
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((lessonId) => {
      dispatch(deleteLesson(lessonId));
    });
    setSelectedRows([]); // Xóa các hàng đã chọn
  };

  const columns = [
    { field: "title", headerName: "Tiêu đề",  flex: 2 },
    { field: "videoUrl", headerName: "Video URL",  flex: 3 },
    { field: "documentUrl", headerName: "Document URL", flex: 2 },
    { field: "createdAt", headerName: "Ngày tạo", flex: 2 },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1,
      renderCell: (params) => isEditing && (
        <>
          <IconButton
            onClick={() => handleEditLesson(params.row)}
            sx={{ color: "#14375F", "&:hover": { color: "#6D8199" } }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteLesson(params.row.id)}
            sx={{ color: "#E0312E", "&:hover": { color: "#E24943" } }}
            disabled={deleteStatus === "loading"} // Vô hiệu hóa khi đang xóa
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      {isEditing && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddLesson}
            sx={{
              bgcolor: "#E24943",
              "&:hover": { bgcolor: "#E0312E" },
              color: "#FFFFFF",
            }}
          >
            Thêm bài học
          </Button>
        </Box>
      )}

      {deleteStatus === "failed" && (
        <Alert severity="error" sx={{ mb: 2, color: "#E0312E" }}>
          {deleteError || "Không thể xóa bài học"}
        </Alert>
      )}

      {lessons.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" sx={{ color: "#14375F" }}>
            Chưa có bài học nào
          </Typography>
        </Box>
      ) : (
        <Box sx={{ height: 400, width: "100%", maxWidth: 1200, overflowX: "hidden", transition: "max-width 0.3s ease" }}>
          <DataGrid
            rows={lessons}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection={isEditing}
            onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
            getRowId={(row) => row.id}
            autoHeight
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              border: "1px solid #6D8199",
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

      <LessonFormDrawer
        open={openLessonDrawer}
        onClose={() => setOpenLessonDrawer(false)}
        lesson={selectedLesson}
        courseId={courseId}
      />
    </>
  );
}

export default LessonTable;