import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Drawer,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCategories } from "/src/store/slices/courseSlice.js";

// Hàm định dạng số với dấu phẩy
const formatNumber = (value) => {
  if (!value) return "";
  const number = String(value).replace(/[^0-9]/g, ""); // Chỉ giữ số
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Thêm dấu phẩy
};

// Hàm bỏ định dạng để lấy số nguyên
const unformatNumber = (value) => {
  if (!value) return null;
  return Number(value.replace(/,/g, ""));
};

const schema = yup.object({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  description: yup.string().required("Mô tả là bắt buộc"),
  categoryId: yup.string().required("Vui lòng chọn danh mục"),
  price: yup
    .number()
    .typeError("Giá phải là một số")
    .positive("Giá phải lớn hơn 0")
    .required("Giá là bắt buộc"),
    maxStudents: yup
    .number()
    .typeError("Giá phải là một số")
    .positive("Giá phải lớn hơn 0")
    .required("Giá là bắt buộc"),
}).required();

function CourseFormDrawer({ open, onClose, onSubmit, createStatus, createError, defaultValues }) {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.courses.categories);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      categoryId: "",
      price: null,
      maxStudents: null,
    },
  });

    // State để lưu giá trị hiển thị của price (chuỗi có dấu phẩy)
    const [displayPrice, setDisplayPrice] = useState("");

  useEffect(() => {
    if (open) {
      dispatch(fetchCategories()); // Tải danh mục khi drawer mở
    }

    // Khôi phục giá trị hiển thị khi reset form
    const initialPrice = defaultValues?.price ?? null;
    setDisplayPrice(initialPrice ? formatNumber(initialPrice) : "");

    reset(defaultValues || {
      title: "",
      description: "",
      categoryId: "",
      price: null,
      maxStudents: null,
    });
  }, [defaultValues, reset, dispatch, open]);

  const handleFormSubmit = (data) => {
    const submitData = {
      ...data,
      instructorId: id || "USR_DEFAULT", // Fallback nếu user.id không tồn tại
    };
    console.log(submitData)
    onSubmit(submitData, reset);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3, backgroundColor: "#FFFFFF" }}>
        <Typography variant="h6" sx={{ color: "#14375F", mb: 2 }}>
          {defaultValues ? "Chỉnh sửa khóa học" : "Thêm khóa học mới"}
        </Typography>
        {createStatus === "failed" && (
          <Alert severity="error" sx={{ mb: 2, color: "#E0312E" }}>
            {createError || "Không thể lưu khóa học"}
          </Alert>
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
            name="maxStudents"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <TextField
                {...field}
                value={value ?? ""} // Hiển thị chuỗi rỗng nếu value là null
                onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)} // Chuyển thành number hoặc null
                label="Số lượng"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
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
            name="price"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <TextField
                {...field}
                value={displayPrice} // Hiển thị chuỗi rỗng nếu value là null
                onChange={(e) => {
                  const formatted = formatNumber(e.target.value);
                  setDisplayPrice(formatted);
                  onChange(unformatNumber(formatted));
                }}
                label="Giá (VND)"
                type="text"
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
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
          <FormControl fullWidth margin="normal" error={!!errors.categoryId}>
            <InputLabel sx={{ color: "#14375F" }}>Danh mục</InputLabel>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Danh mục"
                  sx={{
                    "& .MuiSelect-select": { color: "#14375F" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#6D8199" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#14375F" },
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.categoryId && (
              <Typography variant="caption" color="#E0312E">
                {errors.categoryId.message}
              </Typography>
            )}
          </FormControl>
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
              disabled={createStatus === "loading"}
            >
              {createStatus === "loading" ? <CircularProgress size={24} /> : "Lưu"}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}

export default CourseFormDrawer;