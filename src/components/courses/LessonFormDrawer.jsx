import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { createLesson, updateLesson } from "/src/store/slices/courseSlice.js";
import { useDispatch, useSelector } from "react-redux";
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
import { clearLessonErrors } from "/src/store/slices/courseSlice.js";

const schema = yup.object({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  videoUrl: yup.string().url("Video URL không hợp lệ").required("Video URL là bắt buộc"),
  documentUrl: yup.string().url("Document URL không hợp lệ").nullable(),
  order: yup.number().transform((value, originalValue) =>
    originalValue === "" ? undefined : value
  ).required("Thứ tự là bắt buộc").positive("Thứ tự phải lớn hơn 0"),
}).required();

function LessonFormDrawer({ open, onClose, lesson, courseId }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: lesson || {
      title: "",
      videoUrl: "",
      documentUrl: "",
      order: 1,
    },
  });

  const dispatch = useDispatch();
  const { createStatus, createError, updateStatus, updateError } = useSelector((state) => state.courses);

  useEffect(() => {
    reset({
      title: lesson?.title || "",
      videoUrl: lesson?.videoUrl || "",
      documentUrl: lesson?.documentUrl || "",
      order: lesson?.order || 1,
    });
  }, [lesson, reset]);

  const handleFormSubmit = (data) => {
    const payload = { ...data, courseId };

    if (lesson) {
      dispatch(updateLesson({ id: lesson.id, data: payload })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        onClose();
      }
    });
    } else {
      dispatch(createLesson(payload)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          onClose();
          reset();
        }
      });
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3, backgroundColor: "#FFFFFF" }}>
        <Typography variant="h6" sx={{ color: "#14375F", mb: 2 }}>
          {lesson ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
        </Typography>

        {/* Hiển thị lỗi nếu có */}
        {(createError || updateError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {createError || updateError || "Đã có lỗi xảy ra"}
          </Alert>
        )}

        {/* Hiển thị loading nếu đang xử lý */}
        {(createStatus === "loading" || updateStatus === "loading") && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <CircularProgress sx={{ color: "#14375F" }} />
          </Box>
        )}

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
            name="documentUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Document URL"
                fullWidth
                margin="normal"
                error={!!errors.documentUrl}
                helperText={errors.documentUrl?.message}
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
              onClick={() => {
                dispatch(clearLessonErrors()); // reset lỗi ở đây
                reset();
                onClose();
              }}
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