import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Drawer,
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";

const schema = yup.object({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  description: yup.string().required("Mô tả là bắt buộc"),
  duration: yup.number().required("Thời lượng là bắt buộc").positive("Thời lượng phải lớn hơn 0"),
  videoUrl: yup.string().url("Video URL không hợp lệ").required("Video URL là bắt buộc"),
  order: yup.number().required("Thứ tự là bắt buộc").positive("Thứ tự phải lớn hơn 0"),
}).required();

function LessonFormDrawer({ open, onClose, lesson, courseId }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: lesson || {
      title: "",
      description: "",
      duration: 0,
      videoUrl: "",
      order: 1,
    },
  });

  const handleFormSubmit = (data) => {
    if (lesson) {
      console.log(`Update lesson ${lesson.id} for course ${courseId}`, data);
      // Dispatch action to update lesson here
    } else {
      console.log(`Add new lesson to course ${courseId}`, data);
      // Dispatch action to add lesson here
    }
    reset();
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3, backgroundColor: "#FFFFFF" }}>
        <Typography variant="h6" sx={{ color: "#14375F", mb: 2 }}>
          {lesson ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tiêu đề"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{
                  "& .MuiInputBase-input": { color: "#14375F" },
                  "& .MuiInputLabel-root": { color: "#14375F" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#6D8199" },
                    "&:hover fieldset": { borderColor: "#14375F" },
                  },
                }}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mô tả"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{
                  "& .MuiInputBase-input": { color: "#14375F" },
                  "& .MuiInputLabel-root": { color: "#14375F" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#6D8199" },
                    "&:hover fieldset": { borderColor: "#14375F" },
                  },
                }}
              />
            )}
          />
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Thời lượng (phút)"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.duration}
                helperText={errors.duration?.message}
                sx={{
                  "& .MuiInputBase-input": { color: "#14375F" },
                  "& .MuiInputLabel-root": { color: "#14375F" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#6D8199" },
                    "&:hover fieldset": { borderColor: "#14375F" },
                  },
                }}
              />
            )}
          />
          <Controller
            name="videoUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Video URL"
                fullWidth
                margin="normal"
                error={!!errors.videoUrl}
                helperText={errors.videoUrl?.message}
                sx={{
                  "& .MuiInputBase-input": { color: "#14375F" },
                  "& .MuiInputLabel-root": { color: "#14375F" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#6D8199" },
                    "&:hover fieldset": { borderColor: "#14375F" },
                  },
                }}
              />
            )}
          />
          <Controller
            name="order"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Thứ tự"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.order}
                helperText={errors.order?.message}
                sx={{
                  "& .MuiInputBase-input": { color: "#14375F" },
                  "& .MuiInputLabel-root": { color: "#14375F" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#6D8199" },
                    "&:hover fieldset": { borderColor: "#14375F" },
                  },
                }}
              />
            )}
          />
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button
              onClick={onClose}
              sx={{
                color: "#6D8199",
                "&:hover": { color: "#14375F" },
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#E24943",
                "&:hover": { bgcolor: "#E0312E" },
                color: "#FFFFFF",
              }}
            >
              Lưu
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}

export default LessonFormDrawer;