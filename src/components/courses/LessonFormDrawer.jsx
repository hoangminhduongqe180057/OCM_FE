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
  LinearProgress,
  InputLabel,
} from "@mui/material";
import { clearLessonErrors } from "/src/store/slices/courseSlice.js";

const schema = yup.object({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  // videoUrl: yup.string().url("Video URL không hợp lệ").required("Video URL là bắt buộc"),
  // documentUrl: yup.string().url("Document URL không hợp lệ").nullable(),
  videoFile: yup
    .mixed()
    .required("Video là bắt buộc")
    .test("fileType", "Chỉ hỗ trợ video định dạng mp4 hoặc webm", (value) => {
      return value && ["video/mp4", "video/webm"].includes(value.type);
    })
    .test("fileSize", "Video phải dưới 100MB", (value) => {
      return value && value.size <= 100 * 1024 * 1024; // 100MB
    }),
  documentFile: yup
    .mixed()
    .nullable()
    .test("fileType", "Chỉ hỗ trợ PDF, Word hoặc Excel", (value) => {
      if (!value) return true; // Cho phép null
      return value && [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(value.type);
    })
    .test("fileSize", "Tài liệu phải dưới 10MB", (value) => {
      if (!value) return true; // Cho phép null
      return value && value.size <= 10 * 1024 * 1024; // 10MB
    }),
  order: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .required("Thứ tự là bắt buộc")
    .positive("Thứ tự phải lớn hơn 0"),
}).required();

function LessonFormDrawer({ open, onClose, lesson, courseId }) {
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: lesson || {
      title: lesson?.title || "",
      // videoUrl: "",
      // documentUrl: "",
      videoFile: null,
      documentFile: null,
      order: lesson?.order || 1,
    },
  });

  const dispatch = useDispatch();
  const { createStatus, createError, updateStatus, updateError } = useSelector((state) => state.courses);

  const [videoUrl, setVideoUrl] = useState(lesson?.videoUrl || "");
  const [documentUrl, setDocumentUrl] = useState(lesson?.documentUrl || "");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    reset({
      title: lesson?.title || "",
      // videoUrl: lesson?.videoUrl || "",
      // documentUrl: lesson?.documentUrl || "",
      videoFile: null,
      documentFile: null,
      order: lesson?.order || 1,
    });
    setVideoUrl(lesson?.videoUrl || "");
    setDocumentUrl(lesson?.documentUrl || "");
    setUploadProgress(0);
  }, [lesson, reset]);

  const handleFormSubmit = (data) => {
    try {
    setIsUploading(true);
      const formData = new FormData();
      formData.append("CourseId", courseId);
      formData.append("Title", data.title);
      formData.append("VideoFile", data.videoFile);
      if (data.documentFile) {
        formData.append("DocumentFile", data.documentFile);
      }
      formData.append("Order", data.order);

    // const payload = { ...data, courseId };

    if (lesson) {
      const payload = {
          title: data.title,
          videoUrl: videoUrl, // Cần cập nhật API updateLesson để hỗ trợ upload file
          documentUrl: documentUrl,
          order: data.order,
          courseId,
        };
        dispatch(updateLesson({ id: lesson.id, data: payload })).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            setIsUploading(false);
            onClose();
          }
        });
    } else {
      dispatch(createLesson(formData)).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            setIsUploading(false);
            onClose();
            reset();
          }
        });
    }
  }catch (error) {
      setIsUploading(false);
      dispatch({
        type: lesson ? "courses/updateLesson/rejected" : "courses/createLesson/rejected",
        error: { message: error.message },
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
        {(createStatus === "loading" || updateStatus === "loading" || isUploading) && (
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
          {/* <Controller
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
          /> */}
          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#14375F", mb: 1 }}>
              Video bài giảng {lesson && "(để trống nếu không thay đổi)"}
            </InputLabel>
            <Controller
              name="videoFile"
              control={control}
              render={({ field }) => (
                <Box>
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      field.onChange(file);
                      setValue("videoFile", file);
                    }}
                    style={{ display: "block", marginBottom: 8 }}
                    disabled={lesson} // Tạm thời disable khi chỉnh sửa (cần API updateLesson hỗ trợ upload file)
                  />
                  {errors.videoFile && (
                    <Typography variant="caption" color="#E0312E">
                      {errors.videoFile.message}
                    </Typography>
                  )}
                  {videoUrl && !field.value && (
                    <Typography variant="body2" sx={{ color: "#6D8199", mt: 1 }}>
                      Video hiện tại: <a href={videoUrl} target="_blank" style={{ color: "#E24943" }}>Xem video</a>
                    </Typography>
                  )}
                </Box>
              )}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#14375F", mb: 1 }}>
              Tài liệu bài giảng {lesson && "(để trống nếu không thay đổi)"}
            </InputLabel>
            <Controller
              name="documentFile"
              control={control}
              render={({ field }) => (
                <Box>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      field.onChange(file);
                      setValue("documentFile", file);
                    }}
                    style={{ display: "block", marginBottom: 8 }}
                    disabled={lesson} // Tạm thời disable khi chỉnh sửa
                  />
                  {errors.documentFile && (
                    <Typography variant="caption" color="#E0312E">
                      {errors.documentFile.message}
                    </Typography>
                  )}
                  {documentUrl && !field.value && (
                    <Typography variant="body2" sx={{ color: "#6D8199", mt: 1 }}>
                      Tài liệu hiện tại: <a href={documentUrl} target="_blank" style={{ color: "#E24943" }}>Xem tài liệu</a>
                    </Typography>
                  )}
                </Box>
              )}
            />
          </Box>

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
              disabled={isUploading}
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