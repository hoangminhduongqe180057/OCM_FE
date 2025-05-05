import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LessonFormDrawer from "./LessonFormDrawer";

function LessonTable({ courseId, lessons, isEditing }) {
  const [openLessonDrawer, setOpenLessonDrawer] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleAddLesson = () => {
    setSelectedLesson(null);
    setOpenLessonDrawer(true);
  };

  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson);
    setOpenLessonDrawer(true);
  };

  const handleDeleteLesson = (lessonId) => {
    console.log(`Delete lesson ${lessonId} from course ${courseId}`);
    // Dispatch action to delete lesson here
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
      <Box sx={{ height: 400, width: "100%", maxWidth: 1200, overflowX: "hidden", transition: "max-width 0.3s ease" }}>
        <DataGrid
          rows={lessons}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
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